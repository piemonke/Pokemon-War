//random testing, will be removed on finished project
// alert("JS is loaded");
// console.log($);

let pokeList = [];
let urlNext = "https://pokeapi.co/api/v2/pokemon/";

const promise = $.ajax({
    url:urlNext
});

console.log(promise);

// promise.then(
//     (data) => {
//         // console.log(data.next);
//         urlNext = data.next;
//         pokeList = data.results;
//         data.next
//         // console.log(pokeList);
//     },
//     (error) => {
//         console.log("error", error);
//     }
// );

//loop to add all pokemon to array, and eventually remove any gigantimax or mega evolutions
// while(data.next results has an array with items in it) {
    // add those items to pokeList
// }


//variables


//functions

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