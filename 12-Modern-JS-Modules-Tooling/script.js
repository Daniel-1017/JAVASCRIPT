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
