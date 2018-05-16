//@ts-check

// get all cards  in a list
const allCards = document.querySelectorAll('.card');
const oldCards = [...allCards].map(i => i.outerHTML);
//shuffle cards
let newCards = shuffle(oldCards);
//add shuffled cards to HTML
let deck = document.querySelector('.deck');
deck.innerHTML = newCards.join('');

//--------------------general variables
const cards = deck.children;
let openCards = [];
let matchedCards = [];



//---------------------------modal
const congrats = document.querySelector('.popup');
//---restart-from-modal
const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', restartGame);
//---stars, moves, timer
const starsPopup = document.getElementById('stars-result');
const movesPopup = document.getElementById('moves-result');
const minutesPopup = document.getElementById('minutes-result');
const secondsPopup = document.getElementById('seconds-result');

//------------------------score-panel
//---stars
const stars = document.querySelector('.stars').children;
let starArray = [...stars];
//---restart
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartGame);
//---moves
let moves = 0;
const counter = document.querySelector('.moves');
//---timer
let sec = 0;
let timer = 0;
let seconds = document.getElementById('seconds');
let minutes = document.getElementById('minutes');




// --------------Shuffle function from http://stackoverflow.com/a/2450976

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
// -------------------------------------------MODAL-------------------------------------------//
// Function to feed modal with results

function toggleModal(moves, starArray) {
	if (minutes.innerHTML === '00') return;

	minutesPopup.innerHTML = minutes.innerHTML;
	secondsPopup.innerHTML = seconds.innerHTML;
	movesPopup.innerHTML = moves;

	if (starArray.length === 1) {
		starsPopup.innerHTML = starArray.length + ' Star';
	} else {
		starsPopup.innerHTML = starArray.length + ' Stars';
	}
	congrats.classList.toggle('show-popup');
}



// -------------------------------------------STARS-------------------------------------------//
// to remove a star from the score panel

function removeStar(starArray) {
	starArray.pop().remove();
}

// condition to remove stars based on moves numbers

function updateStars(starArray, moves){
	if (moves === 10 || moves === 20 || moves === 30) {
		removeStar(starArray);
	}
}

// -------------------------------------------MOVES--------------------------------------------//
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
	return moves + 1;
}

// condition to increase moves counter and call to remove stars
function increaseCounter(event){
	if (openCards.length === 1) {
		moves = addMove(moves);
		applyMovesToHTML(moves);
		updateStars(starArray, moves);
	}

}

// -------------------------------------------TIMER---------------------------------------------//
// Timer function adapted from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript

function pad (val) { 
	return val > 9 ? val : '0' + val; 
}
function timerFunction(timer){
	seconds.innerHTML = pad(++sec % 60);
	minutes.innerHTML = pad(parseInt(sec / 60, 10));
}

// -------------------------------------------MATCHES-------------------------------------------//
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

// add pairs to matched array and call function to add classes

function addToMatched(matchedCards, card1,card2) {
	matchedCards.push(card1);
	matchedCards.push(card2);
	addMatchClass(card1, card2);

	won(matchedCards);
}

// remove and hide cards

function removeAndHide(card1, card2){
	card1.classList.remove('open');
	card2.classList.remove('open');
	openCards = [];
}

// -------------------------------------------COMPARE CARDS-------------------------------------------//

function compareCards(openCards) {

	const card1 = openCards[0];
	const card2 = openCards[1];

	// when they match
	if (openCards.length === 2) {
		if (card1.innerHTML === card2.innerHTML) {
			addToMatched(matchedCards, card1, card2);
			removeAndHide(card1, card2);

		}
		// when they don't match
		else {
			setTimeout(
				() => removeAndHide(card1, card2),
				1200
			);
		}

	}
	//start timer
	if (moves === 0 && openCards.length === 1) {
		timer = setInterval(
			() => timerFunction(timer),
			1000
		);
	}

}
// -------------------------------------------CLICK AND OPEN--------------------------------------//
// add opened cards to a cards array

function addToOpenCardsArray(openCards, card){
	if (card.classList.contains('open') && openCards.length < 2) {
		openCards.push(card);
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

// -------------------------------------------RESTART--------------------------------------//

function restartGame() {
	location.reload();
}

