//random testing, will be removed on finished project
// alert("JS is loaded");
// console.log($);


// console.log("https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + length.toString());


//variables
let pokeList = [];
let removedPoke = [];



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
                                pokemon.sprites = data.sprites;
                                pokemon.stats = data.stats;
                                pokemon.types = data.types;
                            },
                            (error) => {
                                console.log("Pokemon data pull request error", error);
                                removedPoke.push(pokeList.splice(index, 1));
                            }
                        )
                    });
                    console.log(pokeList);
                    
                    //function calls for the game go here now

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


//deals card from deck
function deal() {

}

//shuffles each players deck when creating
function shuffle(cards) {

}

//targets player and computers dealt cards, returns which card wins, updates tiles accordingly
function compare() {

}

//adds cards won to winnings deck
function addToWinnings() {

}