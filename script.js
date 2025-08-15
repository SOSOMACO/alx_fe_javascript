function createAddQuoteForm() {
    // إنشاء عناصر الفورم
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter your quote";
    input.required = true;

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Add Quote";

    form.appendChild(input);
    form.appendChild(button);
    document.body.appendChild(form);

    // مصفوفة تخزين الاقتباسات
    const quotes = [
        "The best way to predict the future is to invent it.",
        "Life is 10% what happens to us and 90% how we react to it.",
        "Do something today that your future self will thank you for."
    ];

    // عرض اقتباس عشوائي
    const quoteDisplay = document.createElement("div");
    quoteDisplay.id = "quoteDisplay";
    quoteDisplay.style.marginTop = "20px";
    quoteDisplay.style.fontWeight = "bold";
    document.body.appendChild(quoteDisplay);

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = quotes[randomIndex];
    }

    // عند إرسال الفورم
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const newQuote = input.value.trim();
        if (newQuote) {
            quotes.push(newQuote);
            input.value = "";
            showRandomQuote();
        }
    });

    // عرض أول اقتباس عند التحميل
    showRandomQuote();
}

/
