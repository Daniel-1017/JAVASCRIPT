"use strict"

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30"

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order recived! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    )
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(ing1, ing2, ing3)
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients)
  },
}

restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
})

restaurant.orderDelivery({
  address: "Via del Sole, 21",
  starterIndex: 1,
})

// Destructuring Objects
const { name, openingHours, categories } = restaurant
console.log(name, openingHours, categories)

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant
console.log(restaurantName, hours, tags)

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant
console.log(menu, starters)

// Mutating variables
let a = 101
let b = 899
const obj = { a: 23, b: 7, c: 14 }
;({ a, b } = obj)
console.log(a, b)

// Nested objects
const {
  fri: { open: o, close: c },
} = openingHours
console.log(o, c)

// Destructuring Arrays
let [main, secondary] = restaurant.categories
console.log(main, secondary)
;[main, secondary] = [secondary, main]
console.log(main, secondary)

// Recive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0)
console.log(starter, mainCourse)

// Nested destructuring
const nested = [2, 4, [5, 6]]
// const [i, , j] = nested
const [i, , [j, k]] = nested
console.log(i, j, k)

// Default values
const [p = 1, q = 1, r = 1] = [8, 9]
console.log(p, q, r)

// ... spread operators
const arr = [7, 8, 9]
const goodNewArr = [1, 2, 3, ...arr]
console.log(goodNewArr)
console.log(...arr)

const newMenu = [...restaurant.mainMenu, "Gnocchi"]
console.log(newMenu)

// Copy array
const mainMenuCopy = [...restaurant.mainMenu]

// Join 2 array
const mergedMenues = [...restaurant.mainMenu, ...restaurant.starterMenu]

// Iterables: arrays, strings, maps, sets. NOT objects

// Real world example
const str = "Jonas"
const letters = [...str, " ", "S."]
console.log(letters)

// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make pasta! Ingredient 3?"),
// ]

// restaurant.orderPasta(...ingredients)

// Objects
const newRestaurant = { ...restaurant, founder: "Giuseppe." }
console.log(newRestaurant)

const restaurantCopy = { ...restaurant }
restaurant.name = "Ristorante Roma"
console.log(restaurantCopy.name)
console.log(restaurant.name)

// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arr2 = [1, 2, ...[3, 4]]

// REST, because on LEFT side of =
const [g, h, ...others] = [1, 2, 3, 4, 5, 6]
console.log(g, h, others)

// REST must always be the last
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
]
console.log(pizza, risotto, otherFood)

// Objects
const { sat, ...weekdays } = restaurant.openingHours
console.log(sat, weekdays)

// 2) Functions
const add = function (...numbers) {
  let sum = numbers.reduce((a, b) => a + b, 0)
  console.log(sum)
}

add(2, 3)
add(2, 3, 5, 6, 7, 2)

const x = [21, 5, 6]
add(...x)

// With the SPREAD we expand, with the REST we compress

restaurant.orderPizza("mushrooms", "onion", "olives")
restaurant.orderPizza("mushrooms")

console.log("--- || ---")
// Can use logical operators for
// Short circuiting / Short circuit evaluation
console.log(3 || "Daniel")
console.log("" || "Daniel")

// restaurant.guests = 23
const guests = restaurant.guests || 10
console.log(guests)

console.log("--- && ---")
console.log(1 && "Jonas")
console.log(0 && "Jonas")

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach")
}

restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach")

// || operator will return the first truthy value or the last one in case they are all false

// && will return the first falsy value or the last one in case they are all true

// Nullish coalescing operator
// Works with null & undefined (NOT 0 or "")
restaurant.guests = 0
const guests2 = restaurant.guests ?? 10
console.log(guests2)

// Logical assignment operators
const rest1 = {
  name: "Capri",
  guests: 0,
}

const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
}

// OR assignment operator
rest1.guests ||= 10
rest2.guests ||= 10

// ?? or nullish assignment operator (null or undefined)
rest1.guests ??= 10
rest2.guests ??= 10

// && assignment operator
rest1.owner &&= "ANONIMUS"
rest2.owner &&= "ANONIMUS"

console.log(rest1)
console.log(rest2)
