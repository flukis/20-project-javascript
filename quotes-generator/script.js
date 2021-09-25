// Get quote container
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const tweetBtn = document.getElementById('tweet');
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader')

// Get Quote From API
async function localQuotes() {
    loading()
    const url = 'https://type.fit/api/quotes';
    try {
        const res = await fetch(url);
        const quotes = await res.json();
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        // Check author field if it's blank
        if (!quote.author) authorText.textContent = "Unknown";
        else authorText.textContent = quote.author;
        
        // Check length of  quote text
        if (quote.text.lengt > 120) quoteText.classList.add('long-quote');
        else quoteText.classList.remove('long-quote');
        quoteText.textContent = quote.text;
        complete()
    } catch (e) {
        // Catch error here
    }
}

// Loader function SHOW
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Loader function HIDE
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Tweet a quote fucntion
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listener
newQuoteBtn.addEventListener('click', localQuotes);
tweetBtn.addEventListener('click', tweetQuote)

localQuotes()