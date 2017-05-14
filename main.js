// DIVs
const secondDiv = document.getElementById('second-div');
const playSelectionDiv = document.getElementById('play-selection-div');
const gameCommandsDiv = document.getElementById('game-commands-div');
const commandsDiv = document.getElementById('commands-div');
const scoreDiv = document.getElementById('score-div');

// BUTTONS
const playBtn = document.getElementById('play-button');
const readyBtn = document.getElementById('ready-button');
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const quitBtn = document.getElementById('quit');

// GAME VARIABLES
let gameIsActive = false;
let newPlayerChoice;
let newComputerChoice;

const gameCommands = [
	'rock',
  'paper',
  'scissors',
  'shoot!'
];

const gameChoices = [
	'rock',
  'paper',
  'scissors'
];

// EVENT LISTENERS

// wrapping in jQuery to use scrolling animation on play button click
$(document).ready(() => {
  playBtn.addEventListener('click', () => {
  	if(!gameIsActive) {
			secondDiv.style.display = 'block';
    }
		$('html, body').animate({scrollTop: $('#second-div').offset().top}, 'slow');
	});
  
	quitBtn.addEventListener('click', () => {
  	$('html, body').animate({scrollBottom: $('#second-div').offset().bottom}, 'slow');
    secondDiv.style.display = 'none';
  });  

});

// handle ready button click
readyBtn.addEventListener('click', () => {

	gameIsActive = true;
  readyBtn.style.display = 'none';

  // iterate through 'rock, paper, scissors, shoot' and flash them on the screen
  gameCommands.forEach(function(element, index) {
    setTimeout(() => {
      flashWords(element)
    }, 1000 * index);
  });

  playSelectionDiv.style.display = 'block';
  
});

// handle rock button click
rockBtn.addEventListener('click', () => {
	makeChoice(rockBtn);
  disableButtons([paperBtn, scissorsBtn]);
  makeComputerChoice()
	chooseWinner()
});

// handle paper button click
paperBtn.addEventListener('click', () => {
	makeChoice(paperBtn);
  disableButtons([rockBtn, scissorsBtn]);
  makeComputerChoice()
	chooseWinner()
});

// handle scissors button click
scissorsBtn.addEventListener('click', () => {
	makeChoice(scissorsBtn);
  disableButtons([rockBtn, paperBtn]);
  makeComputerChoice()
	chooseWinner()
});

quitBtn.addEventListener('click', () => {
	gameIsActive = false;
});

// FUNCTIONS

function makeComputerChoice() {
	let randomNumber = Math.floor(Math.random() * 3);
  newComputerChoice = gameChoices[randomNumber];
  console.log(newComputerChoice);
}

function flashWords(word) {
	commandsDiv.innerHTML = '';
	let h1 = document.createElement('h1');
  h1.innerHTML = word;
  h1.className = 'game-commands';
  commandsDiv.appendChild(h1);
}

function makeChoice(selectedBtn) {
	newPlayerChoice = selectedBtn.innerHTML;
  selectedBtn.style.backgroundColor = '#69f0ae';
  selectedBtn.style.color = '#6a1b9a';
}

function disableButtons(arrOfBtns) {
	arrOfBtns.forEach((btn) => {
  	btn.disabled = true;
  });
}

function chooseWinner() {
  console.log('computer choice:', newComputerChoice)
  console.log('player choice:', newPlayerChoice)
	if(newPlayerChoice === 'rock') {
  	if(newComputerChoice === 'rock') {
    	console.log('tie');
    } else if(newComputerChoice === 'paper') {
    	consoole.log('computer wins');
    } else if(newComputerChoice === 'scissors') {
    	console.log('you win');
    }
  } else if(newPlayerChoice === 'paper') {
  	if(newComputerChoice === 'rock') {
    	console.log('you win');
    } else if(newComputerChoice === 'scissors') {
    	console.log('computer wins');
    } else {
    	console.log('tie');
    }
  } else {
  	if(newComputerChoice === 'rock') {
    	console.log('computer wins');
    } else if(newComputerChoice === 'paper') {
    	console.log('you win')
    } else {
    	console.log('tie');
    }
  }
}
