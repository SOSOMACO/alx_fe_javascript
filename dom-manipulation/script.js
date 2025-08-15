// Quotes array
let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
    { text: "You learn more from failure than from success.", category: "Life" }
];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');

// Show random quote
function displayRandomQuote(list = quotes) {
    if (list.length === 0) {
        quoteDisplay.innerHTML = "No quotes available for this category.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * list.length);
    quoteDisplay.innerHTML = `"${list[randomIndex].text}" - ${list[randomIndex].category}`;

    // Save last viewed quote in sessionStorage
    sessionStorage.setItem('lastQuote', JSON.stringify(list[randomIndex]));
}

// Add new quote
function addQuote() {
    const text = document.getElementById('newQuoteText').value;
    const category = document.getElementById('newQuoteCategory').value;

    if (!text || !category) return alert("Both fields are required.");

    const newQuote = { text, category };
    quotes.push(newQuote);

    saveQuotes(); // Save to localStorage
    populateCategories(); // Update category filter
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}

// Populate category dropdown
function populateCategories() {
    const filter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(q => q.category))];

    // Remove all except 'All Categories'
    filter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filter.appendChild(option);
    });

    // Restore last selected category
    const lastCategory = localStorage.getItem('lastCategory') || 'all';
    filter.value = lastCategory;
    filterQuotes();
}

// Filter quotes based on category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastCategory', selectedCategory);

    let filteredQuotes = quotes;
    if (selectedCategory !== 'all') {
        filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }

    displayRandomQuote(filteredQuotes);
}

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from localStorage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Export quotes as JSON file
function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener for Show New Quote button
document.getElementById('newQuote').addEventListener('click', () => displayRandomQuote());

// Initialize page
window.onload = function() {
    loadQuotes();
    populateCategories();

    // Show last viewed quote if available
    const lastQuote = sessionStorage.getItem('lastQuote');
    if (lastQuote) {
        quoteDisplay.innerHTML = `"${JSON.parse(lastQuote).text}" - ${JSON.parse(lastQuote).category}`;
    } else {
        displayRandomQuote();
    }
};
