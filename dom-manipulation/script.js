// ----------------------
// Task 0: Base Functionality
// ----------------------
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Perseverance" }
];

// دالة لعرض اقتباس عشوائي
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = quotes[randomIndex].text;

  // تخزين آخر اقتباس معروض في sessionStorage
  sessionStorage.setItem("lastQuote", quotes[randomIndex].text);
}

// ----------------------
// Task 1: Web Storage (Save & Load Quotes)
// ----------------------
function saveQuotesToLocalStorage() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotesFromLocalStorage() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    const parsed = JSON.parse(storedQuotes);
    quotes.length = 0; // إفراغ المصفوفة الأصلية
    quotes.push(...parsed);
  }
}

function exportQuotes() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quotes));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "quotes.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// ربط زر التصدير
document.getElementById("exportBtn").addEventListener("click", exportQuotes);

// تحميل الاقتباسات عند بداية الصفحة
loadQuotesFromLocalStorage();

// ----------------------
// Task 2: Filtering System
// ----------------------
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // استرجاع آخر فلتر محفوظ
  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    categoryFilter.value = savedFilter;
    filterQuotes();
  }
}

function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  const filtered = selectedCategory === "all" 
    ? quotes 
    : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length > 0) {
    const randomIndex = Math.floor(Math.random() * filtered.length);
    quoteDisplay.textContent = filtered[randomIndex].text;
  } else {
    quoteDisplay.textContent = "No quotes available in this category.";
  }
}

// تحديث التصنيفات في حالة إضافة اقتباس جديد (لو هيتضاف بعدين)
function updateCategories(newCategory) {
  const categoryFilter = document.getElementById("categoryFilter");
  if (![...categoryFilter.options].some(opt => opt.value === newCategory)) {
    const option = document.createElement("option");
    option.value = newCategory;
    option.textContent = newCategory;
    categoryFilter.appendChild(option);
  }
}

// ----------------------
// Initialization
// ----------------------
window.onload = function() {
  loadQuotesFromLocalStorage();
  populateCategories();

  // عرض آخر اقتباس محفوظ في sessionStorage
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    document.getElementById("quoteDisplay").textContent = lastQuote;
  } else {
    displayRandomQuote();
  }
};
