//random testing, will be removed on finished project
// alert("JS is loaded");
// console.log($);

let pokeList = [];



getLength();
// console.log("https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + length.toString());

// let promise = $.ajax({
//     url:"https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + length.toString()
// });;

//puts data into array
// promise.then(
//     (data) => {
//         console.log(data.count);
//         urlNext = data.next;
//         console.log(urlNext);
//         pokeList = data.results;
//         // console.log(pokeList);
//     },
//     (error) => {
//         console.log("Pull Request Denied", error);
//     }
// );

//loop to add all pokemon to array, and eventually remove any gigantimax or mega evolutions
// while(data.next results has an array with items in it) {
    // add those items to pokeList
// }

// console.log(urlNext)




//variables


//functions

//function to get number of pokemon in API
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
                    console.log(data);
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