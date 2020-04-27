"use strict";
/*eslint indent: ["error", "tab", { "SwitchCase": 1 }]*/

//Default values
let pomodoroMinutes = 0;
let pomodoroSeconds = 3;
let shortBreakMinutes = 0;
let shortBreakSeconds = 5;
let LongBreakMinutes = 0;
let LongBreakSeconds = 10;

// 0 = pomodoro, 1 = short break, 2 = long break
let sequence = [0, 1, 0, 1, 0, 1, 0, 2];

let pomodoro = new Timer(pomodoroMinutes, pomodoroSeconds);
let shortBreak = new Timer(shortBreakMinutes, shortBreakSeconds);
let longBreak = new Timer(LongBreakMinutes, LongBreakSeconds);

// Get DOM elements
const timeDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const minInput = document.getElementById("min");
const secInput = document.getElementById("sec");

//Set initial value for inputs
let initialMin = minInput.value;
let initialSec = secInput.value;
timeDisplay.textContent = `${formatNumber(initialMin)}:${formatNumber(initialSec)}`;

//Button listeners
startButton.addEventListener("click", function () {
	pomodoro.start();
});

pauseButton.addEventListener("click", function () {
	pomodoro.pause();
});

resetButton.addEventListener("click", function () {
	pomodoro.reset();
});





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
Timer.prototype.start = function (iterator) {
	this.running = true;
	this.timerId = setInterval(() => {
		timeDisplay.textContent = `${formatNumber(this.currentMinute)}:${formatNumber(this.currentSecond)}`;
		console.log(`${formatNumber(this.currentMinute)}:${formatNumber(this.currentSecond)}`);

		//Stops timer when done
		if (this.currentMinute == 0 && this.currentSecond == 0) {
			this.reset();
			iterator.next();
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
Timer.prototype.pause = function () {
	clearInterval(this.timerId);
	this.running = false;
};

//Reset Timer
Timer.prototype.reset = function () {
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
				yield pomodoro.start(it);
				break;
			case 1:
				yield shortBreak.start(it);
				break;
			case 2:
				yield longBreak.start(it);
				break;
		}
	}
}


//Helper functions
function formatNumber(num) {
	return ("0" + num).slice(-2);
}
