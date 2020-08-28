/*eslint indent: ["error", "tab", { "SwitchCase": 1 }]*/
"use strict";
import Session from "./session.js";
import {updateTimerDisplay} from "./helper-functions.js";

// Get DOM elements
const playButton = document.querySelector(".timer-controls__button.play");
const stopButton = document.querySelector(".timer-controls__button.stop");
const resetButton = document.querySelector(".timer-controls__button.reset");
const timerDisplay = document.querySelector(".timer__display");

//GET DATA FROM SETTINGS
const sessionData = {
	// 0 = pomodoro, 1 = short break, 2 = long break
	sequence: [0, 1, 0, 1, 0, 1, 0, 2],
	pomMin: 2,
	shortBreakMins: 1,
	longBreakMins: 1
};

updateTimerDisplay(timerDisplay, sessionData.pomMin, 0);

//Create Session
const session = new Session(sessionData.sequence, sessionData.pomMin, sessionData.shortBreakMins, sessionData.longBreakMins, timerDisplay);


//Button listeners
playButton.addEventListener("click", function () {
	if(this.classList.contains("play")){
		session.startTimer();
	}else{
		session.pauseTimer();
	}
	this.classList.toggle("play");
	this.classList.toggle("pause");
});

stopButton.addEventListener("click", function () {
	session.resetTimer();
	if(playButton.classList.contains("pause")){
		playButton.classList.toggle("play");
		playButton.classList.toggle("pause");
	}
});

resetButton.addEventListener("click", function () {
	session.resetSession();
	if(playButton.classList.contains("pause")){
		playButton.classList.toggle("play");
		playButton.classList.toggle("pause");
	}
});