// Converting
console.log(Number("10"))
console.log(+"10")

// Parsing
console.log(Number.parseInt("30px", 10))
console.log(Number.parseFloat("2.5px"))

// Check if value is NaN
console.log(Number.isNaN("20"))
console.log(Number.isNaN(+"20X"))
console.log(Number.isNaN(20 / 0))

// Check if value is number
console.log(Number.isFinite(20))
console.log(Number.isFinite("20"))
console.log(Number.isFinite(20 / 0))

console.log(Number.isInteger(20))
console.log(Number.isInteger("20"))
console.log(Number.isInteger(20 / 0))

console.clear()

console.log(Math.sqrt(25))
console.log(25 ** (1 / 2))
console.log(8 ** (1 / 3))

console.log(Math.max(1, 2, 5, 4, 7, 2, 7, 10))
console.log(Math.min(1, 2, 5, 4, 7, 2, 7, 10))

console.log(Math.PI * Number.parseFloat("10px") ** 2)

console.log(Math.trunc(Math.random() * 6) + 1)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min

console.log(randomInt(10, 20))

// Rounding
console.log(Math.trunc(10.8))

console.log(Math.round(10.8))
console.log(Math.round(10.4))

// Round up
console.log(Math.ceil(10.8))
console.log(Math.ceil(10.4))

// Round down
console.log(Math.floor(10.8))
console.log(Math.floor(10.4))

// trunc and floor are similar but floor works with negative numbers too

// Rounding decimals
console.log((2.7).toFixed(0))
console.log((2.7).toFixed(3))
console.log((2.4598).toFixed(2))

// Reminder
console.log(5 % 2)
console.log(8 % 3)

const isEven = n => n % 2 === 0
console.log(isEven(8))
console.log(isEven(23))

// document.body.addEventListener("click", function () {
//   ;[...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = "orangered"
//   })
// })

// Numeric separators
const sunDiameter = 287_460_000_000
const price = 453_99

console.log(Number("23_51")) // Wrong (NaN)

// BigInt
console.log(3462953265623987520235408946n)
console.log(BigInt(3462953265623987520235408946))

// Operations
console.log(235602935603256923034n * 9075609875423085302457n)

console.log(typeof 20n)
console.log(typeof 20)

console.log(20n > 10)

// Division
console.log(12n / 3n)
console.log(8n / 3n)
// It will cut the decimal part

// Can't mix BigInt with normal numbers
// Math operation does not work with big int Math.sqrt(16n) WRONG

// Dates
// const now = new Date()
// console.log(now)

new Date(account1.movementsDates[0])
new Date(2037, 1, 2, 15, 23, 6)
new Date(0)

console.clear()

// Working with dates
const future = new Date(2037, 10, 19, 15, 13)
console.log(future.getFullYear())
console.log(future.getMonth())
console.log(future.getDate()) // day of the month
console.log(future.getDay()) // day of the week
console.log(future.getHours())
console.log(future.getMinutes())
console.log(future.getSeconds())
console.log(future.toISOString())

console.log(future.getTime())
console.log(Date.now())

future.setFullYear(2040)
console.log(future)

// Operation with dates
// console.log(calcDayPassed(new Date(2037, 3, 14), new Date(2037, 3, 24)))

// Internationalizing Dates (Intl)
const now = new Date()
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
}
const locale = navigator.language
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now)

// Internationalizing Numbers (Intl)
const n = 8716234.23

const options2 = {
  style: "currency",
  unit: "celsius",
  currency: "EUR",
  // useGrouping: false,
}

console.log("US", new Intl.NumberFormat("en-US", options2).format(n))
console.log("Germany", new Intl.NumberFormat("de-DE", options2).format(n))
console.log("Syria", new Intl.NumberFormat("ar-SY", options2).format(n))
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options2).format(n)
)

console.clear()

// Timers: setTimeout and setInterval
const ingredients = ["olives"]

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
)

if (ingredients.includes("spinach")) clearTimeout(pizzaTimer)

// setInterval
// setInterval(function () {
//   const now = new Date()
//   console.log(now.getSeconds())
// }, 1000)
