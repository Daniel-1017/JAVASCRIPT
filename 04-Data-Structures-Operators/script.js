"use strict"

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30"

// Data needed for first part of the section\
const week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

const openingHours = {
  [week[0]]: {
    open: 12,
    close: 22,
  },
  [week[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
}

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `Order recived! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    )
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(ing1, ing2, ing3)
  },

  orderPizza(mainIngredient, ...otherIngredients) {
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

// Old way
if (restaurant.openingHours && restaurant.openingHours.tue) {
  console.log(restaurant.openingHours.tue.open)
}
// Optional chaining
console.log(restaurant.openingHours?.tue?.open)

// Example
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

for (let day of days) {
  console.log(day)
  const open = restaurant.openingHours[day]?.open ?? "closed"
  console.log(open)
}

// Methods
console.log(restaurant.order?.(0, 1) ?? "Method does not exist.")
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist.")

// Arrays
const users = [{ name: "Jonas", email: "test@test.com" }]
console.log(users[0]?.name ?? "User array empty.")

// ---

// Destructuring Objects
const { name, openingHours: opHours, categories } = restaurant
console.log(name, opHours, categories)

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

// for of loop
const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu]

for (const item of fullMenu) console.log(item)

// get index in for of loop
for (let [i, item] of fullMenu.entries()) {
  console.log(`${i + 1}: ${item}`)
}

// Coding chanllenge #1
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
}

// 1.
const [players1, players2] = game.players
console.log(players1, players2)

// 2.
const [gk, ...fieldPlayers] = players1
console.log(gk, fieldPlayers)

// 3.
const allPlayers = [...players1, players2]
console.log(allPlayers)

// 4.
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"]
console.log(players1Final)

// 5.
const {
  odds: { team1, x: draw, team2 },
} = game
console.log(team1, draw, team2)

// 6.
const printGoals = function (...players) {
  console.log(`${players.length} goals scored.`)
}

printGoals("Davies", "Muller", "Lewandowski", "Kimmich")
printGoals("Davies", "Muller")
printGoals(...game.scored)

// 7.
team1 < team2 && console.log("Team 1 is more likely to win.")
team1 > team2 && console.log("Team 1 is more likely to win.")

// Looping over objects

// Property names
const properties = Object.keys(openingHours)
let openStr = `We are opened ${properties.length} days: `

for (const day of properties) {
  openStr += `${day}`
  console.log(openStr)
}

// Property values
const values = Object.values(openingHours)
console.log("🚀 ~ file: script.js:373 ~ values", values)

const entries = Object.entries(openingHours)
console.log("🚀 ~ file: script.js:376 ~ entries", entries)

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open ad ${open} and close at ${close}`)
}

// Coding challenge #2

// 1.
for (const [goal, player] of game.scored.entries()) {
  console.log(`Goal ${+goal + 1}, ${player}`)
}

// 2.
const odds = Object.values(game.odds)
let average = 0
for (const odd of odds) average += odd
average /= Object.values(odds).length

// 3.
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`
  console.log(`Odd of ${teamStr} ${odd}`)
}

// BONUS
const scores = {}
for (const player of Object.values(game.scored)) {
  scores[player] ? scores[player]++ : (scores[player] = 1)
}
console.log(scores)

// Sets and Maps

// Sets are great for working with unique and unordered values
const ordersSet = new Set(["pasta", "pizza", "pasta", "risotto", "pizza"])
console.log(ordersSet)
console.log(ordersSet.size)
console.log(ordersSet.has("pizza"))
console.log(ordersSet.has("bread"))
ordersSet.add("garlic bread")
ordersSet.add("garlic bread")
ordersSet.delete("risotto")
// ordersSet.clear()
console.log(ordersSet)

for (const order of ordersSet) console.log(order)

// Example
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]
const staffUnique = [...new Set(staff)]

// Map

// Is a data structure we can use to bind value to any kind of keys (objects, arrays, strings, numbers)
const rest = new Map()
rest.set("name", "Classico Italiano")
rest.set(1, "Firenze, Italy")
rest.set(2, "Tokyo, Japan")
rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are opened")
  .set(false, "We are closed")
rest.get("name")
rest.has("categories")
rest.delete(2)
rest.set(document.querySelector("h1"), "Heading")
console.log(rest.size)
// rest.clear()

const key = [1, 2]
rest.set(key, "Test")
console.log(rest.get(key))

const time = 21
console.log(rest.get(time > rest.get("open") && time < rest.get("close")))
console.log(rest)

const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct 🎉"],
  [false, "Try again!"],
])

// Convert object to map
const hoursMap = new Map(Object.entries(openingHours))

// Convert Map to array
const mapArray = [...question]

// Loop over a map
//Quiz app
console.log(question.get("question"))
for (const [key, val] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${val}`)
}
// const answer = Number(prompt("Your answer"))

// if (answer === question.get("correct")) console.log(question.get(true))
// else console.log(question.get(false))
