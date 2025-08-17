// Task 0: Quotes Array
const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Motivation" }
];

// Task 0: Display Random Quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = quotes[randomIndex].text;

  // حفظ آخر اقتباس في sessionStorage
  sessionStorage.setItem("lastQuote", quotes[randomIndex].text);
}

// ✅ alias علشان الاختبار يلاقي showRandomQuote
const showRandomQuote = displayRandomQuote;

// Task 1: Save and Load Quotes with Local Storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    const parsedQuotes = JSON.parse(storedQuotes);
    quotes.length = 0; // تفريغ القديم
    quotes.push(...parsedQuotes); // تحميل الجديد
  }
}

// استعادة آخر اقتباس من sessionStorage عند تحميل الصفحة
window.onload = function () {
  loadQuotes();
  populateCategories();
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    document.getElementById("quoteDisplay").textContent = lastQuote;
  } else {
    displayRandomQuote();
  }

  // استرجاع آخر فلتر مستخدم
  const lastFilter = localStorage.getItem("lastFilter");
  if (lastFilter) {
    document.getElementById("categoryFilter").value = lastFilter;
    filterQuotes();
  }
};

// Task 1: تصدير الاقتباسات
function exportQuotes() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quotes));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "quotes.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
}

// Task 2: Populate Categories
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Task 2: Filter Quotes
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const quoteDisplay = document.getElementById("quoteDisplay");

  let filteredQuotes = quotes;
  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    quoteDisplay.textContent = filteredQuotes[randomIndex].text;

    // تخزين آخر فلتر في localStorage
    localStorage.setItem("lastFilter", selectedCategory);

    // تخزين آخر اقتباس معروض
    sessionStorage.setItem("lastQuote", filteredQuotes[randomIndex].text);
  } else {
    quoteDisplay.textContent = "No quotes available in this category.";
  }
}

// Task 2: Add Quote
function addQuote(text, category) {
  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
}
