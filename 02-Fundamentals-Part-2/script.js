"use strict"

let hasDriversLicense = false
const passTest = true

// if (passTest) hasLicense = true
// if (hasDriversLicense) console.log("I can drive.")

// const interface = "Audio"

function logger() {
  console.log("My name is Jonas.")
}

// calling / running / invoking function
// logger()

// function fruitProcessor(apples, oranges) {
//   -- apples and oranges are parameters --
//   const juice = `Juice with ${apples} apples and ${oranges} oranges.`
//   return juice
// }

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
