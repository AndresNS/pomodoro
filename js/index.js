/*eslint indent: ["error", "tab", { "SwitchCase": 1 }]*/
"use strict";
import Session from "./modules/classes/session.js";
import {
	updateTimerDisplay,
	addElement
} from "./modules/helper-functions.js";
import sessionData from "./modules/session-data.js";

//NAV BAR
const header = document.querySelector("header");
const headerNav = document.querySelector(".header__nav");
const headerLogo = document.querySelector(".header__logo");
const hamburger = document.querySelector(".header__hamburger");
const btnCloseNav = document.querySelector(".header__close");
const btnCloseNavImg = document.querySelector(".header__close>a>img");
const menuItems = document.querySelectorAll(".menu li");

let headerWidth = header.getBoundingClientRect().width;
let logoWidth = headerLogo.getBoundingClientRect().width;
let translateValue = Math.round(headerWidth / 2 - logoWidth / 2 - 40);

window.addEventListener("resize", () => {
	headerWidth = header.getBoundingClientRect().width;
	logoWidth = headerLogo.getBoundingClientRect().width;
	translateValue = Math.round(headerWidth / 2 - logoWidth / 2 - 40);
	headerLogo.removeAttribute("style");
});

hamburger.addEventListener("click", () => {
	toggleMenu(translateValue);
});

btnCloseNav.addEventListener("click", () => {
	toggleMenu(0);
});

function toggleMenu(translateValue) {
	headerNav.classList.toggle("open");
	btnCloseNav.classList.toggle("visible");
	headerLogo.style.transform = "translateX(" + translateValue + "px)";
	hamburger.classList.toggle("hidden");
	btnCloseNavImg.classList.toggle("close");
	menuItems.forEach(item => {
		item.classList.toggle("fade");
	});
}

/******* POMODORO TIMER *******/
if (document.querySelector(".timer") !== null) {
	//HOME PAGE

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
}

/******* END POMODORO TIMER *******/

/******* SETTINGS *******/

if (document.querySelector(".settings-section") !== null) {
	//SEQUENCE MANAGER
	const sequenceManagerContainer = document.querySelector(".sequence-manager");
	const newBlockButton = document.querySelector(".button.button--primary.new-block");
	updateSequenceManagerElements();

	newBlockButton.addEventListener("click", () => {
		//Create block
		const newBlockElement = document.createElement("div");
		newBlockElement.classList.add("sequence-manager__block");
		newBlockElement.classList.add("pomodoro");
		newBlockElement.setAttribute("draggable", "true");

		//Append child elements
		const barsIcon = document.createElement("img");
		barsIcon.setAttribute("src", "img/icon-bars.svg");
		newBlockElement.appendChild(barsIcon);

		const blockText = document.createElement("p");
		blockText.textContent = "Pomodoro";
		newBlockElement.appendChild(blockText);

		const removeBlockIcon = document.createElement("img");
		removeBlockIcon.setAttribute("src", "img/icon-close.svg");
		removeBlockIcon.classList.add("remove-block");
		newBlockElement.appendChild(removeBlockIcon);

		sequenceManagerContainer.appendChild(newBlockElement);
		updateSequenceManagerElements();
	});
	
	sequenceManagerContainer.addEventListener("dragover", (e) => {
		e.preventDefault();
		const afterElement = getDragAfterElement(sequenceManagerContainer, e.clientY);
		const draggable = document.querySelector(".dragging");
		if (afterElement == null) {
			sequenceManagerContainer.appendChild(draggable);
		} else {
			sequenceManagerContainer.insertBefore(draggable, afterElement);
		}
	});

	//VOLUME CONTROL
	const slider = document.querySelector(".volume-control__slider .slider");
	slider.style.background = setSliderStyle(slider.value);
	slider.oninput = function () {
		this.style.background = setSliderStyle(this.value);
	};
}

/******* END SETTINGS *******/

/******* SETTINGS HELPER FUNCTIONS *******/

function updateSequenceManagerElements() {
	const draggables = document.querySelectorAll(".sequence-manager__block");
	const removeButtons = document.querySelectorAll(".sequence-manager__block .remove-block");
	removeButtons.forEach((removeButton) => {
		removeButton.addEventListener("click", (e) => {
			e.target.parentElement.remove();
		});
	});

	draggables.forEach((draggable) => {
		draggable.addEventListener("dragstart", () => {
			draggable.classList.add("dragging");
		});

		draggable.addEventListener("dragend", () => {
			draggable.classList.remove("dragging");
		});
	});
}

function setSliderStyle(value) {
	return "linear-gradient(to right, #23BDDC 0%, #23BDDC " + value + "%, #B7B7B7 " + value + "%, #B7B7B7 100%)";
}

function getDragAfterElement(container, y) {
	const draggableElements = [...container.querySelectorAll(".sequence-manager__block:not(.dragging)")];
	return draggableElements.reduce((closest, child) => {
		const box = child.getBoundingClientRect();
		const offset = y - box.top - box.height / 2;
		if (offset < 0 && offset > closest.offset) {
			return {
				offset: offset,
				element: child
			};
		} else {
			return closest;
		}
	}, {
		offset: Number.NEGATIVE_INFINITY
	}).element;
}

/******* END SETTINGS HELPER FUNCTIONS *******/