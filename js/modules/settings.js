"use strict";
import {
	checkLocalStorage
} from "./helper-functions.js";

// 0 = pomodoro, 1 = short break, 2 = long break
const defaultSettings = {
	isDefault: false,
	sequence: [0, 1, 0, 1, 0, 1, 0, 2],
	pomMin: 1,
	shortBreakMins: 5,
	longBreakMins: 10,
	autostart: true,
	alarmSound: "../../src/sounds/piano.mp3",
	alarmVolume: 80
};

let userSettings = {};

if (checkLocalStorage()) {
	//Local storage available
	if (localStorage.getItem("userSettings") === null) {
		//Set default settings
		localStorage.setItem("userSettings", JSON.stringify(defaultSettings));
		userSettings = defaultSettings;
	} else {
		//Get user settings
		const settingsObject = JSON.parse(localStorage.getItem("userSettings"));
		if (!settingsObject.isDefault) {
			userSettings.isDefault = false;
			userSettings.sequence = settingsObject.sequence;
			userSettings.pomMin = settingsObject.pomMin;
			userSettings.shortBreakMins = settingsObject.shortBreakMins;
			userSettings.longBreakMins = settingsObject.longBreakMins;
			userSettings.autostart = settingsObject.autostart;
			userSettings.alarmSound = settingsObject.alarmSound;
			userSettings.alarmVolume = settingsObject.alarmVolume;
		}else{
			userSettings = settingsObject;
		}
	}
} else {
	console.warn("Unable to load settings. LocalStorage not available.");
}

export default userSettings;