// DIVs
const secondDiv = document.getElementById('second-div');
const playSelectionDiv = document.getElementById('play-selection-div');

// BUTTONS
const playBtn = document.getElementById('play-button');
const readyBtn = document.getElementById('ready-button'); 

const gameCommands = [
	'rock',
  'paper',
  'scissors',
  'shoot!'
]

// EVENT LISTENERS

$(document).ready(function() {
  playBtn.addEventListener('click', () => {
  	secondDiv.style.display = 'block';
		$('html, body').animate({scrollTop: $('#second-div').offset().top}, 'slow');
	});
});

readyBtn.addEventListener('click', () => {
	playBtn.innerHTML = 'new game';
	playSelectionDiv.style.display = 'none';
});