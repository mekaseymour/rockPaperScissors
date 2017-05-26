// DIVs
const secondDiv = document.getElementById('second-div');
const playSelectionDiv = document.getElementById('play-selection-div');
const gameCommandsDiv = document.getElementById('game-commands-div');
const commandsDiv = document.getElementById('commands-div');
const scoreDiv = document.getElementById('score-div');
const imagesDiv = document.getElementById('images-div');
const endGameDiv = document.getElementById('end-of-game-div');

// BUTTONS
const playBtn = document.getElementById('play-button');
const readyBtn = document.getElementById('ready-button');
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const playAgainBtn = document.getElementById('play-again');
const quitBtn = document.getElementById('quit');

// GAME VARIABLES
let newPlayerChoice = '';
let newComputerChoice = '';

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

// create image elements
const rockImage = document.createElement('img');
rockImage.setAttribute('src', 'http://imageshack.com/a/img922/2549/fiGjnh.png');
rockImage.className = 'gameImages';

const paperImage = document.createElement('img');
paperImage.setAttribute('src', 'http://imageshack.com/a/img924/92/Prz2TU.png');
paperImage.className = 'gameImages';

const scissorsImage = document.createElement('img');
scissorsImage.setAttribute('src', 'http://imageshack.com/a/img923/2725/BqBABm.png');
scissorsImage.className = 'gameImages';

// EVENT LISTENERS

// wrapping in jQuery to use scrolling animation on play button click
$(document).ready(() => {
	// handle play button click
  playBtn.addEventListener('click', () => {
  	if(playBtn.innerHTML === 'new game') playBtn.innerHTML = 'play';
  	// change secondDiv display from none to block
		secondDiv.style.display = 'block';
    // scroll down to the second div
		$('html, body').animate({scrollTop: $('#second-div').offset().top}, 'slow');
	});

  // handle quit button click
	quitBtn.addEventListener('click', () => {
  	// scroll back to the top
  	$('html, body').animate({scrollBottom: $('#second-div').offset().bottom}, 'slow');
    secondDiv.style.display = 'none';
    playBtn.innerHTMl = 'new game';
  });
});

// handle play again button
playAgainBtn.addEventListener('click', () => {
    restartGame();
  });

// handle ready button click
readyBtn.addEventListener('click', () => {

  readyBtn.style.display = 'none';

  // iterate through 'rock, paper, scissors, shoot' and flash them on the screen
  gameCommands.forEach(function(element, index) {
    setTimeout(() => {
      flashWords(element)
    }, 1000 * index);

  });

});

// handle rock button click
rockBtn.addEventListener('click', () => {
	let playerChoice = rockBtn.innerHTML;
  let computerChoice = makeComputerChoice();
  let playerMoveImage = getMoveImage(playerChoice);
  let computerMoveImage = getMoveImage(computerChoice);

	restyleBtn(rockBtn);
  disableButtons([paperBtn, scissorsBtn]);

  // get result message: 'you win', 'computer wins', or 'tie'
  let results = chooseWinner(playerChoice, computerChoice);
	let resultsMessage = makeResultsMessage(results);

  // append images to DOM
  imagesDiv.appendChild(resultsMessage);
  imagesDiv.appendChild(playerMoveImage);
  imagesDiv.appendChild(computerMoveImage);
});

// handle paper button click
paperBtn.addEventListener('click', () => {
	let playerChoice = paperBtn.innerHTML;
  let computerChoice = makeComputerChoice();
  let playerMoveImage = getMoveImage(playerChoice);
  let computerMoveImage = getMoveImage(computerChoice);

  restyleBtn(paperBtn);
  disableButtons([rockBtn, scissorsBtn]);

	let results = chooseWinner(playerChoice, computerChoice);
	let resultsMessage = makeResultsMessage(results);

  // append images to DOM
  imagesDiv.appendChild(resultsMessage);
  imagesDiv.appendChild(playerMoveImage);
  imagesDiv.appendChild(computerMoveImage);

});

