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
