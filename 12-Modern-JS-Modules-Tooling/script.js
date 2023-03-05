// Importing module

// Named imports
/* 
import {
    addToCart,
    totalPrice as price,
    totalQuantity,
} from "./shoppingCart.js"
*/

// Import everything
import * as ShoppingCart from "./shoppingCart.js"

console.log("price: " + ShoppingCart.price, "quantity: " + ShoppingCart.qty)
ShoppingCart.addToCart("bread", 5)

// Default imports
import add from "./shoppingCart.js"
add("apples", 10)

// Imports are not a copy of exports, they are alike a live connection

/* 
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
const lastPost = await getLastPost()
console.log(lastPost)
