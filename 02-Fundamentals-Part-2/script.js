"use strict"

function logger() {
  console.log("My name is Jonas.")
}

// calling / running / invoking function
logger()

function fruitProcessor(apples, oranges) {
  // apples and oranges are parameters
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`
  return juice
}

// 5 and 0 are arguments
const appleJuice = fruitProcessor(5, 0)
console.log(appleJuice)

const appleOrangeJuice = fruitProcessor(3, 2)
console.log(appleOrangeJuice)

// FN DECLARATION
function calcAge1(birthYear) {
  return 2037 - birthYear
}
const age1 = calcAge1(1991)

// FN EXPRESSION
const calcAge2 = function (birthYear) {
  return 2037 - birthYear
}
const age2 = calcAge2(2000)

// ARROW FN
const calcAge3 = birthYear => 2037 - birthYear
const age3 = calcAge3(2016)
console.log(age3)

// FN CALLING OTHER FN
function cutFruitPieces(fruit) {
  return fruit * 4
}

function fruitProcessor(apples, oranges) {
  const applePeaces = cutFruitPieces(apples)
  const orangePeaces = cutFruitPieces(oranges)

  const juice = `Juice with ${applePeaces} peaces of apples and ${orangePeaces} peaces of oranges.`
  return juice
}

console.log(fruitProcessor(2, 3))

// ARRAYS
const friends = ["Michael", "Steven", "Peter"]

const years = new Array(1990, 1991, 1992)

console.log(friends[0])
console.log(friends.length)
console.log(friends[friends.length - 1])

friends[2] = "Jay"

const lastName = "Frimu"
const daniel = ["Daniel", lastName, 17, "student", friends]
console.log(daniel)

// METHODS
// add elements
friends.push("Angela") // returns array length
friends.unshift("John") // returns array length
console.log(friends)

// remove elements
friends.pop() // returns deleted element
friends.shift() // returns deleted element

friends.indexOf("Michael") // return idx if el. is present
friends.indexOf("Bob") // returns -1 if el. isn't present
friends.includes("Bob") // boolean

console.log(friends.indexOf("Michael"))
console.log(friends)

// OBJECTS
// object literal syntax
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 2037 - 1991,
  job: "teacher",
  friends,
}

// on the left properties on the right values

console.log(jonas.firstName)
console.log(jonas["lastName"])

const nameKey = "Name"

console.log(jonas["first" + nameKey])
console.log(jonas["last" + nameKey])
// console.log(jonas.'last' + nameKey); WRONG

jonas.location = "Portugal"
console.log(jonas)

// FN AS PROPERTY
const jay = {
  firstName: "Jay",
  lastName: "Dobrik",
  birthYear: 1991,
  job: "teacher",
  friends,
  hasDriversLicense: true,

  // calcAge: function (birthYear) {
  //   return 2037 - birthYear
  // },

  // calcAge: function () {
  //   return 2037 - this.birthYear
  // },

  calcAge: function () {
    this.age = 2037 - this.birthYear
    return this.age
  },
}

console.log(jay.calcAge())

console.log(jay.age)
console.log(jay.age)
console.log(jay.age)

// LOOPS
// for loop
console.log("LOOPS - for loop")
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights rep ${rep} 🏋️‍♂️`)
}

const danielsArray = [
  "Daniel",
  "Frimu",
  2023 - 2005,
  "student",
  ["Michael", "Peter", "Steven"],
  true,
]

const types = []

for (let i = 0; i < danielsArray.length; i++) {
  console.log(danielsArray[i], typeof danielsArray[i])

  // filling types array
  // types[i] = typeof danielsArray[i]
  types.push(typeof danielsArray[i])
}

// continue & break
console.log("--- ONLY STRING ---")
for (let i = 0; i < danielsArray.length; i++) {
  if (typeof danielsArray[i] !== "string") continue
  console.log(danielsArray[i], typeof danielsArray[i])
}

console.log("--- BREACK WITH NUMBER ---")
for (let i = 0; i < danielsArray.length; i++) {
  if (typeof danielsArray[i] === "number") break
  console.log(danielsArray[i], typeof danielsArray[i])
}

// looping backwards
for (let i = danielsArray.length - 1; i >= 0; i--) {
  console.log(i, danielsArray[i])
}

// loops in loops
for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`--- Starting exercise ${exercise} ---`)
  for (let rep = 1; rep < 6; rep++) {
    console.log(`--- Lifting weight rep ${rep} 🏋️‍♂️ ---`)
  }
}

console.log("--- WHILE ---")
let rep = 1
while (rep <= 10) {
  console.log(`--- Lifting weight rep ${rep} 🏋️‍♂️ ---`)
  rep++
}

let dice = Math.trunc(Math.random() * 6) + 1

while (dice !== 6) {
  console.log(`You rolled a ${dice}`)
  dice = Math.trunc(Math.random() * 6) + 1
  if (dice === 6) {
    console.log("Loop is about to end")
  }
}
