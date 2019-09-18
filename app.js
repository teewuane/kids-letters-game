var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "1234567890";
var letters = alpha + numbers;

function chooseRandomLetter() {
	return letters.charAt(Math.floor(Math.random() * letters.length));
}

var score = 0;
var activeLetter = "A";

function displayNewLetter() {
	var newLetter = chooseRandomLetter();

	activeLetter = newLetter;
	var newLetterDisplay = $("<div/>", {
		text: newLetter,
		class: "new-letter-display"
	});

	var container = $(".container").html(newLetterDisplay);
}

function init() {
	hideTryAgain();
	hideFireworks();
	displayNewLetter();
	updateScore();
}

function convertCharCodeToLetter(charCode) {
	// charCode needs to equal 
	var letter = String.fromCharCode(charCode);
	var upperLetter = letter.toUpperCase();
	var lowerLetter = letter.toLowerCase();

	var upperCode = upperLetter.charCodeAt(0);
	var lowerCode = lowerLetter.charCodeAt(0);

	return {
		letter: letter,
		upperLetter: upperLetter,
		lowerLetter: lowerLetter,
		upperCode: upperCode,
		lowerCode: lowerCode
	}
}

function incrementScore() {
	score += 1;
	updateScore();
}

function updateScore() {
	$('.score').text(score);
}

function hideFireworks() {
	$('.pyro').hide();
}
function showFireworks() {
	$('.pyro').show();

	window.setTimeout(function(){
		hideFireworks();
	}, 1000);
}

function immediateHideTryAgain() {
	$('.try-again').hide();
}

function congratulate() {
	showFireworks();
	incrementScore();
	displayNewLetter();
	immediateHideTryAgain();
}

function hideTryAgain() {
	$('.try-again').fadeOut();
}

function tryAgain() {
	$('.try-again').show();

	window.setTimeout(function(){
		hideTryAgain();
	}, 2000);
}


$(document).keypress(function(e){
	var letterObj = convertCharCodeToLetter(e.charCode);
	if (activeLetter == letterObj.lowerLetter || activeLetter == letterObj.upperLetter) {
		congratulate();
	} else {
		tryAgain();
	}
});

$(document).ready(function() {
	init();
});