// handle scissors button click
scissorsBtn.addEventListener('click', () => {
	let playerChoice = scissorsBtn.innerHTML;
  let computerChoice = makeComputerChoice();
  let playerMoveImage = getMoveImage(playerChoice);
  let computerMoveImage = getMoveImage(computerChoice);

  restyleBtn(scissorsBtn);
  disableButtons([rockBtn, paperBtn]);

  let results = chooseWinner(playerChoice, computerChoice);
	let resultsMessage = makeResultsMessage(results);

  // append images to DOM
  imagesDiv.appendChild(resultsMessage);
  imagesDiv.appendChild(playerMoveImage);
  imagesDiv.appendChild(computerMoveImage);
});

quitBtn.addEventListener('click', () => {
  playBtn.innerHTML = 'new game';
  restartGame();
});

// FUNCTIONS

function flashWords(word) {
	commandsDiv.innerHTML = '';
	let h1 = document.createElement('h1');
  h1.innerHTML = word;
  h1.className = 'game-commands';
  commandsDiv.appendChild(h1);

  if(word === 'shoot!') {
  	playSelectionDiv.style.display = 'block';
    endGameDiv.style.display = 'block';
  }

}

function restyleBtn(selectedBtn) {
  selectedBtn.style.backgroundColor = '#69f0ae';
  selectedBtn.style.color = '#6a1b9a';
}

function disableButtons(arrOfBtns) {
	arrOfBtns.forEach((btn) => {
  	btn.disabled = true;
  });
}

// display image corresponding with move choice
function getMoveImage(move) {
	let moveImage;
	if(move === 'rock') moveImage = rockImage;
  else if (move === 'paper') moveImage = paperImage;
  else moveImage = scissorsImage;
  return moveImage;
}

// makes results message and returns it's DOM element
function makeResultsMessage(results) {
  let h2 = document.createElement('h2');
  h2.className = 'game-commands';
  h2.innerHTML = results;
  return h2;
}

// clears page, player choice, and computer choice
function restartGame() {
	newPlayerChoice = '';
	newComputerChoice = '';
	commandsDiv.innerHTML = '';
  imagesDiv.innerHTML = '';
  playSelectionDiv.style.display = 'none';
  endGameDiv.style.display = 'none';
  readyBtn.style.display = 'inline';
  [rockBtn, paperBtn, scissorsBtn].forEach((btn) => {
  	btn.disabled = false;
    btn.style.backgroundColor = '#6a1b9a';
  	btn.style.color = '#69f0ae';
  });
}

// logic functions

function makeComputerChoice() {
	let randomNumber = Math.floor(Math.random() * 3);
  newComputerChoice = gameChoices[randomNumber];
  return newComputerChoice;
}

// function that takes in the player's choice and the computer's choice and determines a winner
function chooseWinner(newPlayerChoice, newComputerChoice) {
	let results = '';
	if(newPlayerChoice === 'rock') {
  	if(newComputerChoice === 'rock') {
    	results = 'tie';
    	console.log('tie');
    } else if(newComputerChoice === 'paper') {
    	results = 'computer wins';
    	console.log('computer wins');
    } else if(newComputerChoice === 'scissors') {
    	results = 'you win';
    	console.log('you win');
    }
  } else if(newPlayerChoice === 'paper') {
  	if(newComputerChoice === 'rock') {
    	results = 'you win';
    	console.log('you win');
    } else if(newComputerChoice === 'scissors') {
    	results = 'computer wins';
    	console.log('computer wins');
    } else {
    	results = 'tie';
    	console.log('tie');
    }
  } else {
  	if(newComputerChoice === 'rock') {
    	results = 'computer wins';
    	console.log('computer wins');
    } else if(newComputerChoice === 'paper') {
    	results = 'you win';
    	console.log('you win')
    } else {
    	results = 'you win';
    	console.log('tie');
    }
  }

  return results;
}
