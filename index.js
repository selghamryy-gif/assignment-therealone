// Convert the string "123" to a number and add 7
let result = Number("123") + 7;
console.log(result); // 130


//Check if the given variable is falsy and return "Invalid" if it is.
function checkFalsy(value) {
  return !value ? "Invalid" : value;
}
console.log(checkFalsy(0)); // "Invalid"

//Use for loop to print all numbers between 1 and 10, skipping even numbers using continue
for (let i = 1 ; i <= 10 ; i++)
{
  if (i % 2 === 0) continue;
  console.log(i);
}


//Create an array of numbers and return only the even numbers using filter method.
let array = [1,2,3,4,5,6,7,8,9,10];
let even = array.filter (num => num % 2 === 0);
console.log(even);


//Use the spread operator to merge two arrays, then return the merged array.
let arr1 =[1,2,3,4]
let arr2 =[5,6,7,8]
let merged = [...arr1, ...arr2];
console.log(merged);

//Use a switch statement to return the day of the week given a number
function getDay(num) {
    switch(num) {
      case 1: return "Monday";              
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        case 7: return "Sunday";
        default: return "Invalid";
    }
  }
  console.log(getDay(5)); // "Friday"

//Create an array of strings and return their lengths using map method
let strings = ["apple", "banana", "cherry"];
let lengths = strings.map(str => str.length);
console.log(lengths); 


//Write a function that checks if a number is divisible by 3 and 5.
function isDivisible(num) {
  return num % 3 === 0 && num % 5 === 0;
}

console.log(isDivisible(15)); // true
console.log(isDivisible(10)); // false


//Write a function using arrow syntax to return the square of a number
const square = num => num * num;
console.log(square(5)); // 25
console.log(square(9)); // 81


//Write a function that destructures an object to extract values and returns a formatted string.
function formatPerson({name, age, city}) {
    return `${name} is ${age} years old and lives in ${city}.`;
    }

const person = {name: "John", age: 30, city: "New York"};
console.log(formatPerson(person));   // "John is 30 years old and lives in New York."



//11.Write a function that accepts multiple parameters (two or more) and returns their sum.
function sum(...nums) {
    return nums.reduce((a, b) => a + b, 0);
    }
    console.log(sum(1, 2, 3, 4)); // 10

//Promise that resolves after 3 seconds
function delayThreeSeconds() {
    return new Promise(resolve => {
    setTimeout(() => {
    resolve("Resolved after 3 seconds");
    }, 3000);
    });
    }
    delayThreeSeconds().then(result => console.log(result));

//Find largest number in array
function findLargest(arr) {
    return Math.max(...arr);
    }
    console.log(findLargest([1, 2, 3, 4, 5]));

//Return only keys of an object
function getObjectKeys(obj) {
    return Object.keys(obj);
    }
    console.log(getObjectKeys({a: 1, b: 2, c: 3}));

//. Split a string into array of words
function splitString(str) {
    return str.split(" ");
    }
    console.log(splitString("Hello world"));