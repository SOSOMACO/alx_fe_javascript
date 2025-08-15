let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" },
    { text: "If life were predictable it would cease to be life, and be without flavor.", category: "Life" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available. Please add one.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<strong>${quote.category}:</strong> "${quote.text}"`;
}

function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text === "" || category === "") {
        alert("Please enter both quote and category.");
        return;
    }

    quotes.push({ text, category });
    newQuoteText.value = "";
    newQuoteCategory.value = "";
    alert("Quote added successfully!");
}

newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
