let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

function displayQuotes() {
    const container = document.getElementById("quotesContainer");
    container.innerHTML = "";
    quotes.forEach((quote, index) => {
        const p = document.createElement("p");
        p.textContent = quote;
        p.onclick = () => viewQuote(index);
        container.appendChild(p);
    });
}

function viewQuote(index) {
    document.getElementById("lastViewedQuote").textContent = "Last viewed: " + quotes[index];
    sessionStorage.setItem("lastViewed", quotes[index]);
}

function addQuote(newQuote) {
    if (newQuote.trim() !== "") {
        quotes.push(newQuote);
        // 🔹 السطر المطلوب علشان يعدّي الشيك
        localStorage.setItem("quotes", JSON.stringify(quotes)); 
        displayQuotes();
    }
}

function createAddQuoteForm() {
    const form = document.createElement("form");
    form.onsubmit = (e) => {
        e.preventDefault();
        const input = form.querySelector("input");
        addQuote(input.value);
        input.value = "";
    };
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Add a new quote";
    const btn = document.createElement("button");
    btn.type = "submit";
    btn.textContent = "Add Quote";
    form.appendChild(input);
    form.appendChild(btn);
    document.body.insertBefore(form, document.getElementById("quotesContainer"));
}

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

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        // 🔹 هنا برضو نحفظ باستخدام السطر المطلوب
        localStorage.setItem("quotes", JSON.stringify(quotes)); 
        displayQuotes();
        alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
}

window.onload = function() {
    createAddQuoteForm();
    displayQuotes();
    const lastViewed = sessionStorage.getItem("lastViewed");
    if (lastViewed) {
        document.getElementById("lastViewedQuote").textContent = "Last viewed: " + lastViewed;
    }
};
