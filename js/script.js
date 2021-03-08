//variables
let pokeList = [];
let removedPoke = [];
let playerHand = [];
let playerWins = [];
let compHand = [];
let compWins = [];
let cardPlayer;
let cardComp;
let pot = [];




//functions

//function to get number of pokemon in API
//nested pull request puts all data into array


//type data that will setup later, this web will be annoying, need lots of .contains chec
// $.ajax({
//     url:"https://pokeapi.co/api/v2/type/10001/"
// }).then(
//     (data) => {
//         console.log(data);
//     },
//     (error) => {
//         console.log("type data pull error")
//     }
// )

$.ajax({
    url:"https://pokeapi.co/api/v2/pokemon"
}).then(
    (data) => {
        //uncomment below for delivery
        let length = data.count;
        //setting length to static ammount to make testing not take ages
        // let length = 20;
        $.ajax({
            url:"https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + length
        }).then(
            (data) => {
                pokeList = (data.results);
                //currently array holds only pokemon name and url
                //require pokemon stats
                //need to iterate over each array index to pull stats from API           
                
                
                pokeList.forEach(function(pokemon) {
                    //pull stats and typing from API
                    //add to each object in array
                    //NOTE: At the time of writing, 3 urls in this API are broken and returning 404 errors. Since their data cannot be pulled, I will be removing them from the pokeList array so that they do not cause errors in the actual game. This code has been added to the error catch so that any future broken urls are also caught.
                    $.ajax({
                        url:pokemon.url
                    }).then(
                        (data) => {
                            // console.log(data);
                            //store url for sprite data
                            pokemon.sprite = data.sprites.front_default;

                            //store all base stats added together
                            let statTotal = 0;
                            data.stats.forEach(stat => {
                                statTotal += stat.base_stat;
                            });
                            pokemon.stats = statTotal;

                            //store type data
                            // pokemon.types = data.types;
                            let types = []
                            data.types.forEach(type => {
                                types.push(type.type.name);
                            });
                            pokemon.types = types;

                            //delete url, no longer needed
                            delete pokemon.url;
                        },
                        (error) => {
                            console.log("Pokemon data pull request error", error);
                        }
                        
                    )
                });//end of forEach loop
                
            },
            (error) => {
                console.log("Pokemon List Request Denied", error);
            }
        ).then((response) => {

            $("#start").on("click", function() {
                main();
            });
            $("#mobileStart").on("click", function() {
                //for mobile, remove rules and start to free up screen space
                $("#rules").fadeOut();
                $("#mobileStart").fadeOut();
                main();
            });
        });
        
    },
    (error) => {
        console.log("Bad Pull Request", error);
    }
);













//main game function for function calls
function main() {
    //hide or remove start button
    $("#start").fadeOut();
    $("#newGame").fadeOut();
    $("#play").fadeIn();
    // pokeList = pokeList.filter(pokemon => !pokemon.hasOwnProperty("url"));
    deal(pokeList, playerHand, compHand);
    $("#play").fadeIn().on("click", function() {
        play()
    });
}

//deals card from main deck into each players hand
function deal(deck, player, computer) {
    //set deck length even to prevent undefined error
    if(deck.length % 2) {
        deck = deck.splice(0, deck.length - 1);
    }
    while(deck.length > 0) {
        player.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
        computer.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
    }
}

//unshifts card from each deck, puts card on the field
//handles DOM manipulation, calls comparison function
function play() {
    ifShuffle();
    //if either players hands AND winnings are both empty, declare victory
    //else continue with function 
    if(playerHand.length === 0 && playerWins.length === 0) {
        $("#battleOutcome").text("The Player is victorious");
        newGame();
    } else if(compHand.length === 0 && compWins.length === 0) {
        $("#battleOutcome").text("The Computer is victorious");
        newGame();
    } else {
        cardPlayer = playerHand.shift();
        cardComp = compHand.shift();
        $("#playercard").html(`<h1>Player</h1><br>
            <h2>${cardPlayer.name}</h2><br>
            <img src="${cardPlayer.sprite}"><br>
            <p>Base Stats: ${cardPlayer.stats}</p>
            <p>Cards remaining in hand: ${playerHand.length}</p>`);
        $("#compcard").html(`<h1>Computer</h1><br>
            <h2>${cardComp.name}</h2><br>
            <img src="${cardComp.sprite}"><br>
            <p>Base Stats: ${cardComp.stats}</p>
            <p>Cards remaining in hand: ${compHand.length}</p>`);

        //call compare function to keep variables in scope
        compare(cardPlayer, cardComp);
    }
}

//shuffles each players deck when creating
function shuffle(oldHand, newHand) {
    while(oldHand.length) {
        newHand.push(oldHand.splice(Math.floor(Math.random() * oldHand.length), 1)[0])
    }
}

//takes cards as input, compares, updates winner
function compare(player, comp) {
    
    pot.push(player, comp)
    if(player.stats === comp.stats) {
        $("#battleOutcome").text("PokeWAR!");
        //call war function
        war();
    } else if(player.stats > comp.stats) {
        $("#battleOutcome").text("Player wins the battle");
        //give cards to player deck
        addToWinnings(playerWins);
    } else {
        $("#battleOutcome").text("Computer wins the battle");
        //give cards to comp deck
        addToWinnings(compWins);
    }
    $("#playercard").append(`<p>Cards won in pile: ${playerWins.length}</p>`);
    $("#compcard").append(`<p>Cards won in pile: ${compWins.length}</p>`);
}

//adds cards won to winnings deck
function addToWinnings(winnerDeck) {
    //add pot to winnersDeck
    winnerDeck.push(...pot);
    //clear pot
    pot.splice(0, pot.length);
}

function war() {
    for(i = 0; i < 3; i++) {
        ifShuffle();
        pot.push(playerHand.shift());
        pot.push(compHand.shift());
    }
    $("#war").on("click", function() {
        play();
    })
}

//combines all cards back into one deck, reshuffles them, calls main again
function newGame() {
    //add all cards back to pokelist
    pokeList.push(...playerHand);
    pokeList.push(...playerWins);
    pokeList.push(...compHand);
    pokeList.push(...compWins);
    console.log(pokeList);

    //remove all cards from hands
    playerHand.splice(0, playerHand.length);
    playerWins.splice(0, playerWins.length);
    compHand.splice(0, compHand.length);
    compWins.splice(0, compWins.length); 
    //hide play button, create newGame button that calls main
    $("#play").fadeOut();
    $("#newGame").fadeIn().on("click", function() {
        $("#playercard").html(``)
        $("#compcard").html(``)
        main();
    });
}

//tests if either deck needs to be shuffled and shuffles if needed
function ifShuffle() {
    if(playerHand.length === 0) {
        shuffle(playerWins, playerHand);
    }
    if(compHand.length === 0) {
        shuffle(compWins, compHand);
    }
}