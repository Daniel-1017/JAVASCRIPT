const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
])

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

/////////////////////////////////////////////////

movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`)
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`)
  }
})

// Use forEach if you don't need to break out of the loop otherwise use for of loop

console.log("")

// FOR EACH ON MAPS AND SETS
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`)
})

const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"])
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`)
})

console.log("")

/////////////////////////////////////////////////

let arr = ["a", "b", "c", "d", "e"]

// SLICE
console.log(arr.slice(2))
console.log(arr.slice(2, 4))
console.log(arr.slice(-2))
console.log(arr.slice(1, -2))
console.log(arr.slice())

// Slice does not mutate the original array

// SPLICE
console.log(arr.splice(0, 2))
console.log(arr.splice(-1))

// Splice does mutate the original array

// REVERSE
const arr2 = ["j", "i", "h", "g", "f"]
console.log(arr2.reverse())

// Reverse does mutate the original array

// CONCAT
arr = ["a", "b", "c", "d", "e"]
const letters = arr.concat(arr2)
console.log(letters)

// Concat does not mutate the original array

// JOIN
console.log(letters.join(" - "))

// Join does not mutate the original array

const arr3 = [23, 11, 64]

// AT
console.log(arr3.at(0))
console.log(arr3.at(-1))
console.log("jonas".at(-1))

// MAP
const eurToUsd = 1.1

const movementsUsd = movements.map(mov => mov * eurToUsd)

// Map does not mutate the original array

// FILTER
const deposits = movements.filter(mov => mov > 0)

// Filters elements based on a certain condition
// Filter does not mutate the original array

// REDUCE
const balance = movements.reduce((acc, curr) => acc + curr, 0)

// Reduces a array into a single value
// Reduce does not mutate the original array

const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
)

// CHAINING METHODS
const totalDepositsinUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr) inspect the array
    return mov * eurToUsd
  })
  .reduce((acc, mov) => acc + mov, 0)

// FIND
const firstWithdrawal = movements.find(mov => mov < 0)

// Find returns just the first value matching the condition

// SOME and EVERY
const anyDeposits = movements.some(mov => mov > 1500)

console.log(movements.every(mov => mov > 0))

// Separate callback
const deposit = mov => mov > 0
console.log(movements.every(deposit))
console.log(movements.some(deposit))

// FLAT and FLATMAP
// flat
const arr4 = [[1, 2, 3], [4, 5, 6], 7, 8]
const arrDeep = [[1, 2, 3, [6, 9]], [4, 5, 6], 7, 8]
console.log(arr4.flat())
console.log(arrDeep.flat(2))

// With flat you can choose how many level deep you want to go ex: flat(2)

const accountMovements = accounts.map(acc => acc.movements)
const allMovements = accountMovements.flat()

const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0)

// flatMap

// flatMap goes only 1 level deep

const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0)

// Sorting arrays
const owners = ["Jonas", "Zach", "Adam", "Martha"]
console.log(owners.sort())

// Ascending
// return < 0 A, B
// return > 0 B, A
movements.sort((a, b) => {
  if (a > b) return 1
  if (b > a) return -1
})

movements.sort((a, b) => a - b)

console.log(movements)

// Descending
movements.sort((a, b) => {
  if (a > b) return -1
  if (b > a) return 1
})

movements.sort((a, b) => b - a)

console.log(movements)

// Sort does mutate the original array

console.clear()

// More ways to create and fill arrays
const x = new Array(7) // 7 is the length of the array, use fill method to fill it
x.fill(1, 3, 5) // content, from, to

// Array.from
const y = Array.from({ length: 7 }, () => 1)
const z = Array.from({ length: 7 }, (_, i) => i + 1)

// Converting NodeList into array
document
  .querySelector(".balance__value")
  .addEventListener("click", function () {
    // 1.
    const movementsUI = Array.from(
      document.querySelectorAll(".movements__value"),
      el => Number(el.textContent.replace("€", ""))
    )

    // 2.
    const movementsUI2 = [...document.querySelectorAll(".movements__value")]
  })

// Array methods are not available on NodeLists so we can use Array.from() to convert them to arrays
