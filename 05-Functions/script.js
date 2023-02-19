"use strict"

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
