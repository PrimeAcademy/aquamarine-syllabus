// we talked thru variables and conditionals and did some of the 2.1 assignment

// VARIABLES
// let, const, var
// value tied to a keyword
// way to refer to a piece of data
// var firstName; // don't do this! var
// let and const




const FIRST_NAME = 'Dane'; // screaming snake case

// friendsName = 'Jarrett';

// console.log('friends name', friendsName);

// DATA TYPES
//
// string - series of letters
let firstName = 'Kris'; // initialized 
let lastName = "Szafranski";
// '1'
let ten = 10; // integer
let twentyPointThree = 20.3; // decimal, floating point
// Boolean, true or false
let isWarm = true; // false
console.log(isWarm);
isWarm = 'true';
console.log(isWarm);
isWarm = false;
console.log(isWarm);
isWarm = 42;
console.log(isWarm);




// REQUIRED FEATURES:
// 1 - Create a variable called `firstName` and assign it the value of your first name

// 2 - Create a second variable called `lastName` and assign it the value of your last name

// 3 - Create a third variable called `fullName`, assign it the value of your first and last name
// (remember, you already have variables for this, can you use those?)
// concatenation
let space = ' ';
let fullName = firstName + space + lastName + ' other information';

let otherFullName = `${firstName} ${lastName}`; // string literals

console.log(otherFullName);

// 4 - Console log the value of `fullName`

// 5 - Create a variable called `luckyNumber` and assign it the value of your lucky number.
let luckyNumber = 7;




// conditionals



let adventurous = true;
// boolean = binary logic on/off, true/false
if(adventurous) {
    // if truthy
    console.log('Adventures are great!');
} else {
    // if falsey
    console.log('How about we stay home?');
}
// 14 - Create a compound conditional: if luckyNumber is 2 and adventurous is true,
// console log "Roll the dice!"

// STRETCH GOALS:

// 16 - Make a variable called `mostPets` and a conditional that
// correctly checks the `pets` and `friendsPets` variables, and
// assigns the highest value to `mostPets`. There's several possibilities --
// be sure to think through all the scenarios. 
// console.log `mostPets` after the conditional has run.
let pets = 2;
let friendsPets = 3;
let mostPets; // undefined value

// if( 2 > 3 )
if(pets > friendsPets) {
    // i have more pets
    mostPets = pets;
} else if(pets < friendsPets) {
    // friend has more pets
    mostPets = friendsPets;
    console.log('friend has more pets')
} else {
    // same number of pets
    mostPets = pets; // just pick one
}


console.log('most pets:', mostPets);



/*
// shortened

let pets = 3;
let friendsPets = 3;
let mostPets = pets; 

// if( 10 > 3 )
if(pets > friendsPets) {
    // i have more pets
    mostPets = pets;
} else {
    // friend has more pets
    mostPets = friendsPets;
    console.log('friend has more pets')
} 
*/