/*eslint indent: ["error", "tab", { "SwitchCase": 1 }]*/
"use strict";
import Session from "./modules/classes/session.js";
import {
	updateTimerDisplay,
	addElement
} from "./modules/helper-functions.js";
import {
	getUserSettings,
	saveUserSettings,
	setDefaultSettings
} from "./modules/settings.js";
import Toast from "./modules/classes/toast.js";

/******* NAV BAR *******/
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

/******* END NAV BAR *******/

/******* POMODORO TIMER *******/
if (document.querySelector(".timer") !== null) {
	//HOME PAGE

	// Get DOM elements
	const playButton = document.querySelector(".timer-controls__button.play");
	const stopButton = document.querySelector(".timer-controls__button.stop");
	const resetButton = document.querySelector(".timer-controls__button.reset");
	const timerDisplay = document.querySelector(".timer__display");

	//Create Session
	let userSettings = getUserSettings();
	const session = new Session(userSettings, timerDisplay);

	//Set initial time
	updateTimerDisplay(timerDisplay, session.timer.initialMinutes, 0);

	//Timer sequence display
	const sequenceDisplayList = document.querySelector(".sequence-display__list");
	//Load list from settings
	userSettings.sequence.forEach((block) => {
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

	//LOAD USER SETTINGS
	let userSettings = getUserSettings();

	//SEQUENCE MANAGER
	const sequenceManagerContainer = document.querySelector(".sequence-manager");
	updateSequenceManagerElements();

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
	const volumeIcon = document.querySelector(".volume-control__icon img");
	volumeIcon.addEventListener("click", () => {
		slider.value = 0;
		slider.style.background = setSliderStyle(0);
		volumeIcon.src = "img/icon-volume-off.svg";
	});

	slider.style.background = setSliderStyle(slider.value);
	slider.oninput = function () {
		this.style.background = setSliderStyle(this.value);
		if (slider.value == 0) {
			volumeIcon.src = "img/icon-volume-off.svg";
		} else if (slider.value > 0 && slider.value <= 10) {
			volumeIcon.src = "img/icon-volume-mute.svg";
		} else if (slider.value > 10 && slider.value <= 60) {
			volumeIcon.src = "img/icon-volume-down.svg";
		} else if (slider.value > 60 && slider.value <= 100) {
			volumeIcon.src = "img/icon-volume-up.svg";
		}
	};
	slider.addEventListener("change", () => {
		const alarmSound = new Audio(userSettings.alarmSound.path);
		alarmSound.volume = slider.value / 100;
		alarmSound.play();
	});

	/******* NEW BLOCK MODAL *******/

	const openModalButtons = document.querySelectorAll("[data-modal-target]");
	const closeModalButtons = document.querySelectorAll("[data-close-button]");
	const modalOverlay = document.getElementById("overlay");
	const addBlockButton = document.querySelector(".button.button--secondary.add-block");

	addBlockButton.addEventListener("click", () => {
		try {
			const radioButtonOptions = document.querySelectorAll(".input-group__radio .block-type-option");
			const blockType = Array.from(radioButtonOptions).find((option) => {
				return option.checked;
			});

			createBlock(blockType.value, sequenceManagerContainer);

			const modal = addBlockButton.closest(".modal");
			closeModal(modal, modalOverlay);

			const toastElement = document.getElementById("toast");
			const toast = new Toast(toastElement, "New block added.", "success");
			toast.show();
		} catch (e) {
			const toastElement = document.getElementById("toast");
			const toast = new Toast(toastElement, "Error. Couldn't add block.", "error");
			toast.show();
			console.error("Error: " + e);
		}

	});

	openModalButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const modal = document.querySelector(button.dataset.modalTarget);
			openModal(modal, modalOverlay, sequenceManagerContainer);
		});
	});

	closeModalButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const modal = button.closest(".modal");
			closeModal(modal, modalOverlay);
		});
	});

	modalOverlay.addEventListener("click", () => {
		const modals = document.querySelectorAll(".modal.active");
		modals.forEach((modal) => {
			closeModal(modal, modalOverlay);
		});
	});


	/******* END NEW BLOCK MODAL *******/

	//DEFAULTS AND SAVE SETTINGS BUTTONS

	const defaultsButton = document.getElementById("defaults-button");
	const saveButton = document.getElementById("save-button");
	const testVolumeButton = document.getElementById("test-sound");
	const pomodoroMinutesInput = document.getElementById("pomodoro-min");
	const shortBreakMinutesInput = document.getElementById("short-break-min");
	const longBreakMinutesInput = document.getElementById("long-break-min");
	const autostartInput = document.getElementById("autostart");
	const alarmSoundInput = document.getElementById("alarm-sound");
	const volumeControlInput = document.getElementById("volume-control");

	//load user settings (Could be a function)
	pomodoroMinutesInput.value = userSettings.pomMin;
	shortBreakMinutesInput.value = userSettings.shortBreakMins;
	longBreakMinutesInput.value = userSettings.longBreakMins;
	autostartInput.checked = userSettings.autostart;
	alarmSoundInput.value = userSettings.alarmSound.name;
	volumeControlInput.value = userSettings.alarmVolume;
	slider.style.background = setSliderStyle(userSettings.alarmVolume);

	testVolumeButton.addEventListener("click", () => {
		let alarmSound;
		switch (alarmSoundInput.value) {
			case "piano":
				alarmSound = new Audio("../../src/sounds/piano.mp3");
				break;
			case "ding":
				alarmSound = new Audio("../../src/sounds/ding.mp3");
				break;
		}

		alarmSound.volume = userSettings.alarmVolume / 100;
		alarmSound.play();
	});

	userSettings.sequence.forEach((block) => {
		switch (block) {
			case 0:
				createBlock("pomodoro", sequenceManagerContainer);
				break;
			case 1:
				createBlock("short-break", sequenceManagerContainer);
				break;
			case 2:
				createBlock("long-break", sequenceManagerContainer);
				break;
		}
	});

	//save new settings
	saveButton.addEventListener("click", () => {
		try {
			userSettings.pomMin = pomodoroMinutesInput.value;
			userSettings.shortBreakMins = shortBreakMinutesInput.value;
			userSettings.longBreakMins = longBreakMinutesInput.value;
			userSettings.autostart = autostartInput.checked;
			switch (alarmSoundInput.value) {
				case "piano":
					userSettings.alarmSound.name = alarmSoundInput.value;
					userSettings.alarmSound.path = "../../src/sounds/piano.mp3";
					break;
				case "ding":
					userSettings.alarmSound.name = alarmSoundInput.value;
					userSettings.alarmSound.path = "../../src/sounds/ding.mp3";
					break;
			}

			userSettings.alarmVolume = volumeControlInput.value;
			let newSequence = [];
			const sequenceList = sequenceManagerContainer.children;
			for (let i = 0; i < sequenceList.length; i++) {
				switch (sequenceList[i].getAttribute("data-block-type")) {
					case "pomodoro":
						newSequence.push(0);
						break;
					case "short-break":
						newSequence.push(1);
						break;
					case "long-break":
						newSequence.push(2);
						break;
				}
			}

			userSettings.sequence = newSequence;

			saveUserSettings(userSettings);

			const toastElement = document.getElementById("toast");
			const toast = new Toast(toastElement, "Settings saved.", "success");
			toast.show();
		} catch (e) {
			const toastElement = document.getElementById("toast");
			const toast = new Toast(toastElement, "Error. Couldn't save settings.", "error");
			toast.show();
			console.error("Error: " + e);
		}
	});

	//set default settings
	defaultsButton.addEventListener("click", () => {
		try {
			setDefaultSettings();

			userSettings = getUserSettings();

			//load user settings (Could be a function)
			pomodoroMinutesInput.value = userSettings.pomMin;
			shortBreakMinutesInput.value = userSettings.shortBreakMins;
			longBreakMinutesInput.value = userSettings.longBreakMins;
			autostartInput.checked = userSettings.autostart;
			alarmSoundInput.value = userSettings.alarmSound.name;
			volumeControlInput.value = userSettings.alarmVolume;
			slider.style.background = setSliderStyle(userSettings.alarmVolume);

			testVolumeButton.addEventListener("click", () => {
				let alarmSound;
				switch (alarmSoundInput.value) {
					case "piano":
						alarmSound = new Audio("../../src/sounds/piano.mp3");
						break;
					case "ding":
						alarmSound = new Audio("../../src/sounds/ding.mp3");
						break;
				}

				alarmSound.volume = userSettings.alarmVolume / 100;
				alarmSound.play();
			});

			//Clear sequence manager before creating blocks

			userSettings.sequence.forEach((block) => {
				switch (block) {
					case 0:
						createBlock("pomodoro", sequenceManagerContainer);
						break;
					case 1:
						createBlock("short-break", sequenceManagerContainer);
						break;
					case 2:
						createBlock("long-break", sequenceManagerContainer);
						break;
				}
			});

			const toastElement = document.getElementById("toast");
			const toast = new Toast(toastElement, "Settings restored to default values.", "success");
			toast.show();
		} catch (e) {
			const toastElement = document.getElementById("toast");
			const toast = new Toast(toastElement, "Error. Couldn't save settings.", "error");
			toast.show();
			console.error("Error: " + e);
		}
	});


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

