"use strict";

//Default values
let pomodoroMinutes = 0;
let pomodoroSeconds = 5;
let shortBreakMinutes = 5;
let shortBreakSeconds = 0;
let LongBreakMinutes = 10;
let LongBreakSeconds = 0;

// 0 = pomodoro, 1 = short break, 2 = long break
let sequence = [0, 1, 0, 1, 0, 1, 0, 2];

let pomodoro = new Timer(pomodoroMinutes, pomodoroSeconds);
let shortBreak = new Timer(shortBreakMinutes, shortBreakSeconds);
let longBreak = new Timer(LongBreakMinutes, LongBreakSeconds);





const timeDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

const minInput = document.getElementById("min");
const secInput = document.getElementById("sec");
let initialMin = minInput.value;
let initialSec = secInput.value;

// let intervalID = 0;
timeDisplay.textContent = `${formatNumber(initialMin)}:${formatNumber(initialSec)}`;

startButton.addEventListener("click", function () {
	// startTimer();
	pomodoro.start();
});
stopButton.addEventListener("click", function () {
	// stopTimer(intervalID);
	pomodoro.pause();
});
resetButton.addEventListener("click", function () {
	// resetTimer(intervalID);
	pomodoro.stop();
});

// function startTimer() {


// 	let min = document.getElementById("min").value;
// 	let sec = document.getElementById("sec").value;

// 	intervalID = setInterval(function () {

// 		if (min == 0 && sec == 0) {
// 			clearInterval(intervalID);
// 		}

// 		timeDisplay.textContent = `${formatNumber(min)}:${formatNumber(sec)}`;

// 		if (sec == 0) {
// 			min -= 1;
// 			sec = 59;
// 		} else {
// 			sec--;
// 		}

// 	}, 1000);
// }

// function stopTimer(intervalID) {
// 	clearInterval(intervalID);
// }

// function resetTimer(intervalID) {
// 	let min = document.getElementById("min").value;
// 	let sec = document.getElementById("sec").value;
// 	clearInterval(intervalID);
// 	timeDisplay.textContent = `${formatNumber(min)}:${formatNumber(sec)}`;
// }

function formatNumber(num) {
	return ("0" + num).slice(-2);
}









// PROTOTYPE CHAIN

function Timer(initialMinutes, initialSeconds) {
	this.timerId = 0;
	this.running = false;
	this.done = false;
	this.initialMinutes = initialMinutes;
	this.initialSeconds = initialSeconds;
	this.currentMinute = initialMinutes;
	this.currentSecond = initialSeconds;
}

//Start Timer
Timer.prototype.start = function () {
	this.running = true;
	return new Promise((resolve, reject) => {
		this.timerId = setInterval(() => {
			timeDisplay.textContent = `${formatNumber(this.currentMinute)}:${formatNumber(this.currentSecond)}`;
			//Stops timer when done
			if (this.currentMinute == 0 && this.currentSecond == 0) {
				clearInterval(this.timerId);
				this.done = true;
				this.running = false;
				console.log("pre promise resolve");
				resolve("done");
				console.log("post promise resolve");
			}
	
			if (this.currentSecond == 0) {
				this.currentMinute -= 1;
				this.currentSecond = 59;
			} else {
				this.currentSecond--;
			}
		}, 1000);
	});
};

//Pause Timer
Timer.prototype.pause = function () {
	clearInterval(this.timerId);
	this.running = false;
};

//Stop and reset Timer
Timer.prototype.stop = function () {
	clearInterval(this.timerId);
	this.running = false;
	this.done = true;
	this.currentMinute = this.initialMinutes;
	this.currentSecond = this.initialSeconds;
};















let it = runSequence();
//starts the sequence
it.next();

function* runSequence() {
	for (let i = 0; i < sequence.length; i++) {
		switch (sequence[i]) {
			case 0:
				yield pomodoro.start();
				break;
			case 1:
				yield shortBreak.start();
				break;
			case 2:
				yield longBreak.start();
				break;
		}
	}
}



