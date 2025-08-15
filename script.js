// مصفوفة لحفظ الاقتباسات
const quotes = [
    "The best way to get started is to quit talking and begin doing.",
    "Don't let yesterday take up too much of today.",
    "It's not whether you get knocked down, it's whether you get up."
];

// دالة لعرض اقتباس عشوائي
function displayQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex];
}

// دالة لإضافة اقتباس جديد
function addQuote(quote) {
    if (quote.trim() !== "") {
        quotes.push(quote.trim());
    }
}

// دالة لإنشاء فورم إضافة اقتباس
function createAddQuoteForm() {
    const form = document.createElement("form");
    const input = document.createElement("input");
    const button = document.createElement("button");

    input.type = "text";
    input.placeholder = "Enter a new quote";
    button.textContent = "Add Quote";

    form.appendChild(input);
    form.appendChild(button);

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        addQuote(input.value);
        input.value = "";
    });

    document.body.appendChild(form);
}

// تشغيل عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    createAddQuoteForm();
    displayQuote();
});
