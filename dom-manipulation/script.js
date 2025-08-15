let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
    { text: "You learn more from failure than from success.", category: "Learning" }
];

// ---------------- Task 1: Web Storage & JSON Handling -----------------

// حفظ الاقتباسات في Local Storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// تحميل الاقتباسات من Local Storage عند بداية التشغيل
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// استدعاء التحميل مباشرة عند فتح الصفحة
loadQuotes();

// دالة استيراد الاقتباسات من ملف JSON
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // حفظ بعد الاستيراد
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// دالة تصدير الاقتباسات إلى ملف JSON
function exportToJsonFile() {
    const jsonString = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// ---------------- Task 0: DOM Manipulation -----------------

// عرض اقتباس عشوائي
function displayRandomQuote() {
    if (quotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - ${quote.category}`;
}

// إضافة اقتباس جديد
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        quotes.push({ text, category });
        saveQuotes(); // حفظ بعد إضافة الاقتباس
        displayRandomQuote(); // تحديث العرض مباشرة
        textInput.value = '';
        categoryInput.value = '';
    } else {
        alert('Please enter both quote and category.');
    }
}

// زر عرض اقتباس جديد
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// عرض أول اقتباس عند فتح الصفحة
displayRandomQuote();
