// Get the Dom Elements
const quoteContainer = document.querySelector("#quote-container");
const text = document.querySelector("#quote");
const author = document.querySelector("#quote-author");
const twitterBtn = document.querySelector('#twitter');
const newQuote = document.querySelector("#new-quote");
const loader = document.querySelector('#loader');

const showLoader = ()=>{
    loader.hidden = false;
    // if we remove the next line it will appear the card of the  quote without the quote
    quoteContainer.hidden = true;
}

const hideLoading = ()=>{
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote Async From forismatic.com
const getQuote = async () => {
    // start loading before anythong is loaded
    showLoader();
    const proxy = "http://cors-anywhere.herokuapp.com/"
    const URLapi = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxy + URLapi);
        const data = await response.json();

        // if Author is blank, add 'Unknown'
        if(data.quoteAuthor === "") {
            author.textContent = "Unknown"; 
        } else {
            author.textContent = data.quoteAuthor;
        }

        // reduce size for long quotes
        if(data.quoteText.length > 120) {
            text.classList.add('long-quote');
            author.classList.add('bigger-author');
        } else {
            text.classList.remove('long-quote');
        }
        text.textContent = data.quoteText;
        // hide loader and show quote
        hideLoading();
    } catch (error) {
        getQuote();
        // console.log(error);
    }
}

// The tweet functionality
const tweetMe = () => {
    const theQuote = text.textContent;
    const theAuthor = author.textContent;
    const tweet = `https://twitter.com/intent/tweet/?text=${theQuote} - ${theAuthor}`;
    window.open(tweet, '_blank');
}

// trigger the tweetme function
newQuote.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetMe);

// On Load
getQuote();