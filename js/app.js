/*
 * Create a list that holds all of your cards
 */


const allCards = document.querySelectorAll('.card');
const oldCards = [...allCards].map(i => i.outerHTML);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
 
}
let newCards = shuffle(oldCards);

let deck = document.querySelector('.deck');
deck.innerHTML = newCards.join('');


const cards = deck.children;

let openCards = [];

function lockCards(){
    openCards[0].classList.add('match');
    openCards[0].classList.remove('open','show');
    openCards[1].classList.add('match');
    openCards[1].classList.remove('open','show');
    openCards = [];
}

function removeAndHide(){
    openCards[0].classList.remove('open','show');
    openCards[1].classList.remove('open','show');
    openCards = [];

}

function flipped (justFlipped){
    if (openCards.length < 2) openCards.push(justFlipped);
    if (openCards.length === 2){
        if (openCards[0].innerHTML === openCards[1].innerHTML){
            lockCards();
        }
        else {
            setTimeout(removeAndHide,1000);
            
        }
    }
}

function flip(){
    this.classList.add('open','show');
    flipped(this);
}

for (card of cards){
    card.addEventListener('click', flip);
}







/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
