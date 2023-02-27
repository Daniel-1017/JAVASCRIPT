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

// Static methods
Person.hey = function () {
  console.log("Hey there 👋")
}

Person.hey()

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

// Challenge
console.log("%c\n--- challenge 1 ---", "color: #28b487")
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make
  this.speed = speed
}

Car.prototype.accelerate = function () {
  this.speed += 10
  console.log(`${this.make} is goind at ${this.speed} km/h`)
}

Car.prototype.brake = function () {
  this.speed -= 5
  console.log(`${this.make} is goind at ${this.speed} km/h`)
}

const bmw = new Car("BMW", 120)
const mercedes = new Car("MERCEDES", 95)
bmw.accelerate()
bmw.accelerate()
bmw.brake()
bmw.accelerate()
bmw.brake()

// ES6 Classes
console.log("%c\n--- ES6 classes ---", "color: #28b487")

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName
    this.birthYear = birthYear
  }

  /* 
  Instance methods
  Methods will be added to .prototype property */
  calcAge() {
    console.log(2037 - this.birthYear)
  }

  get age() {
    return 2037 - this.birthYear
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name
    else alert(`${name} is not a full name!`)
  }

  get fullName() {
    return this._fullName
  }

  // Static method
  static hey() {
    console.log("Hey there 👋")
  }
}

const jessica = new PersonCl("Jessica Davis", 1988)
jessica.calcAge()
console.log(jessica.age)

/* 
1. Classes are NOT hoisted
2. Classes are first-class citizens
3. Cleasses are executed in strics mode
*/

// Getters and Setters
const walter = new PersonCl("Walter White", 1995)

const account = {
  owner: "Jonas",
  movements: [215, 305, 530, 100, 260],

  get latest() {
    return this.movements.pop()
  },

  set latest(mov) {
    this.movements.push(mov)
  },
}

console.log(account.latest)

account.latest = 50
console.log(account.movements)

/* 
Static methods
they are not called on the instance but on the constructor function */
PersonCl.hey()
