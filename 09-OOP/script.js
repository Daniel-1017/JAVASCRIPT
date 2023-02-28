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

// Object.create()
console.log("%c\n--- Object.create() ---", "color: #28b487")
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear)
  },

  init(firstName, birthYear) {
    this.firstName = firstName
    this.birthYear = birthYear
  },
}

const steven = Object.create(PersonProto)
steven.init("Steven", 2003)
steven.calcAge()

// Object.create creates a new object and the prototype of that object is the object that we passed in

// Challenge 2
console.log("%c\n--- challenge 2 ---", "color: #28b487")

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
DATA CAR 1: 'Ford' going at 120 km/h
GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make
    this.speed = speed
  }

  accelerate() {
    this.speed += 10
    console.log(`${this.make} is goind at ${this.speed} km/h`)
  }

  brake() {
    this.speed -= 5
    console.log(`${this.make} is goind at ${this.speed} km/h`)
  }

  get speedUS() {
    return this.speed / 1.6
  }

  set speedUS(speed) {
    this.speed = speed * 1.6
  }
}

const ford = new CarCl("FORD", 120)
ford.accelerate()
ford.brake()
ford.brake()
ford.accelerate()
ford.brake()
ford.speedUS = 50
console.log(ford)

console.clear()

// Inheritance between classes: Constructor Functions
console.log(
  "%c\n--- Inheritance between classes: Constructor Functions ---",
  "color: #28b487"
)

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear)
  this.course = course
}

// We want to set Student.prototype to Person.prototype, we do so by assigning Object.create(Person.prototype) to Student.prototype

// Linking prototypes
Student.prototype = Object.create(Person.prototype)
// Object.create will create a new object with prototype = Person.prototype and assign in to Student.prototype

/* 
WRONG
Student.prototype = Person.prototype

We are telling JS that the student's prototype and the person's prototype should be the exact same object, which is wrong
*/

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`)
}

const mike = new Student("Mike", 2020, "Computer Science")
mike.introduce()
mike.calcAge()

Student.prototype.constructor = Student

// Inheritance between classes: ES6 Classes
console.log(
  "%c\n--- Inheritance between classes: Classes ---",
  "color: #28b487"
)

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // super is the constructor function of the parent class. Always nees to happen first!
    super(fullName, birthYear)
    this.course = course
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`)
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I fell more like ${
        2037 - this.birthYear + 10
      }`
    )
  }
}

const marta = new StudentCl("Marta Jones", 2012, "Computer Science")
marta.introduce()
marta.calcAge()

// Inheritance between classes: Object.create()
console.log(
  "%c\n--- Inheritance between classes: Object.create() ---",
  "color: #28b487"
)

const StudentProto = Object.create(PersonProto)
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear)
  this.course = course
}

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`)
}

const jay = Object.create(StudentProto)
jay.init("Jay", 2010, "Computer Science")
jay.introduce()
jay.calcAge()

// Challenge
console.log("%c\n--- challenge ---", "color: #28b487")

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉
DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
GOOD LUCK 😀
*/

const EV = function (make, speed, batteryCharge) {
  Car.call(this, make, speed)
  this.batteryCharge = batteryCharge
}

EV.prototype = Object.create(Car.prototype)
EV.prototype.constructor = EV

EV.prototype.chargeBattery = function (chargeTo) {
  this.batteryCharge = chargeTo
}

EV.prototype.accelerate = function () {
  this.speed += 20
  this.batteryCharge--
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.batteryCharge}%`
  )
}

const tesla = new EV("Tesla", 100, 22)
tesla.chargeBattery(66)
tesla.accelerate()
tesla.brake()
tesla.accelerate()
tesla.accelerate()
tesla.brake()
console.log(tesla)

// Class example
console.log("%c\n--- encapsulation ---", "color: #28b487")

class Account {
  // Fields and propertie are AVAILABLE ON INSTANCES

  // Public fields
  locale = navigator.language

  // Private fields
  #movements = []
  #pin

  constructor(owner, currency, pin) {
    this.owner = owner
    this.currency = currency

    // Protected property
    this.#pin = pin
    // this._movements = []

    // this.locale = navigator.language

    console.log(`Thanks for opening an account, ${owner}`)
  }

  // METHODS ARE AVAILABLE ON THE PROTOTYPE
  // Public interface of Public API of our objects
  getMovements() {
    return this.#movements
  }

  deposit(val) {
    this.#movements.push(val)
    return this
  }

  withdraw(val) {
    this.deposit(-val)
    return this
  }

  reqLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val)
      console.log("Loan approved")
      return this
    }
  }

  // Private methdos
  #approveLoan(val) {
    return true
  }
}

const acc1 = new Account("Jonas", "EUR", 1111)

/* 
BAD IDEA, USE THE PUBLIC INTERFACE INSTEAD
acc1.movements.push(100)
acc1.movements.push(-230)
*/

// Chaining methods
console.log("%c\n--- chaining methods ---", "color: #28b487")
acc1.deposit(100).deposit(500).withdraw(35).reqLoan(25000).withdraw(4000)

console.log(acc1.getMovements())
