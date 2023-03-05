// Importing module


// Named imports
/* 
import {
    addToCart,
    totalPrice as price,
    totalQuantity,
} from "./shoppingCart.js"
*/

console.log('%c--- Modules ---', 'color: #28b487')

// Import everything
import * as ShoppingCart from "./shoppingCart.js"

console.log("price: " + ShoppingCart.price, "quantity: " + ShoppingCart.qty)
ShoppingCart.addToCart("bread", 5)

// Default imports
import add from "./shoppingCart.js"
add("apples", 10)

// Imports are not a copy of exports, they are alike a live connection

/* 
TOP LEVEL AWAIT

Top level-await (works only in modules) BLOCKS THE EXECUTION OF THE ENTIRE MODULE

const res = await fetch("https://jsonplaceholder.typicode.com/posts")
const data = await res.json()
console.log(data);
*/

const getLastPost = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await res.json()

  return { title: data.at(-1).title, text: data.at(-1).body }
}

// async functions always return promise

/* 
OLD WAY

const lastPost = getLastPost()
lastPost.then(last => console.log(last))
*/

// Using top-level await
/* 
const lastPost = await getLastPost()
console.log(lastPost)
*/

// Module pattern
console.log('%c\n--- Module pattern ---', 'color: #28b487')
const ShoppingCart2 = (() => {
    const cart = []
    const shippingCost = 10
    const totalPrice = 237
    const totalQuantity = 23

    const addToCart = (product, quantity) => {
        cart.push({product, quantity})
        console.log(`${quantity} ${product} added to cart (shipping cost ${shippingCost})`);
    }

    const orderStock = (product, quantity) => {
        console.log(`${quantity} ${product} ordered from supplier`);
    }

    return {addToCart, cart, totalPrice, totalQuantity}
})()

import cloneDeep from 'lodash-es'
const state = {
    cart: [
        {product: 'bread', quantity: 5},
        {product: 'pizza', quantity: 2},
    ],
    user: {loggedIn: true}
}

const stateClone = Object.assign({}, state)
const stateDeepClone = cloneDeep(state)

state.user.loggedIn = false

console.log(stateClone);
console.log(stateDeepClone);

// Configuring babel
if (module.hot) {
    module.hot.accept()
}

class Person {
    #greeting = "hey"
    constructor(name) {
        this.name = name
        console.log(`${this.#greeting} ${this.name}`);
    }
}

const jonas = new Person("Jonas")

console.log("Jonas" ?? null);

ShoppingCart.addToCart("bread", 5)
ShoppingCart.addToCart("apple", 1)
console.log(ShoppingCart.cart.find(el => el.quantity >= 2));

import "core-js/stable"

// Polyfilling async functions
import "regenerator-runtime/runtime"