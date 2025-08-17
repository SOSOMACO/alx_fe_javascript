// === Task 0 ===

// Array of quotes
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do what you can, with what you have, where you are.", category: "Inspiration" }
];

// عرض اقتباس عشوائي
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <p>"${quotes[randomIndex].text}"</p>
    <small>- ${quotes[randomIndex].category}</small>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  displayRandomQuote();
});


// === Task 1 ===
/////////////////////////////////////////////
// إنشاء فورم لإضافة اقتباس جديد
function createAddQuoteForm() {
  const form = document.createElement("form");
  form.id = "addQuoteForm";

  form.innerHTML = `
    <input type="text" id="quoteText" placeholder="Enter quote" required />
    <input type="text" id="quoteCategory" placeholder="Enter category" required />
    <button type="submit">Add Quote</button>
  `;

  document.body.appendChild(form);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    addQuote();
  });
}

// إضافة اقتباس جديد
function addQuote() {
  const text = document.getElementById("quoteText").value;
  const category = document.getElementById("quoteCategory").value;

  if (text && category) {
    quotes.push({ text, category });
    alert("Quote added successfully!");
    displayRandomQuote();
  }
}

createAddQuoteForm();
/////////////////////////////////////////////
