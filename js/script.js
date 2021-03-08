//random testing, will be removed on finished project
// alert("JS is loaded");
// console.log($);


// console.log("https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + length.toString());


//variables--move into smaller scope before delivery
let pokeList = [];
let removedPoke = [];
let playerHand = [];
let playerWins = [];
let compHand = [];
let compWins = [];
let cardPlayer;
let cardComp;
let pot =[];


getPokeList();


//functions

//function to get number of pokemon in API
//nested pull request puts all data into array
function getPokeList() {
    
}

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
        //let length = data.count;
        //setting length to static ammount to make testing not take ages
        let length = 52;
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
    $("#play").fadeIn();
    pokeList = pokeList.filter(pokemon => !pokemon.hasOwnProperty("url"));
    deal(pokeList, playerHand, compHand);
    $("#play").on("click", function() {
        play()
    });
}

//deals card from main deck into each players hand
function deal(deck, player, computer) {
    // console.log(deck);
    //set deck length even to prevent undefined error
    if(deck.length % 2) {
        deck = deck.splice(0, deck.length - 1);
    }
    while(deck.length > 0) {
        player.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
        computer.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
    }
    // console.log(player, computer);
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
        $("#playercard").html(`<h1>${cardPlayer.name}</h1><br><img src="${cardPlayer.sprite}"><br><p>${cardPlayer.stats}</p>`)
        $("#compcard").html(`<h1>${cardComp.name}</h1><br><img src="${cardComp.sprite}"><br><p>${cardComp.stats}</p>`)

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
}

//adds cards won to winnings deck
function addToWinnings(winnerDeck) {
    // console.log(pot);
    //add pot to winnersDeck
    winnerDeck.push(...pot);
    // console.log(winnerDeck);
    //clear pot
    pot.splice(0, pot.length);
}

function war() {
    // console.log(playerHand, compHand);
    // console.log("WAR")
    for(i = 0; i < 3; i++) {
        ifShuffle();
        // console.log("players added to the pot");
        pot.push(playerHand.shift());
        pot.push(compHand.shift());
        // console.log(pot);
    }
    // console.log(playerHand, compHand);
    // console.log("WAR pot");
    // console.log(pot);
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
    $("#newGame").on("click", function() {
        // console.log("new game");
        $("#playercard").html(``)
        $("#compcard").html(``)
        main();
    });
}

//tests if either deck needs to be shuffled and shuffles if needed
function ifShuffle() {
    if(playerHand.length === 0) {
        // console.log("shuffle player")
        shuffle(playerWins, playerHand);
    }
    if(compHand.length === 0) {
        // console.log("shuffle comp")
        shuffle(compWins, compHand);
    }
}