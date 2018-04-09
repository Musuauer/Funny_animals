const allCards = document.querySelectorAll('.card');
const oldCards = [...allCards].map(i => i.outerHTML);

let newCards = shuffle(oldCards);

let deck = document.querySelector('.deck');
deck.innerHTML = newCards.join('');

const cards = deck.children;

let openCards = [];

let matchedCards = [];

const congrats = document.querySelector('.popup');

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', restartGame);

const starsPopup = document.getElementById('stars-result');
const movesPopup = document.getElementById('moves-result');
const minutesPopup = document.getElementById('minutes-result');
const secondsPopup = document.getElementById('seconds-result');

const stars = document.querySelector('.stars').children;
let starArray = [...stars];

const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartGame);

let moves = 0;
const counter = document.querySelector('.moves');

let sec = 0;
let seconds = document.getElementById('seconds');
let minutes = document.getElementById('minutes');

let timer = 0;







// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}

// Function to feed modal with results

function toggleModal(moves, starArray) {
    movesPopup.innerHTML = moves;

    if (minutes.innerHTML != 00 && minutes.innerHTML === 1){
        minutesPopup.innerHTML = minutes.innerHTML + ' minute and ';
    }
    else if (minutes.innerHTML != 00 && minutes.innerHTML > 1){
            minutesPopup.innerHTML = minutes.innerHTML + ' minutes and ';
        }

    secondsPopup.innerHTML = seconds.innerHTML;

    if (starArray.length === 1) {
        starsPopup.innerHTML = starArray.length + ' Star';
    } else {
        starsPopup.innerHTML = starArray.length + ' Stars';
    }
    congrats.classList.toggle('show-popup');
}

// If all the cards are matched, call the modal
function won(matchedCards) {
    if (matchedCards.length === 16) {
        clearInterval(timer);
        toggleModal(moves,starArray);
}
}

// add classes to matched cards
function addMatchClass(card1, card2){
    card1.children[0].classList.add('paired');
    card2.children[0].classList.add('paired');
    card1.classList.add('match');
    card2.classList.add('match');

}

// remove and hide cards

function removeAndHide(card1, card2){
    card1.classList.remove('open');
    card2.classList.remove('open');
    openCards = [];
}

// add pairs to matched array and call function to add classes

function addToMatched(matchedCards, card1,card2) {
    matchedCards.push(card1);
    matchedCards.push(card2);
    addMatchClass(card1, card2);

    won(matchedCards);
}

 // Timer function adapted from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript

//  function stopTimer(timer) {
//     clearInterval(timer);
//   }

function pad (val) { 
    return val > 9 ? val : "0" + val; 
}
 function timerFunction(timer){
    seconds.innerHTML = pad(++sec % 60);
    minutes.innerHTML = pad(parseInt(sec / 60, 10));
}

// Function to compare opened cards

function compareCards(openCards) {

    const card1 = openCards[0];
    const card2 = openCards[1];

    if (openCards.length === 2){
        if(card1.innerHTML === card2.innerHTML){
            addToMatched(matchedCards, card1, card2);
            removeAndHide(card1, card2);

        }

        else {
            setTimeout(
                () => removeAndHide(card1, card2),
                1200
            );
        }

    }
    if (moves === 0 && openCards.length === 1) {
        timer = setInterval(
            () => timerFunction(timer),
            1000
        );
     }

}

// to remove a star from the score panel

function removeStar(starArray) {
	starArray.pop().remove();
}

// condition to rome stars based on moves numbers

function updateStars(starArray, moves){
    if (moves === 10 || moves === 20 || moves === 30) {
        removeStar(starArray);
    }
}

// add opened cards to a cards array

function addToOpenCardsArray(openCards, card){
    if (card.classList.contains('open') && openCards.length < 2) {
        openCards.push(card);
    }
}

// update the score panel with the moves, where 2 clicks is one move

function applyMovesToHTML(moves){
    if (moves === 1) {
        counter.innerHTML = moves + ' move';
    } else if (moves >= 2) {
        counter.innerHTML = moves + ' moves';
    }
}

// function to increase moves by 1
function addMove(moves) {
    return moves + 1
}

// condition to increase moves counter and call to remove stars
function increaseCounter(event){
    if (openCards.length === 1) {
        moves = addMove(moves);
        applyMovesToHTML(moves);
        updateStars(starArray, moves);
    }

}

// function called when a click on a card happens: increase the moves counter, change class of opened cards and call compare cards function

function flip(event) {
    const card = event.target;

    increaseCounter(event); 

    if (openCards.length >= 2) return;

    card.classList.add('open');
    addToOpenCardsArray(openCards, card);

    compareCards(openCards);
}

// loop to use each card from the cards array and then add event listener of a click to each one, calling the flip function when activated

for (card of cards) {
    card.addEventListener('click', flip);

}

// to restart the game, refresh the entire page

function restartGame() {
    location.reload();
}

