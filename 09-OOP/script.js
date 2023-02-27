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

// Instances
const jonas = new Person("Jonas", 1991)
const jack = new Person("Jack", 2005)
console.log("%c--- instances ---", "color: #28b487")
console.log(jonas, jack)

/* 
1. New {} is created
2. Function is called, this = {}
3. {} linked to prototype
4. Function automatically return {}
*/

// Prototypes
console.log("%c\n--- prototypes ---", "color: #28b487")

/*
BETTER WAY TO CREATE A METHOD
now there exists only one copy and every object created with this constructor function can use it on them selves

PROTOTYPAL INHERITANCE / DELEGATION
*/
Person.prototype.calcAge = function () {
  console.log(this.firstName + "'s age", 2037 - this.birthYear)
}

jack.calcAge()

/* 
Person.prototype = jack.__proto__
Person.prototype = jonas.__proto__

Person.prototype is not the prototype of Person, but the prototype of objects created by Person
*/

// instanceof
console.log("%c\n--- instanceof ---", "color: #28b487")
console.log("jack is a instanceof on Person", jack instanceof Person)

/* 
Prototype Chain
looking in prototypes untill we find the property / method

Object.prototype is the top of the prototype chain
*/

Array.prototype.unique = function () {
  return [...new Set(this)]
}
/* 
NOT A GOOD IDEA
1. JS could add the same method in the future and it may work differently
2. When working in a team, multiple dvelopers may add the same method with different logic, this would create bugs
*/

console.log([1, 1, 1, 12, 2, 2, 2, 2, 4, 6, 7, 8, 8, 8, 8, 8].unique())

// Thst's why we can call methods on functions, they are objects and objects have prototypes
