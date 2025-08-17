// Quotes array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Be yourself; everyone else is already taken.", category: "Motivation" }
];

// Display elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Show random quote
function showRandomQuote() {
  let filteredQuotes = getFilteredQuotes();
  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available for this category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" — ${quote.category}`;
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

// Add new quote
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();
  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    showRandomQuote();
    textInput.value = '';
    categoryInput.value = '';
    syncQuotesWithServer(); // ✅ بعد الإضافة يرفع للسيرفر
  } else {
    alert('Please enter both quote and category');
  }
}

// Populate category filter
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem('selectedCategory');
  if (savedFilter) {
    categoryFilter.value = savedFilter;
  }
}

// Get filtered quotes
function getFilteredQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem('selectedCategory', selected);
  if (selected === "all") return quotes;
  return quotes.filter(q => q.category === selected);
}

// Filter quotes dynamically
function filterQuotes() {
  showRandomQuote();
}

// Export quotes as JSON
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

// Import quotes from JSON
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert('Quotes imported successfully!');
      syncQuotesWithServer(); // ✅ بعد الاستيراد يعمل sync
    } catch (err) {
      alert('Invalid JSON file');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);

// Initial display
populateCategories();
if (sessionStorage.getItem('lastViewedQuote')) {
  const lastQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
  quoteDisplay.innerHTML = `"${lastQuote.text}" — ${lastQuote.category}`;
} else {
  showRandomQuote();
}


// ================= Task 3 Code =================

// Simulate server interaction (JSONPlaceholder)
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch quotes from server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();

    // نحاكي إن البيانات جايه كـ quotes
    const serverQuotes = data.slice(0, 5).map(item => ({
      text: item.title,
      category: "Server"
    }));

    resolveConflicts(serverQuotes);
  } catch (error) {
    console.error("Error fetching from server:", error);
  }
}

// Sync local quotes to server (simulation)
async function syncQuotesWithServer() {
  try {
    await fetch(SERVER_URL, {
      method: "POST",
      body: JSON.stringify(quotes),
      headers: { "Content-Type": "application/json" }
    });
    console.log("Quotes synced with server.");
  } catch (error) {
    console.error("Error syncing to server:", error);
  }
}

// Conflict resolution: server takes precedence
function resolveConflicts(serverQuotes) {
  let conflicts = [];

  serverQuotes.forEach(serverQuote => {
    const exists = quotes.some(
      localQuote => localQuote.text === serverQuote.text
    );
    if (!exists) {
      quotes.push(serverQuote);
      conflicts.push(serverQuote);
    }
  });

  if (conflicts.length > 0) {
    saveQuotes();
    populateCategories();
    notifyUser(`${conflicts.length} new quotes synced from server.`);
  }
}

// Simple notification system
function notifyUser(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.className = "notification";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// Periodic sync (every 20s)
setInterval(fetchQuotesFromServer, 20000);

// First fetch on load
fetchQuotesFromServer();
