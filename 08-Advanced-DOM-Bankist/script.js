"use strict"

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const btnCloseModal = document.querySelector(".btn--close-modal")
const btnsOpenModal = document.querySelectorAll(".btn--show-modal")
const header = document.querySelector(".header")
const nav = document.querySelector(".nav")
const tabs = document.querySelectorAll(".operations__tab")
const tabsContainer = document.querySelector(".operations__tab-container")
const tabsContent = document.querySelectorAll(".operations__content")

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove("hidden")
  overlay.classList.remove("hidden")
}

const closeModal = function () {
  modal.classList.add("hidden")
  overlay.classList.add("hidden")
}

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal))

btnCloseModal.addEventListener("click", closeModal)
overlay.addEventListener("click", closeModal)

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal()
  }
})

const message = document.createElement("div")
message.classList.add("cookie-message")
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'

// append and prepend will insert them as child
// header.prepend(message)
// header.append(message)

// before and after will insert them as a sibling
// header.before(message)
// header.after(message)

header.after(message)

// Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove()

    // OLD WAY
    // message.parentElement.removeChild(message)
  })

// Button scrolling
const btnScrollTo = document.querySelector(".btn--scroll-to")
const section1 = document.querySelector("#section--1")

btnScrollTo.addEventListener("click", function (e) {
  const s1Coords = section1.getBoundingClientRect()

  console.log("Current scroll X/Y:", window.scrollX, window.scrollY)

  console.log(
    "height/width viewport:",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  )

  console.log(e.target.getBoundingClientRect())

  // Scrolling
  // OLD WAY
  // without smooth scrolling
  // window.scrollTo(s1Coords.left + window.scrollX, s1Coords.top + window.scrollY)

  // with smooth scrolling
  // window.scrollTo({
  //   left: s1Coords.left + window.scrollX,
  //   top: s1Coords.top + window.scrollY,
  //   behavior: "smooth",
  // })

  section1.scrollIntoView({ behavior: "smooth" })
})

// Page navigation

// good but not excellent way, not good when you have to attach the event to more links. ex: 100 links

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault()

//     const id = this.getAttribute("href")

//     document.querySelector(id).scrollIntoView({ behavior: "smooth" })
//   })
// })

// better way to do it using event delegation
// 1. Add event listener to common parent element
// 2. Determinate what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault()

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href")
    document.querySelector(id).scrollIntoView({ behavior: "smooth" })
  }
})

// Tabbed component
tabsContainer.addEventListener("click", e => {
  const clicked = e.target.closest(".operations__tab")

  // Guard clause
  if (!clicked) return

  // Remove active classes
  tabs.forEach(t => t.classList.remove("operations__tab--active"))
  tabsContent.forEach(c => c.classList.remove("operations__content--active"))

  // Active tab
  clicked.classList.add("operations__tab--active")

  // Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active")
})

// Menue fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target

    const siblings = link.closest(".nav").querySelectorAll(".nav__link")
    const logo = link.closest(".nav").querySelector("img")

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }
}

// We could use mouseenter but mouseenter doesn't bubble up
// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5))

nav.addEventListener("mouseout", handleHover.bind(1))
