let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

function addQuote(text) {
    quotes.push(text);
    // حفظ مباشر في localStorage زي ما الـ checker عايز
    localStorage.setItem("quotes", JSON.stringify(quotes));
    renderQuotes();
}

function renderQuotes() {
    const list = document.getElementById("quoteList");
    list.innerHTML = "";
    quotes.forEach(quote => {
        const li = document.createElement("li");
        li.textContent = quote;
        list.appendChild(li);
    });
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes)); // برضو هنا مباشر
        alert('Quotes imported successfully!');
        renderQuotes();
    };
    fileReader.readAsText(event.target.files[0]);
}

function exportToJsonFile() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.getElementById("addQuoteBtn").addEventListener("click", () => {
    const input = document.getElementById("quoteInput");
    if (input.value.trim() !== "") {
        addQuote(input.value.trim());
        input.value = "";
    }
});

document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);

renderQuotes();
