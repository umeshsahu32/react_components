// JAVASCRIPT METHOD OF ARRAY

// ! 1. MAP
// This method creates a new array with the results of calling a provided function on every element in this array.

const arr = [1, 2, 3, 4, 5, 6];

const mappedData = arr.map((item) => item * 2); // [2, 4, 6, 8, 10, 12]
console.log("mappedData", mappedData);

// ! 2. FILTER
// This method creates a new array with only elements that passes the condition inside the provided function.

const filtered = arr.filter((item) => item === 2 || item === 4);
console.log("filtered", filtered); // [2, 4]

// ! 3. SORT
// This method is used to arrange/sort array’s elements either in ascending or descending order.
const arr2 = [54, 23, 77, 11, 6, 34];
const arr3 = [54, 23, 77, 11, 6, 34];

arr2.sort((a, b) => a - b);
console.log(arr2); // [ 6, 11, 23, 34, 54, 77 ]  ACCEDING ORDER

arr3.sort((a, b) => b - a);
console.log(arr3); // [ 77, 54, 34, 23, 11, 6 ]  DESCENDING ORDER

//! 4. FOR EACH
// This method helps to loop over array by executing a provided callback function for each element in an array.

arr.forEach((item) => {
  console.log(item, item * 10);
});

//? DIFFERENCE BETWEEN MAP() AND FOREACH()
// The forEach() method does not returns a  new array based on the given array.
// The map() method returns an entirely new array.

// The forEach() method doesn’t return anything hence the method chaining technique cannot be applied here.
// With the map() method, we can chain other methods like, reduce(),sort() etc.

// It is not executed for empty elements.
// It does not change the original array.

//! 5. CONCAT()
//This method is used to merge two or more arrays and returns a new array, without changing the existing arrays.

const strArr1 = ["a", "b", "c"];
const strArr2 = ["d", "e", "f"];

console.log(strArr1.concat(strArr2)); // [ 'a', 'b', 'c', 'd', 'e', 'f' ]

//! 6. EVERY()
// This method checks every element in the array that passes the condition, returning true or false as appropriate.

const arrElement = [3, 4, 5, 6, 7, 8, 89];
const checkEveryElement = arrElement.every((item) => item < 10);
console.log(checkEveryElement);
// false, as we have 89 in array which is greater than 10

const checkEveryElementAgain = arrElement.every((item) => item < 100);
console.log(checkEveryElementAgain); // true

//! 7. SOME()
// This method checks every element in the array that passes the condition, returning true or false as appropriate.

const arrElementSome = [3, 4, 5, 6, 7, 8, 2];
const checkSomeElement = arrElementSome.some((item) => item > 10);
console.log(checkSomeElement);
// false, as all the items are less than 10

const checkSomeElementAgain = arrElementSome.some((item) => item > 7);
console.log(checkSomeElementAgain); // true
// true, because 8 is grater than 7

//! 8. Includes()
//This method checks if an array includes the element that passes the condition, returning true or false as appropriate.
console.log(arr.includes(2)); // true
console.log(arr.includes(200)); // false

//! 9. JOIN()
//This method returns a new string by concatenating all of the array’s elements separated by the specified separator.
const arrNameChar = ["u", "m", "e", "s", "h"];
console.log(arrNameChar.join("")); // umesh
console.log(arrNameChar.join("-")); // u-m-e-s-h

//! 10. REDUCE()
//This method applies a function against an accumulator and each element in the array to reduce it to a single value.

const reduced = arr.reduce((val, curr) => val + curr, 0);
console.log(reduced); // 21

//! 11. FIND()
//This method returns the value of the first element in an array that pass the test in a testing function.
const found = arr.find((item) => item === 3);
const found2 = arr.find((item) => item === 10);
console.log(found); // 3
console.log(found2); // undefined

//! 12. FINDINDEX()
//It is used to search for the first element in an array that satisfies a provided testing function and returns its index. If no element satisfies the condition, it returns -1.
const users = ["umesh", "vikas", "radha", "savita"];
const indexFinder1 = users.findIndex((element) => element === "radha");
const indexFinder2 = users.findIndex((element) => element === "ravi");
console.log("indexFinder1", indexFinder1); // 2
console.log("indexFinder2", indexFinder2); // -1

//! 13. INDEXOF()
//The indexOf method is a built-in function available for both arrays and strings in JavaScript. It is used to search for the first occurrence of a specified value and returns its index or -1 if it is not found..
const indexOf1 = users.indexOf("radha");
const indexOf2 = users.indexOf("ravi");
console.log("indexOf1", indexOf1); // 2
console.log("indexOf2", indexOf2); // -1

//! 14. FILL()
//This method fills the elements in an array with a static value and returns the modified array.

const fillArr = new Array(3);
console.log(fillArr); // ['empty', 'empty', 'empty']
console.log(fillArr.fill(10)); // [10, 10, 10]

//! 15. SLICE()
//This method returns a new array with specified start to end elements.

const animals = [
  "ant",
  "bison",
  "camel",
  "duck",
  "elephant",
  "fox",
  "cobra",
  "cow",
];

console.log(animals.slice());
// Expected output: Array [ "ant","bison","camel","duck","elephant","fox","cobra","cow"]

console.log(animals.slice(2));
// Expected output: Array [ 'camel', 'duck', 'elephant', 'fox', 'cobra', 'cow' ]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]
// does not include given last index

console.log(animals.slice(1, 6));
// Expected output: [ 'bison', 'camel', 'duck', 'elephant', 'fox' ];

// start = 2 , Zero-based index at which to start extraction
// end   = 2,  Zero-based index at which to end extraction, extracts up to but not   including end.

// A new array containing the extracted elements.
//! 16. SPLICE()
const months = ["Jan", "March", "April", "June"];
months.splice(1, 0, "Feb");
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(3, 2, "May");
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]

// const myFish = ["parrot", "anemone", "blue", "trumpet", "sturgeon"];
// const removed = myFish.splice(2, 2);

// myFish is ["parrot", "anemone", "sturgeon"]
// removed is ["blue", "trumpet"]

// splice(start)
// splice(start, deleteCount)
// splice(start, deleteCount, item1)
// splice(start, deleteCount, item1, item2)

// start-->  Zero-based index at which to start changing the array
// deleteCount--> An integer indicating the number of elements in the array to remove from start.
// item1, …, itemN Optional
// The elements to add to the array, beginning from start.
// If you do not specify any elements, splice() will only remove elements from the array.

//An array containing the deleted elements.
// If only one element is removed, an array of one element is returned.
// If no elements are removed, an empty array is returned.

//! 17. REVERSE()
//This method reverses an array in place. Element at last index will be first and element at 0 index will be last. mutate the original array
console.log(animals.reverse());

//! 18. PUSH()
//This method adds one or more elements to the end of array and returns the new length of the array. mutate the original array
animals.push("ox");

//! 19. POP()
// This method removes the last element from the end of array and returns that element. mutate the original array
animals.pop();

//! 20. SHIFT()
//This method removes the first element from an array and returns that element. mutate the original array
animals.shift();

//! 21. UNSHIFT()
//This method adds one or more elements to the beginning of an array and returns the new length of the array. mutate the original array
animals.unshift("ox");

//? ////////////////////////////////////////////////
// TYPES OF LOOP ON STRING OBJECT AND ARRAY
