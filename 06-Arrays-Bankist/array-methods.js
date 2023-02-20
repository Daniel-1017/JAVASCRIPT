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
