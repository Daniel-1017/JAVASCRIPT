// Selecting elements
console.log(document.documentElement)
console.log(document.head)
console.log(document.body)

document.querySelector(".header")
const allSections = document.querySelectorAll(".section")
document.getElementById("section--1")
const allButtons = document.getElementsByTagName("button")
// getElementsByTagName returns a HTMLCollection that updates every time we delete a element belonging to that collection
// That doesn't happer with a NodeList

document.getElementsByClassName("btn")
// getElementsByClassName return a HtmlCollection too

// Creating elements
const message1 = document.createElement("div")
message1.classList.add("cookie-message")
// message.textContent = 'We use cookies for improved functionality and analytics.'
message1.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn-close-cookie">Got it!</button>'

console.log("🚀 ~ file: advanced-DOM-and-events.js:18 ~ message:", message1)
