function createAddQuote() {
    const quotes = [
        "The best way to predict the future is to invent it.",
        "Life is 10% what happens to us and 90% how we react to it.",
        "Do something today that your future self will thank you for.",
        "Your limitation—it’s only your imagination.",
        "Push yourself, because no one else is going to do it for you."
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.textContent = quotes[randomIndex];
}

document.getElementById("generateBtn").addEventListener("click", createAddQuote);
