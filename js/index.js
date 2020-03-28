"use strict";


function Timer(initialMinutes, initialSeconds) {
	this.timerId = 0;
	this.initialMinutes = initialMinutes;
	this.initialSeconds = initialSeconds;
	this.currentMinute = initialMinutes;
	this.currentSecond = initialSeconds;
}

//Start Timer
Timer.prototype.start = function(){
	this.timerId = setInterval(function(){
		
		//Stops timer when done
		if (this.currentMinute == 0 && this.currentSecond == 0) {
			clearInterval(this.timerId);
		}

		if (this.currentSecond == 0) {
			this.currentMinute -= 1;
			this.currentSecond = 59;
		} else {
			this.currentSecond--;
		}
	}, 1000);
};

//Pause Timer
Timer.prototype.pause = function(){
	clearInterval(this.timerId);
};

//Stop and reset Timer
Timer.prototype.stop = function(){
	clearInterval(this.timerId);
	this.currentMinute = this.initialMinutes;
	this.currentSecond = this.initialSeconds;
};







const timeDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const minInput = document.getElementById("min");
const secInput = document.getElementById("sec");

let intervalID = 0;
let initialMin = minInput.value;
let initialSec = secInput.value;
timeDisplay.textContent = `${formatNumber(initialMin)}:${formatNumber(initialSec)}`;

startButton.addEventListener("click", function () {
	startTimer();
});
stopButton.addEventListener("click", function () {
	stopTimer(intervalID);
});
resetButton.addEventListener("click", function () {
	resetTimer(intervalID);
});

function startTimer() {


	let min = document.getElementById("min").value;
	let sec = document.getElementById("sec").value;

	intervalID = setInterval(function () {

		if (min == 0 && sec == 0) {
			clearInterval(intervalID);
		}

		timeDisplay.textContent = `${formatNumber(min)}:${formatNumber(sec)}`;

		if (sec == 0) {
			min -= 1;
			sec = 59;
		} else {
			sec--;
		}

	}, 1000);
}

function stopTimer(intervalID) {
	clearInterval(intervalID);
}

function resetTimer(intervalID) {
	let min = document.getElementById("min").value;
	let sec = document.getElementById("sec").value;
	clearInterval(intervalID);
	timeDisplay.textContent = `${formatNumber(min)}:${formatNumber(sec)}`;
}

function formatNumber(num) {
	return ("0" + num).slice(-2);
}