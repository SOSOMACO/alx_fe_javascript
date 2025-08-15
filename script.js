function createAddQuoteForm() {
    // إنشاء عناصر الفورم
    const form = document.createElement("form");
    form.id = "add-quote-form";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter a new quote";
    input.id = "quote-input";
    input.required = true;

    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.placeholder = "Author name";
    authorInput.id = "author-input";
    authorInput.required = true;

    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.textContent = "Add Quote";

    // إضافة العناصر للفورم
    form.appendChild(input);
    form.appendChild(authorInput);
    form.appendChild(addButton);

    // حدث الإرسال
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const quoteText = input.value.trim();
        const authorName = authorInput.value.trim();

        if (quoteText && authorName) {
            addQuote(quoteText, authorName); // استدعاء دالة إضافة الكوت
            input.value = "";
            authorInput.value = "";
        }
    });

    // إضافة الفورم للصفحة
    document.body.appendChild(form);
}

// مثال على دالة addQuote لو مش موجودة
function addQuote(quote, author) {
    const quoteContainer = document.getElementById("quote-container");
    const quoteElement = document.createElement("p");
    quoteElement.textContent = `"${quote}" — ${author}`;
    quoteContainer.appendChild(quoteElement);
}
