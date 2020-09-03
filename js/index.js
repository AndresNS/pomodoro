/*eslint indent: ["error", "tab", { "SwitchCase": 1 }]*/
"use strict";
import Session from "./modules/session.js";
import {
	updateTimerDisplay,
	addElement
} from "./modules/helper-functions.js";
import sessionData from "./modules/session-data.js";

// Get DOM elements
const playButton = document.querySelector(".timer-controls__button.play");
const stopButton = document.querySelector(".timer-controls__button.stop");
const resetButton = document.querySelector(".timer-controls__button.reset");
const timerDisplay = document.querySelector(".timer__display");

//Set initial time
updateTimerDisplay(timerDisplay, sessionData.pomMin, 0);

//Create Session
const session = new Session(sessionData.sequence, sessionData.pomMin, sessionData.shortBreakMins, sessionData.longBreakMins, timerDisplay);

//Timer sequence display
const sequenceDisplayList = document.querySelector(".sequence-display__list");
//Load list from settings
sessionData.sequence.forEach((block) => {
	switch (block) {
		case 0:
			addElement("Focus", "li", sequenceDisplayList);
			break;
		case 1:
			addElement("Break", "li", sequenceDisplayList);
			break;
		case 2:
			addElement("Long Break", "li", sequenceDisplayList);
			break;
	}
});

const sequenceDisplayControls = document.querySelectorAll(".sequence-display__controls>a");
const currentListItem = sequenceDisplayList.firstElementChild;
let listItemWidth = currentListItem.offsetWidth;
let listItemTranslateValue = 0;
let currentIndex = session.currentBlock;
const maxIndex = session.sequence.length - 1;

window.onresize = function () {
	listItemWidth = currentListItem.offsetWidth;
};

sequenceDisplayControls.forEach((item) => {
	item.addEventListener("click", (e) => {
		e.preventDefault();
		if (item.classList.contains("left") && currentIndex > 0) {
			listItemTranslateValue = listItemTranslateValue + listItemWidth;
			sequenceDisplayList.style.transform = "translateX(" + listItemTranslateValue + "px)";
			currentIndex -= 1;
			if ((session.autostart && !session.timer.isRunning) || (!session.autostart && session.timer.isRunning)) {
				playButton.classList.toggle("play");
				playButton.classList.toggle("pause");
			}
			session.previousBlock();
		} else if (item.classList.contains("right") && currentIndex < maxIndex) {
			listItemTranslateValue = listItemTranslateValue + (-listItemWidth);
			sequenceDisplayList.style.transform = "translateX(" + listItemTranslateValue + "px)";
			currentIndex += 1;
			if ((session.autostart && !session.timer.isRunning) || (!session.autostart && session.timer.isRunning)) {
				playButton.classList.toggle("play");
				playButton.classList.toggle("pause");
			}
			session.nextBlock();
		}
	});
});


//Button listeners
playButton.addEventListener("click", function () {
	if (this.classList.contains("play")) {
		session.startTimer();
	} else {
		session.pauseTimer();
	}
	this.classList.toggle("play");
	this.classList.toggle("pause");
});

stopButton.addEventListener("click", function () {
	session.resetTimer();
	if (playButton.classList.contains("pause")) {
		playButton.classList.toggle("play");
		playButton.classList.toggle("pause");
	}
});

resetButton.addEventListener("click", function () {
	session.resetSession();
	if (playButton.classList.contains("pause")) {
		playButton.classList.toggle("play");
		playButton.classList.toggle("pause");
	}
	sequenceDisplayList.style.transform = "translateX(0px)";
	listItemTranslateValue = 0;
	currentIndex = session.currentBlock;
});