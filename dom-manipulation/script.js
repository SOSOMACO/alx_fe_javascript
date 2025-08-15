let quotes = [
    { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
];

// Load quotes from localStorage
if (localStorage.getItem('quotes')) {
    quotes = JSON.parse(localStorage.getItem('quotes'));
}

// Show random quote
function showRandomQuote(list = quotes) {
    if (list.length === 0) return;
    const randomIndex = Math.floor(Math.random() * list.length);
    const quote = list[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" — ${quote.category}`;
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Add new quote
function addQuote() {
    const text = document.getElementById('newQuoteText').value.trim();
    const category = document.getElementById('newQuoteCategory').value.trim();
    if (!text || !category) return alert("Both fields are required");

    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    showRandomQuote();
}

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate categories in filter dropdown
function populateCategories() {
    const select = document.getElementById('categoryFilter');
    const categories = Array.from(new Set(quotes.map(q => q.category)));
    
    // Clear except "all"
    select.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });

    // Restore last selected category
    if (localStorage.getItem('lastCategory')) {
        select.value = localStorage.getItem('lastCategory');
    }
}

// Filter quotes by category
function filterQuotes() {
    const selected = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastCategory', selected);
    if (selected === 'all') {
        showRandomQuote();
    } else {
        const filtered = quotes.filter(q => q.category === selected);
        showRandomQuote(filtered);
    }
}

// Export quotes to JSON
document.getElementById('exportQuotes').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
});

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Initial setup
populateCategories();
showRandomQuote();

// New Quote button
document.getElementById('newQuote').addEventListener('click', () => showRandomQuote());
