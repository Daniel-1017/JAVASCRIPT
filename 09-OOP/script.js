"use strict"

const Person = function (firstName, birthYear) {
  this.firstName = firstName
  this.birthYear = birthYear

  /* 
    BAD WAY TO CREATE A METHOD
    because each of these objects will carry around this method

    ex: 1000 object created = 1000 copy of this method

    this.calcAge = function () {
        console.log(2037 - this.birthYear)
    } 
  */
}

const jonas = new Person("Jonas", 1991)
const jack = new Person("Jack", 2005)
console.log(jonas, jack)

/* 
1. New {} is created
2. Function is called, this = {}
3. {} linked to prototype
4. Function automatically return {}
*/

// instanceof
console.log("%c--- instanceof ---", "color: #28b487")
console.log("jack is a instanceof on Person", jack instanceof Person)
