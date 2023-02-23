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
