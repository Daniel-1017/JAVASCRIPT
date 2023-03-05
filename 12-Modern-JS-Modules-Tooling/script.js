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

ShoppingCart2.addToCart("apple", 4)
ShoppingCart2.addToCart("pizza", 2)