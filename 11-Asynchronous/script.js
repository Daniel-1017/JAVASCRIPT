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

const renderError = msg => {
  countriesContainer.insertAdjacentText("beforeend", msg)
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

// Challenge 2
/* 
Build the image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉
PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.
If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.
TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
GOOD LUCK 😀
*/

const imgContainer = document.querySelector(".images")

const createImage = imagePath => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img")
    img.src = imagePath

    img.addEventListener("load", () => {
      imgContainer.append(img)
      resolve(img)
    })

    img.addEventListener("error", () => reject(new Error("Image not found")))
  })
}

let currentImg

  /* 
createImage("img/img-1.jpg")
  .then(img => {
    currentImg = img
    return wait(2)
  })
  .then(() => {
    currentImg.style.display = "none"
    return createImage("img/img-2.jpg")
  })
  .then(img => {
    currentImg = img
    return wait(2)
  })
  .then(() => {
    currentImg.style.display = "none"
  })
  .catch(console.error)
 */

  // Async / Await
;(() => {
  // whereAmI 3.0
  const whereAmI = async () => {
    try {
      // Geolocation
      const pos = await getPosition()
      const { latitude: lat, longitude: lng } = pos.coords

      // Reverse geocoding
      // prettier-ignore
      const resGeo = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=9c0924a22160435f9613fddb7a8ccc8f
    `)

      if (!resGeo.ok) throw new Error("Problem getting location data.")

      const dataGeo = await resGeo.json()

      // Country data
      const res = await fetch(
        `https://restcountries.com/v2/name/${dataGeo.results[0].country}`
      )

      if (!res.ok) throw new Error("Problem getting contry data.")

      const data = await res.json()
      renderCountry(data[0])

      return `You are if ${dataGeo.results[0].city}, ${dataGeo.results[0].country}`
    } catch (err) {
      console.error(`${err} 💥💥💥`)
      renderError(`Something went wrong 💥 ${err.message}`)

      // Reject promise returned from async function
      throw err
    }
  }

  /* 
  whereAmI()
  .then(city => console.log(city))
  .catch(err => console.log(err))
  */

  ;(async () => {
    try {
      // const city = await whereAmI()
    } catch (err) {
      console.log(err)
    }
  })()
})()

const get3Countries = async (c1, c2, c3) => {
  try {
    /* 
    const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`)
    const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`)
    const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`)
    */

    // Promise.all combinator
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ])

    /* 
    When 1 rejects then the whole Promise.all rejects aswll
    Promise.all shortcircuits when 1 promise rejects
    When you have multiple operation at the same time and operation that don't depent on one another then you should always run them in parallel with Promise.all
    */
    console.log(data.flat().map(d => d.capital))
  } catch (err) {
    console.log(err)
  }
}

get3Countries("portugal", "tanzania", "moldova")

// Promise.rece
;(async () => {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/japan`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ])
  console.log(res[0])
  /* 
  Promise.race returns the one who finishes first NOT all of them
  A promise who is rejected can also win the race
  Promise.race shortcircuits whnever one of the promises gets settled even if it is rejected
  */
})()

const timeout = s => {
  return new Promise((_, rej) => {
    setTimeout(() => {
      rej(new Error("Request took too long."))
    }, s * 1000)
  })
}

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(0.2),
])
  .then(data => console.log(data[0]))
  .catch(console.error)

// Promise.allSettled ES2020
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success"),
]).then(res => console.log(res))
// Promise.allSettled never shortcircuits

// Promise.any ES2021
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success"),
]).then(res => console.log(res))
// Returns the first fullfilled promise unless all of them reject
// REJECTED PROMISES ARE IGNORED

// Challenge 3
/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).
TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.
GOOD LUCK 😀
*/

// PART 1

const loadNPause = async () => {
  try {
    let img = await createImage("img/img-1.jpg")
    await wait(2)
    img.style.display = "none"

    img = await createImage("img/img-2.jpg")
    await wait(2)
    img.style.display = "none"
  } catch (err) {
    console.log(err)
  }
}

// loadNPause()

// PART 2
const loadAll = async imgArr => {
  try {
    const imgs = imgArr.map(async img => await createImage(img))
    const imgsEl = await Promise.all(imgs)
    imgsEl.forEach(img => img.classList.add("parallel"))
  } catch (err) {
    console.log(err)
  }
}

loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"])
