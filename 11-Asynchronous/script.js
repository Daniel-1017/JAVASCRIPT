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
  // countriesContainer.style.opacity = 1
}

const renderError = msg => {
  countriesContainer.insertAdjacentText("beforeend", msg)
  // countriesContainer.style.opacity = 1
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
  // Callback Hell
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

const getJSON = (url, errorMsg = "Something went wrong") => {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`)
    return res.json()
  })
}

const getCountryDataWithFetch = country => {
  // Flat chain of promises
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
    .then(([data]) => {
      renderCountry(data)
      const neighbour = data.borders?.[0]

      if (!neighbour) throw new Error("No neighbour found")

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Country not found"
      )
      // By returning this promise, then the fulfilled value of the next method will be the fulfilled value of this previeous promese

      /* 
      WRONG
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
      .then(res => res.json())
      .then(data => renderCountry(data, "neighbour"))

      This will work but we are back to callback hell
      */
    })
    .then(data => renderCountry(data, "neighbour"))
    .catch(err => {
      console.error(`${err} 💥💥💥💥💥`)
      renderError(`Something went wrong! 💥💥💥💥💥 ${err.message}. Try again!`)
    })
    .finally(() => (countriesContainer.style.opacity = 1))
}

/* 
btn.addEventListener("click", () => {
  getCountryDataWithFetch("portugal")
})
 */

/* 
Challenge 1

In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
GOOD LUCK 😀
*/

// user website https://apidocs.geoapify.com/
// default url 'https://api.geoapify.com/v1/geocode/reverse?lat=52.51894887928074&lon=13.409808180753316&format=json&apiKey=YOUR_API_KEY'

/* 
const whereAmI = (lat, lng) => {
  // prettier-ignore
  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=9c0924a22160435f9613fddb7a8ccc8f
  `)
  .then(res => {
    if (!res.ok) throw new Error(`Problem with geocoding (${res.status})`)
    
    return res.json()
  })
  .then(({results}) => {
    const {city, country} = results[0]
    console.log(`You are in ${city}, ${country}`);
    getCountryDataWithFetch(country)
  }).catch(err => console.error(err))
}
*/

/* 
whereAmI(52.508, 13.381)
whereAmI(19.037, 72.873)
whereAmI(-33.933, 18.474)
*/

// Event loop
/* 
console.log("%c--- event loop ---", "color: #28b487")
 
console.log("Test start") // 1 to finish
setTimeout(() => console.log("0 sec timer"), 0) // 4 to finish
Promise.resolve("Resolved promise 1").then(console.log) // 3 to finish
console.log("Test end") // 2 to finish
*/

// Building promises
// the Promise contructor take in jusn one argument which is the executor function
const lotteryPromise = new Promise((resolve, reject) => {
  console.log("Lottery draw began 🔮")
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("You WIN 💰") // promise fulfilled
    } else {
      reject(new Error("You lost your money")) // promise rejected
    }
  }, 2000)
})

lotteryPromise.then(console.log).catch(console.error)

// PROMISIFYING
// means to convert callback based asynchronous behavior to promise based.

// Promisifying setTimeout
const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}

wait(2)
  .then(() => {
    console.log("I waited for 2 seconds")
    return wait(1)
  })
  .then(() => console.log("I waited for 1 second"))

// Create a fulfilled or rejected promise, this is resolved or rejecterd immediately
Promise.resolve("abc fulfilled").then(console.log)
Promise.reject(new Error("Problem!")).then(console.error)

// Promisifying the Geolocation API
const getPosition = () => {
  return new Promise((resolve, reject) => {
    /* Method 1 
      navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    ) */

    // Method 2
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

getPosition().then(console.log)

// whereAmI 2.0
const whereAmI = () => {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords

      // prettier-ignore
      return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=9c0924a22160435f9613fddb7a8ccc8f
  `)
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding (${res.status})`)

      return res.json()
    })
    .then(({ results }) => {
      const { city, country } = results[0]
      console.log(`You are in ${city}, ${country}`)
      getCountryDataWithFetch(country)
    })
    .catch(err => console.error(err))
}

btn.addEventListener("click", whereAmI)
