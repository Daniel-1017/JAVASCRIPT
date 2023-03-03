"use strict"

const btn = document.querySelector(".btn-country")
const countriesContainer = document.querySelector(".countries")

///////////////////////////////////////

const renderCountry = (data, className = "") => {
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(2)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>
    `
  countriesContainer.insertAdjacentHTML("beforeend", html)
  countriesContainer.style.opacity = 1
}

// XMLHttpRequests
const getCountryData = country => {
  const request = new XMLHttpRequest()
  request.open("GET", `https://restcountries.com/v2/name/${country}`)
  request.send()
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText)

    renderCountry(data)
  })
}

// AJAX call country 1
const getCountryAndNeighbour = country => {
  const request = new XMLHttpRequest()
  request.open("GET", `https://restcountries.com/v2/name/${country}`)
  request.send()
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText)

    // Render country 1
    renderCountry(data)

    // Get neighbour country (2)
    const neighbour = data.borders?.[0]

    if (!neighbour) return

    // AJAX call country 2
    const request2 = new XMLHttpRequest()
    request2.open("GET", `https://restcountries.com/v2/alpha/${neighbour}`)
    request2.send()

    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText)
      renderCountry(data2, "neighbour")
    })
  })
}

// Promises and Fetch API

/* 
A Promise is an object used as a placeholder for the future result of an asynchronous operation.

Advantages:
    1. No need to rely on events and callbacks
    2. Instead of nesting callbacks, we can chain promises

Promise life-cycle
    1. PENDING (before the future value is available)
    2. SATTLED (asynchronous task has finished)
        - FULFILLED (success! the value is now available)
        - REJECTED (an error happened)

A promise is only sattled once, so from there the state will remain unchanged forever

CONSUME A PROMISE
When we already have a promise. E.g. promise returned from Fetch API. But before it needs to be build. E.g. Fetch API returns promise.

E.g. fetch("https://restcountries.com/v2/name/portugal")
*/

const getCountryDataWithFetch = country => {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(res => res.json())
    .then(([data]) => renderCountry(data))
}

getCountryDataWithFetch("portugal")
