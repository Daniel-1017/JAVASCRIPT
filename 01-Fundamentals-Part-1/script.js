// DATA TYPES
const number = 10
const string = "string"
const boolean = true
const _null = null
let _undefined

// let, const & var
let age = 10 // variable that can be mutated
age = 18

const birthYear = 2000 // variable that can't be mutated
// birthYear = 2001 WRONG

var job = "programmer"
job = "teacher"

// OPERATORS
const now = 2040
const ageJonas = now - 1990
const ageSara = now - 2000

console.log(ageJonas * 2, ageJonas / 2)

const firstName = "Jonas"
const lastName = "Schmedtmann"

console.log(firstName + " " + lastName)

// assignment operators
let x = 10 + 5
x += 10
x *= 4
x++
x--
console.log(x)

// comparison operators
console.log(ageJonas > ageSara, ageJonas < ageSara)
console.log(ageJonas >= 18)

// STRINGS
const jonas = "I'm " + firstName + ", a " + ageJonas + " year old teacher"

const fullname = "Sara Fusco"
// template literals
const sara = `I'm ${fullname}, a ${ageSara} year old teacher.`
console.log(sara)

// if & else
const ageToDrive = 18
const ageMara = 15
const isOldEnough = ageMara >= ageToDrive

if (isOldEnough) {
  console.log("Mara can start driving license. 🚗")
} else {
  const yearsLeft = ageToDrive - ageMara
  console.log(
    "Mara can't start driving license. 🚗",
    `Wait ${yearsLeft} more years.`
  )
}

// TYPE CONVERSION & TYPE COERCION

// conversion
const inputYear = "1991"
console.log(Number(inputYear) + 9)
console.log(String(10))
console.log(Number("jonas")) // => NaN

// coercion
console.log("Hello I'm " + 20 + " year old.")
console.log("10" - "5" - 5)
console.log("2" * "4")
console.log("8" / "4")

// TRUTHY & FALSY
// falsy values: 0, "", undefined, null, NaN
console.log(Boolean(0))
console.log(Boolean(""))
console.log(Boolean(undefined))
console.log(Boolean(null))
console.log(Boolean(NaN))

const money = 100

if (money) {
  console.log("Don't spend it all.")
} else {
  console.log("You should get a job.")
}

// == & ===
// == loose equality operator -> perform type coercion
// === strict equality operator -> does not perform type coercion
if (age === 18) {
  console.log("You just became an adult.")
}

if (age == "18") {
  console.log("You just became an adult.")
}

// LOGICAL OPERATORS
const a = true
const b = false

console.log(a && b)
console.log(a || b)
