let quotes = [];

// تحميل البيانات من Local Storage عند بداية الصفحة
function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
    renderQuotes();
}

// حفظ البيانات في Local Storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// عرض المقولات على الصفحة
function renderQuotes() {
    const container = document.getElementById("quotesContainer");
    container.innerHTML = "";
    quotes.forEach((quote, index) => {
        const p = document.createElement("p");
        p.textContent = quote;
        p.onclick = () => {
            sessionStorage.setItem("lastViewedQuote", quote);
            document.getElementById("lastViewedQuote").textContent = "Last Viewed: " + quote;
        };
        container.appendChild(p);
    });
}

// إنشاء فورم إضافة المقولة
function createAddQuoteForm() {
    const form = document.createElement("form");
    form.onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById("quoteInput");
        const newQuote = input.value.trim();
        if (newQuote) {
            quotes.push(newQuote);
            saveQuotes(); // حفظ مباشر في Local Storage
            renderQuotes();
            input.value = "";
        }
    };

    const input = document.createElement("input");
    input.type = "text";
    input.id = "quoteInput";
    input.placeholder = "Enter a new quote";

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Add Quote";

    form.appendChild(input);
    form.appendChild(button);
    document.body.insertBefore(form, document.getElementById("quotesContainer"));
}

// تصدير المقولات كملف JSON
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json";
    link.click();
    URL.revokeObjectURL(url);
}

// استيراد المقولات من JSON
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes(); // حفظ مباشر في Local Storage
                renderQuotes();
                alert('Quotes imported successfully!');
            } else {
                alert('Invalid JSON format');
            }
        } catch (error) {
            alert('Error reading JSON file');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// تحميل آخر مقولة من الـ Session Storage
function loadLastViewedQuote() {
    const lastQuote = sessionStorage.getItem("lastViewedQuote");
    if (lastQuote) {
        document.getElementById("lastViewedQuote").textContent = "Last Viewed: " + lastQuote;
    }
}

// عند تحميل الصفحة
window.onload = function() {
    createAddQuoteForm();
    loadQuotes();
    loadLastViewedQuote();
};
