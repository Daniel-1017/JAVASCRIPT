"use strict"

// DEFAULT PARAMETERS
const bookings = []

const createBooking = function (
  flight,
  passengers = 1,
  price = 199 * passengers
) {
  /*
  ES5 
    passengers = passengers || 1
    price = price || 199
     */

  const booking = {
    flight,
    passengers,
    price,
  }

  console.log(booking)
  bookings.push(booking)
}

createBooking("LH123")
createBooking("LH123", 2, 800)
createBooking("LH123", 4)

// skip a default parameter
createBooking("LH123", undefined, 4)

// HOW PASSING ARGUMENTS WORKS
const flight = "LH234"
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 9238465707,
}

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999"
  passenger.name = "Mr. " + passenger.name

  if (passenger.passport === 9238465707) console.log("Check in.")
  else console.log("Wrong passport.")
}

checkIn(flight, jonas)

/* 
Passing a primitive type to a function is like creating a copy of it

Passing a object to a function is like passing a reference
*/

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000)
}

newPassport(jonas)
checkIn(flight, jonas)

// First-Class vs Higher-Order functions
/* 
    * Frist-Class functions
    Functions are values, thst's why we can store then in variables.
    There is not such thing like First-Class functions, they are just a concept, but there are Higher-Order functions because the language supports First-Class functions.

    * Higher-Order functions
    Functions that take (callback) or return a function
*/

const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase()
}

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ")
  return [first.toUpperCase(), ...others].join(" ")
}

// Higher-Order function
const transformer = function (str, fn) {
  console.log(str)
  console.log(`Transformed string: ${fn(str)}`)
  console.log(`Transformed by: ${fn.name}`)
}

// Callback functions, we don't call them but we tell JS to call them later
transformer("JavaScript is the best!", upperFirstWord)
transformer("JavaScript is the best!", oneWord)

/* 
    Use of callback functions:
        1. Easy to split up our code
        2. Allow us to create abstraction. The "transformer" functiono transforms the string but does't care about how should do it.
        We could write all the login in "transformer" but we abstracted the code in other functions (oneWord and upperFirstWord) so we created a new level of abstraction. The "transformer" (Higher-Order) delegates the job of transforming the string to other functions(Lower-Level) functions.
*/

// Returning functions
const greet = greeting => name => console.log(`${greeting} ${name}`)

const greeterHey = greet("Hey")
greeterHey("Jonas")
greeterHey("Steven")
greet("Hello")("Jonas")

// Call and Apply
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flight, name) {
    console.log(
      `${name} booked a set on ${this.airline} flight ${this.iataCode}${flight}`
    )
    this.bookings.push({ flight: `${this.iataCode}${flight}`, name })
  },
}

lufthansa.book(439, "The Rock")
lufthansa.book(239, "John Smith")

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
}

const swiss = {
  airline: "Swiss",
  iataCode: "LX",
  bookings: [],
}

const book = lufthansa.book

// book(23, "Sarah Williams") // does not work

// Call method
book.call(eurowings, 23, "Sarah Williams")
book.call(lufthansa, 288, "Mary Cooper")
book.call(swiss, 125, "Mary Cooper")

// Apply method
const flightData = [993, "Sarah Williams"]
book.apply(swiss, flightData)
book.call(swiss, ...flightData)

// Call and Apply allow to define the this key word in any function that we want
