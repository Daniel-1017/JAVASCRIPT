"use strict"

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
}

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
}

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
}

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
}

const accounts = [account1, account2, account3, account4]

// Elements
const labelWelcome = document.querySelector(".welcome")
const labelDate = document.querySelector(".date")
const labelBalance = document.querySelector(".balance__value")
const labelSumIn = document.querySelector(".summary__value--in")
const labelSumOut = document.querySelector(".summary__value--out")
const labelSumInterest = document.querySelector(".summary__value--interest")
const labelTimer = document.querySelector(".timer")

const containerApp = document.querySelector(".app")
const containerMovements = document.querySelector(".movements")

const btnLogin = document.querySelector(".login__btn")
const btnTransfer = document.querySelector(".form__btn--transfer")
const btnLoan = document.querySelector(".form__btn--loan")
const btnClose = document.querySelector(".form__btn--close")
const btnSort = document.querySelector(".btn--sort")

const inputLoginUsername = document.querySelector(".login__input--user")
const inputLoginPin = document.querySelector(".login__input--pin")
const inputTransferTo = document.querySelector(".form__input--to")
const inputTransferAmount = document.querySelector(".form__input--amount")
const inputLoanAmount = document.querySelector(".form__input--loan-amount")
const inputCloseUsername = document.querySelector(".form__input--user")
const inputClosePin = document.querySelector(".form__input--pin")

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ""

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal"

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
        ${i + 1} ${type}
      </div>
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>
    `

    containerMovements.insertAdjacentHTML("afterbegin", html)
  })
}

const calcAndPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`
}

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes.toFixed(2)}€`

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = `${interest.toFixed(2)}€`
}

const createUsernames = function (accs) {
  accs.forEach(
    acc =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(" ")
        .map(name => name[0])
        .join(""))
  )
}
createUsernames(accounts)

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements)

  // Display balance
  calcAndPrintBalance(acc)

  // Display summary
  calcDisplaySummary(acc)
}

// Event Handler
let currentAccount

btnLogin.addEventListener("click", function (e) {
  e.preventDefault()

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  )

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`
    containerApp.style.opacity = 100

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ""

    updateUI(currentAccount)
  }
})

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault()
  const amount = Number(inputTransferAmount.value)
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  )

  if (
    amount > 0 &&
    reciverAcc &&
    currentAccount.balance >= amount &&
    reciverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount)
    reciverAcc.movements.push(amount)
    updateUI(currentAccount)
  }

  inputTransferAmount.value = inputTransferTo.value = ""
})

btnLoan.addEventListener("click", function (e) {
  e.preventDefault()
  const amount = Math.floor(inputLoanAmount.value)

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount)

    // Update UI
    updateUI(currentAccount)
  }

  inputLoanAmount.value = ""
})

btnClose.addEventListener("click", function (e) {
  e.preventDefault()

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    )

    // Delete account
    accounts.splice(index, 1)

    // Hide UI
    containerApp.style.opacity = 0
  }

  inputCloseUsername.value = inputClosePin.value = ""
})

let sorted = false
btnSort.addEventListener("click", function (e) {
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})

// ---------------------------------
// Converting
console.log(Number("10"))
console.log(+"10")

// Parsing
console.log(Number.parseInt("30px", 10))
console.log(Number.parseFloat("2.5px"))

// Check if value is NaN
console.log(Number.isNaN("20"))
console.log(Number.isNaN(+"20X"))
console.log(Number.isNaN(20 / 0))

// Check if value is number
console.log(Number.isFinite(20))
console.log(Number.isFinite("20"))
console.log(Number.isFinite(20 / 0))

console.log(Number.isInteger(20))
console.log(Number.isInteger("20"))
console.log(Number.isInteger(20 / 0))

console.clear()

console.log(Math.sqrt(25))
console.log(25 ** (1 / 2))
console.log(8 ** (1 / 3))

console.log(Math.max(1, 2, 5, 4, 7, 2, 7, 10))
console.log(Math.min(1, 2, 5, 4, 7, 2, 7, 10))

console.log(Math.PI * Number.parseFloat("10px") ** 2)

console.log(Math.trunc(Math.random() * 6) + 1)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min

console.log(randomInt(10, 20))

// Rounding
console.log(Math.trunc(10.8))

console.log(Math.round(10.8))
console.log(Math.round(10.4))

// Round up
console.log(Math.ceil(10.8))
console.log(Math.ceil(10.4))

// Round down
console.log(Math.floor(10.8))
console.log(Math.floor(10.4))

// trunc and floor are similar but floor works with negative numbers too

// Rounding decimals
console.log((2.7).toFixed(0))
console.log((2.7).toFixed(3))
console.log((2.4598).toFixed(2))

// Reminder
console.log(5 % 2)
console.log(8 % 3)

const isEven = n => n % 2 === 0
console.log(isEven(8))
console.log(isEven(23))

// document.body.addEventListener("click", function () {
//   ;[...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = "orangered"
//   })
// })

// Numeric separators
const sunDiameter = 287_460_000_000
const price = 453_99

console.log(Number("23_51")) // Wrong (NaN)

// BigInt
console.log(3462953265623987520235408946n)
console.log(BigInt(3462953265623987520235408946))

// Operations
console.log(235602935603256923034n * 9075609875423085302457n)

console.log(typeof 20n)
console.log(typeof 20)

console.log(20n > 10)

// Division
console.log(12n / 3n)
console.log(8n / 3n)
// It will cut the decimal part

// Can't mix BigInt with normal numbers
// Math operation does not work with big int Math.sqrt(16n) WRONG
