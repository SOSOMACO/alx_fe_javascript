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
    populateCategories(); // ✅ تحديث الفلتر بالكاتيجوري الجديدة
    showRandomQuote();
    textInput.value = '';
    categoryInput.value = '';
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

  // ✅ استرجاع الفلتر المختار من localStorage
  const savedFilter = localStorage.getItem('selectedCategory');
  if (savedFilter) {
    categoryFilter.value = savedFilter;
  }
}

// Get filtered quotes
function getFilteredQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem('selectedCategory', selected); // ✅ حفظ الفلتر
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
      populateCategories(); // ✅ تحديث بعد الاستيراد
      alert('Quotes imported successfully!');
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