function openModal(modal, overlay) {
	if (modal == null) return;
	modal.classList.add("active");
	overlay.classList.add("active");

	const radioButtonOptions = document.querySelectorAll(".input-group__radio .block-type-option");
	radioButtonOptions[0].checked = true;
	const body = document.getElementsByTagName("body")[0];
	body.classList.add("overflow-hidden");

}

function closeModal(modal, overlay) {
	if (modal == null) return;
	modal.classList.remove("active");
	overlay.classList.remove("active");
	const body = document.getElementsByTagName("body")[0];
	body.classList.remove("overflow-hidden");
}

function createBlock(blockType, managerContainer) {
	//Create block
	const newBlockElement = document.createElement("div");
	newBlockElement.classList.add("sequence-manager__block");

	newBlockElement.setAttribute("draggable", "true");

	//Append child elements
	const barsIcon = document.createElement("img");
	barsIcon.setAttribute("src", "img/icon-bars.svg");
	newBlockElement.appendChild(barsIcon);

	const blockText = document.createElement("p");
	switch (blockType) {
		case "pomodoro":
			newBlockElement.classList.add("pomodoro");
			newBlockElement.setAttribute("data-block-type", "pomodoro");
			blockText.textContent = "Pomodoro";
			break;
		case "short-break":
			newBlockElement.classList.add("break");
			newBlockElement.setAttribute("data-block-type", "short-break");
			blockText.textContent = "Short Break";
			break;
		case "long-break":
			newBlockElement.classList.add("break");
			newBlockElement.setAttribute("data-block-type", "long-break");
			blockText.textContent = "Long Break";
			break;
	}
	newBlockElement.appendChild(blockText);

	const removeBlockIcon = document.createElement("img");
	removeBlockIcon.setAttribute("src", "img/icon-close.svg");
	removeBlockIcon.classList.add("remove-block");
	newBlockElement.appendChild(removeBlockIcon);

	managerContainer.appendChild(newBlockElement);
	updateSequenceManagerElements();
}

/******* END SETTINGS HELPER FUNCTIONS *******/