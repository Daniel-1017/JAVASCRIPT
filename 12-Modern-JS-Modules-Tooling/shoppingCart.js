// Exporting module

// Variables are scoped to this module
const shippingCost = 10
const cart = []

export const addToCart = (product, quantity) => {
  cart.push(product)
  console.log(`${quantity} ${product} added to the cart.`)
}

const totalPrice = 237
const totalQuantity = 23

export { totalPrice, totalQuantity as qty }

// Default exports
export default (product, quantity) => {
  cart.push(product)
  console.log(`${quantity} ${product} added to the cart.`)
}
