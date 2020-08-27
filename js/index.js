/*eslint indent: ["error", "tab", { "SwitchCase": 1 }]*/
"use strict";
import Session from "./session.js";


//GET DATA FROM SETTINGS
const sessionData = {
	// 0 = pomodoro, 1 = short break, 2 = long break
	sequence: [0, 1, 0, 1, 0, 1, 0, 2],
	pomMin: 1,
	shortBreakMins: .5,
	longBreakMins: .75
};

const session = new Session(sessionData.sequence, sessionData.pomMin, sessionData.shortBreakMins, sessionData.longBreakMins);

// Get DOM elements
const playButton = document.querySelector(".timer-controls__button.play");
const stopButton = document.querySelector(".timer-controls__button.stop");
const resetButton = document.querySelector(".timer-controls__button.reset");
const timerDisplay = document.querySelector(".timer__display");
updateTimerDisplay(timerDisplay, sessionData.pomMin, 0);

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
});



// const it = runSequence();
// //starts the sequence
// it.next();

// function* runSequence() {
// 	for (let i = 0; i < sessionData.sequence.length; i++) {
// 		switch (sessionData.sequence[i]) {
// 			case 0:
// 				yield pomodoro.start(it);
// 				break;
// 			case 1:
// 				yield shortBreak.start(it);
// 				break;
// 			case 2:
// 				yield longBreak.start(it);
// 				break;
// 		}
// 	}


// }


//Helper functions
function formatNumber(num) {
	return ("0" + num).slice(-2);
}

function updateTimerDisplay(element, mins, secs){
	element.textContent = `${formatNumber(mins)}:${formatNumber(secs)}`;
}