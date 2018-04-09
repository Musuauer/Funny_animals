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
function won(matchedCards) {
    if (matchedCards.length === 16) {
        clearInterval(timer);
        toggleModal(moves,starArray);
}
}

function addMatchClass(card1, card2){
    card1.children[0].classList.add('paired');
    card2.children[0].classList.add('paired');
    card1.classList.add('match');
    card2.classList.add('match');
    

}

function removeAndHide(card1, card2){
    card1.classList.remove('open');
    card2.classList.remove('open');
    openCards = [];
}

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

function removeStar(starArray) {
	starArray.pop().remove();
}

function updateStars(starArray, moves){
    if (moves === 10 || moves === 20 || moves === 30) {
        removeStar(starArray);
    }
}
function addToOpenCardsArray(openCards, card){
    if (card.classList.contains('open') && openCards.length < 2) {
        openCards.push(card);
    }
}
function applyMovesToHTML(moves){
    if (moves === 1) {
        counter.innerHTML = moves + ' move';
    } else if (moves >= 2) {
        counter.innerHTML = moves + ' moves';
    }
}
function addMove(moves) {
    return moves + 1
}
function increaseCounter(event){
    if (openCards.length === 1) {
        moves = addMove(moves);
        applyMovesToHTML(moves);
        updateStars(starArray, moves);
    }
    

}
function flip(event) {
    const card = event.target;

   
    increaseCounter(event); 

    

    if (openCards.length >= 2) return;

    card.classList.add('open');
    addToOpenCardsArray(openCards, card);

    compareCards(openCards);
}

for (card of cards) {
    card.addEventListener('click', flip);

}

function restartGame() {
    location.reload();
}

