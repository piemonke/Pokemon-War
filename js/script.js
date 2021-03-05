//random testing, will be removed on finished project
// alert("JS is loaded");
// console.log($);


// console.log("https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + length.toString());


//variables
let pokeList = [];
let removedPoke = [];
let playerHand = [];
let playerWins = [];
let compHand = [];
let compWins = [];
let cardPlayer;
let cardComp;



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
        // console.log(data.count);
        length = data.count;
        $.ajax({
            url:"https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + length
        }).then(
            (data) => {
                pokeList = (data.results);
                //currently array holds only pokemon name and url
                //require pokemon stats
                //need to iterate over each array index to pull stats from API           
                
                
                pokeList.forEach(function(pokemon, index) {
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
                            // removedPoke.push(pokeList.splice(index, 1)[0]);
                        }
                        
                    )
                });//end of forEach loop
                
            },
            (error) => {
                console.log("Pokemon List Request Denied", error);
            }
        ).then((response) => {
            // pokeList = pokeList.filter(pokemon => pokemon.url);
            console.log(pokeList);
            deal(pokeList, playerHand, compHand);
            $("#play").on("click", function() {
                play()
            });
        });
        
    },
    (error) => {
        console.log("Bad Pull Request", error);
    }
);













//main game function for function calls
function main() {

}

//deals card from main deck into each players hand
function deal(deck, player, computer) {
    // console.log(deck);
    while(deck.length > 0) {
        player.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
        computer.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
    }
    // console.log(player, computer);
}

//unshifts card from each deck, puts card on the field
function play() {
    // console.log(playerHand);
    // console.log(compHand);
    cardPlayer = playerHand.shift();
    cardComp = compHand.shift();
    // console.log(cardPlayer.stats);
    // console.log(cardComp.stats);
    $("#playercard").html(`<h1>${cardPlayer.name}</h1><br><p>${cardPlayer.stats}</p>`)
    $("#compcard").html(`<h1>${cardComp.name}</h1><br><p>${cardComp.stats}</p>`)

    //call compare function to keep variables in scope
    compare(cardPlayer, cardComp);
}

//shuffles each players deck when creating
function shuffle(discarded, hand) {

}

//targets player and computers dealt cards, returns which card wins, updates tiles accordingly
function compare(player, comp) {
    console.log(player);
    console.log(comp);
    if(player.stats === comp.stats) {
        console.log("tie");
    } else if(player.stats > comp.stats) {
        console.log("player wins");
    } else {
        console.log("computer wins");
    }
}

//adds cards won to winnings deck
function addToWinnings(winnerDeck, cardOne, cardTwo) {
    winnerDeck.push(cardOne, cardTwo);
}

