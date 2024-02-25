const fruits = ["apple", "banana", "cherry", "date", "mango"];

//! 1 FORWARD FOR LOOP
// The traditional for loop is one of the simplest and most versatile ways to loop through an array. It allows you to have complete control over the loop's behavior.
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

//! 2 BACKWARD FOR LOOP
for (let i = fruits.length - 1; i >= 0; i--) {
  console.log(fruits[i]);
}

//! 3 FOR EACH() LOOP
// The forEach method is a built-in JavaScript method for arrays that simplifies the process of looping through each element.
fruits.forEach((fruit) => {
  console.log(fruit);
});

//! 4 FOR OF LOOP
// The for...of loop is another modern way to loop through an array. It's cleaner and more concise than the traditional for loop.

for (let item of fruits) {
  console.log(item);
}

//! 5 WHILE LOOP
let i = 0;
while (i < fruits.length) {
  console.log(fruits[i]);
  i++;
}

//! 5   FOR IN LOOP (NOT RECOMMENDED  FOR ARRAYS)
for (let index in fruits) {
  console.log(fruits[index]);
}

//! 6 MAP
// The map method is used to create a new array by applying a given function to each element in the original array. It's useful when you want to transform the elements of an array and get the result in a new array.
let capitalizedFruits = fruits.map((fruit) => {
  return fruit.toUpperCase();
});

console.log(capitalizedFruits);

//! 7 FILTER
// The filter method creates a new array with all elements that pass a test specified by a callback function. It's helpful for selecting elements that meet certain criteria.
let numbers = [1, 2, 3, 4, 5, 6];
let evenNumbers = numbers.filter((number) => {
  return number % 2 === 0;
});

console.log(evenNumbers);

//! 8 REDUCE
// The reduce method is used to combine values in an array, resulting in a single value. It's great for performing calculations on array elements, such as finding the sum of all numbers.

let sum = numbers.reduce((total, currentNumber) => {
  return total + currentNumber;
}, 0);

console.log(sum);

let purchases = [
  { item: "Pen", price: 10 },
  { item: "Color Book", price: 25 },
  { item: "Marker", price: 15 },
];

let totalPrice = purchases.reduce((accumulator, currentPurchase) => {
  return accumulator + currentPurchase.price;
}, 0);

console.log("Total Price:", totalPrice);

//! 9 SOME()
// The some method checks if at least one element in the array satisfies a given condition, while the every method checks if all elements meet a condition.

let isGreaterThanThree = numbers.some(function (number) {
  return number > 3;
});

//! 10 EVERY()
let allGreaterThanZero = numbers.every(function (number) {
  return number > 0;
});

console.log(isGreaterThanThree); // true
console.log(allGreaterThanZero); // true

// isGreaterThanThree is true because at least one element is greater than 3.
// allGreaterThanZero is true because  all elements are greater than 0.

//////////////////////////////////////////////////
// FOR  OBJECT
//? 1
let people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

for (let person of people) {
  for (let key in person) {
    console.log(key + ": " + person[key]);
  }
}

//? 2
const count = {
  a: 4,
  b: 5,
  r: 2,
  u: 9,
};

for (let key in count) {
  console.log(key + ": " + count[key]);
}

//3
const population = {
  male: 4,
  female: 93,
  others: 10,
};

// Iterate through the object
for (let key in population) {
  console.log(key); // male, female, others
}

let genders = Object.keys(population);
console.log(genders); // ['male', 'female', 'others']
genders.forEach((gender) => console.log(gender)); // male, female, others

let genderCount = Object.values(population);
console.log(genderCount); // [4,93,10]
genderCount.forEach((number) => console.log(number)); // 4,93,10

let populationArr = Object.entries(population);
console.log(populationArr);
//   [
//     ['male', 4],
//     ['female', 93],
//     ['others', 10],
//   ]
