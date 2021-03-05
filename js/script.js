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



getPokeList();


//functions

//function to get number of pokemon in API
//nested pull request puts all data into array
function getPokeList() {
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
                    // console.log(data);
                    pokeList = (data.results);
                    //currently array holds only pokemon name and url
                    //require pokemon stats
                    //need to iterate over each array index to pull stats from API
                    //also want to remove gimmick pokemon (gmax, mega evolutions, etc)--accomplished
                    pokeList.forEach(function(pokemon, index) {
                        if(pokemon.name.includes("-gmax") || pokemon.name.includes("-mega")) {
                            removedPoke.push(pokeList.splice(index, 1));
                        }
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
                                removedPoke.push(pokeList.splice(index, 1));
                            }
                        )
                    });
                    // console.log(pokeList);
                    
                    
                    //function calls for the game go here now
                    deal(pokeList, playerHand, compHand);
                },
                (error) => {
                    console.log("Pokemon List Request Denied", error);
                }
            )
        },
        (error) => {
            console.log("Bad Pull Request", error);
        }
    );
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

//deals card from main deck into
function deal(deck, player, computer) {
    while(deck.length) {
        player.push(deck.splice(Math.floor(Math.random() * deck.length), 1));
        computer.push(deck.splice(Math.floor(Math.random() * deck.length), 1));
    }
    // console.log(player, computer);
}

//shuffles each players deck when creating
function shuffle(discarded, hand) {

}

//targets player and computers dealt cards, returns which card wins, updates tiles accordingly
function compare() {

}

//adds cards won to winnings deck
function addToWinnings() {

}

