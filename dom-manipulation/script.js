// ===== Quotes Array & Storage =====
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Be yourself; everyone else is already taken.", category: "Motivation" }
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const notification = document.getElementById('notification');

// ===== Utility Functions =====
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showNotification(message) {
  notification.innerText = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

// ===== Random Quote Display =====
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" — ${quote.category}`;
}

// ===== Add Quote =====
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    showRandomQuote();
    textInput.value = '';
    categoryInput.value = '';
  } else {
    alert('Please enter both quote and category');
  }
}

// ===== Export & Import JSON =====
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    showNotification("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// ===== Simulated Server Interaction =====
async function fetchServerQuotes() {
  // بدل JSONPlaceholder، هنا بنستخدم API وهمي (mock)
  // نقدر نستبدل الرابط ده بأي API حقيقي
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=2");
    const data = await response.json();

    // نحول الداتا لشكل Quotes
    return data.map(item => ({
      text: item.title,
      category: "Server"
    }));
  } catch (error) {
    console.error("Error fetching server data:", error);
    return [];
  }
}

// ===== Sync Logic =====
async function syncWithServer() {
  const serverQuotes = await fetchServerQuotes();

  if (serverQuotes.length > 0) {
    // Conflict Resolution: السيرفر له الأولوية
    quotes = [...serverQuotes, ...quotes];
    saveQuotes();
    showNotification("Quotes synced with server (server data has priority).");
    showRandomQuote();
  }
}

function manualSync() {
  syncWithServer();
}

// ===== Periodic Sync Every 15s =====
setInterval(syncWithServer, 15000);

// ===== Initial Display =====
newQuoteBtn.addEventListener('click', showRandomQuote);
showRandomQuote();
