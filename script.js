// Array to store quotes
let quotes = [];

// Load quotes from local storage on page load
window.onload = function () {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
    displayQuotes();

    // Load last viewed quote from session storage (optional)
    const lastQuote = sessionStorage.getItem("lastQuote");
    if (lastQuote) {
        document.getElementById("lastViewedQuote").textContent = `Last viewed quote: "${lastQuote}"`;
    }
};

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to create add quote form (needed for previous task)
function createAddQuoteForm() {
    const form = document.createElement("form");
    form.id = "addQuoteForm";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter a new quote";
    input.required = true;

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Add Quote";

    form.appendChild(input);
    form.appendChild(button);

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        addQuote(input.value);
        input.value = "";
    });

    document.body.appendChild(form);
}

// Function to add a new quote
function addQuote(quote) {
    quotes.push(quote);
    saveQuotes();
    displayQuotes();
}

// Function to display quotes on the page
function displayQuotes() {
    const container = document.getElementById("quotesContainer");
    container.innerHTML = "";
    quotes.forEach((quote, index) => {
        const p = document.createElement("p");
        p.textContent = quote;
        p.addEventListener("click", function () {
            sessionStorage.setItem("lastQuote", quote);
            document.getElementById("lastViewedQuote").textContent = `Last viewed quote: "${quote}"`;
        });
        container.appendChild(p);
    });
}

// Export quotes to JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                displayQuotes();
                alert("Quotes imported successfully!");
            } else {
                alert("Invalid JSON format!");
            }
        } catch (err) {
            alert("Error reading file!");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Create form on load
createAddQuoteForm();
