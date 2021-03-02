//random testing, will be removed on finished project
// alert("JS is loaded");
// console.log($);


// console.log("https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + length.toString());


//variables
let pokeList = [];
let removedPoke = [];



getLength();


//functions

//function to get number of pokemon in API
//nested pull request puts all data into array
function getLength() {
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
                    });
                    // console.log(pokeList);
                    
                },
                (error) => {
                    console.log("Nested Pull Request Denied", error);
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