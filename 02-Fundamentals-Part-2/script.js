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
