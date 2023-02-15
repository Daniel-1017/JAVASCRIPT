"use strict"

/* 
document.querySelector(".message").textContent = "Correct Number"
document.querySelector(".number").textContent = 13
document.querySelector(".score").textContent = 5
document.querySelector(".guess").value = 10
*/

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value)

  if (!guess) {
    document.querySelector(".message").textContent = "⛔ No number!"
  }
})
