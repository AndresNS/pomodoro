"use strict";

const timer = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const minInput = document.getElementById("min");
const secInput = document.getElementById("sec");

let intervalID = 0;
let initialMin = minInput.value;
let initialSec = secInput.value;
timer.textContent = `${formatNumber(initialMin)}:${formatNumber(initialSec)}`;

startButton.addEventListener("click", function(){
	startTimer();
});
stopButton.addEventListener("click", function(){
	stopTimer(intervalID);
});
resetButton.addEventListener("click", function(){
	resetTimer(intervalID);
});

function startTimer() {


	let min = document.getElementById("min").value;
	let sec = document.getElementById("sec").value;

	intervalID = setInterval(function () {

		if (min == 0 && sec == 0) {
			clearInterval(intervalID);
		}

		timer.textContent = `${formatNumber(min)}:${formatNumber(sec)}`;

		if (sec == 0) {
			min -= 1;
			sec = 59;
		} else {
			sec--;
		}

	}, 1000);
}

function stopTimer(intervalID){
	clearInterval(intervalID);
}

function resetTimer(intervalID){
	let min = document.getElementById("min").value;
	let sec = document.getElementById("sec").value;
	clearInterval(intervalID);
	timer.textContent = `${formatNumber(min)}:${formatNumber(sec)}`;
}





function formatNumber(num) {
	return ("0" + num).slice(-2);
}