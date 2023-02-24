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

// Inline Styles
message.style.backgroundColor = "#37383d"

// Getting styles
console.log(getComputedStyle(message).backgroundColor)

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px"

// document.documentElement.style.setProperty("--color-primary", "orangered")

// Attributes
const logo = document.querySelector(".nav__logo")
console.log(logo.alt)
console.log(logo.src) // absolute path
console.log(logo.getAttribute("src")) // relative path
console.log(logo.className)

logo.alt = "Beautiful minimalist logo"

// Non-standard
console.log(logo.designer) // undefined
console.log(logo.getAttribute("designer"))
logo.setAttribute("company", "bankist")

// Data attributes
console.log(logo.dataset.versionNumber)

// Classes
logo.classList.add("fake-class-name")
logo.classList.remove("fake-class-name")
logo.classList.toggle("fake-class-name")
logo.classList.contains("fake-class-name")

// This will overwrite old classes
// logo.className = "Jonas"

// Type of events and event handlers
const h1 = document.querySelector("h1")

// addEventListener allows us to add more event listeners and remove them if we don't need them any more
// const alertH1 = function (e) {
//   alert("addEventListener: Great! You are reading the heading :D")

//   h1.removeEventListener("mouseenter", alertH1)
// }

// h1.addEventListener("mouseenter", alertH1)

// OLD WAY
// If we specify more events, the previous ones will be overwritten
// h1.onmouseenter = function (e) {
//   alert("addEventListener: Great! You are reading the heading :D")
// }

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor()
  console.log("Link", e.target, e.currentTarget)

  // Stop propagation
  // Generally not a good idea
  // e.stopPropagation()
})

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor()
  console.log("Nav", e.target, e.currentTarget)
})

document.querySelector(".nav").addEventListener("click", function (e) {
  console.log("container", e.target, e.currentTarget)
  this.style.backgroundColor = randomColor()

  // e.currentTarget === this
})

// e.target is where the event originated, is not the element on which the event is attached

// all of these evenets are recieving the same event because of event bubbling

// e.currentTarget is the element on which the event is attached

// Event handler function are listening to click events that happen to the element itself and for event the bubble up from their child elements

// Traversing the DOM
const H1 = document.querySelector("h1")
console.log(H1.querySelectorAll(".highlight"))
console.log(H1.childNodes) // NodeList, gives everyting
console.log(H1.children) // HTLMCollection, gives only direct child

// H1.firstElementChild.style.color = "white"
// H1.lastElementChild.style.color = "orangered"

// Going upwards: parent
console.log(h1.parentNode)
console.log(h1.parentElement)

// h1.closest(".header").style.background = "var(--gradient-secondary)"
// .closest(".header") returns the closest element with that class

// Going sideways: siblings
console.log(H1.previousElementSibling)
console.log(H1.nextElementSibling)

console.log(H1.parentElement.children)
;[...H1.parentElement.children].forEach(function (el) {
  // if (el !== H1) el.style.scale = "0.5"
})
