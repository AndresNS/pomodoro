"use strict";
import {
	updateTimerDisplay
} from "../helper-functions.js";
import {getUserSettings} from "../settings.js";
import HorizontalProgressBar from "../classes/horizontal-progress-bar.js";
import CircularProgressBar from "../classes/circular-progress-bar.js";

export default class Timer {
	constructor(timerDisplay, initialMinutes, initialSeconds = 0) {
		this.timerDisplay = timerDisplay;
		this.timerId = 0;
		this.isRunning = false;
		this.initialMinutes = initialMinutes;
		this.initialSeconds = initialSeconds;
		this.currentMinute = initialMinutes;
		this.currentSecond = initialSeconds;
		this.currentBlock = 0;
		this.userSettings = getUserSettings();
		this.alarmSound = new Audio(this.userSettings.alarmSound.path);


		const deskProgressBarElement = document.querySelector(".timer__progress-bar__current--desktop");
		const mobileProgressBarElement = document.querySelector(".timer__progress-bar__current--mobile");
		this.progressBarUI = {
			hProgressBar: new HorizontalProgressBar(deskProgressBarElement, this.userSettings.pomMin, this.userSettings.sequence),
			cProgressBar: new CircularProgressBar(mobileProgressBarElement, this.userSettings.pomMin, this.userSettings.sequence)
		};
	}

	//Start Timer
	start() {
		return new Promise((resolve) => {
			this.isRunning = true;
			this.timerId = setInterval(() => {

				//Stops timer when done
				if (this.currentMinute == 0 && this.currentSecond == 0) {
					this.alarmSound.volume = this.userSettings.alarmVolume / 100;
					this.alarmSound.play();
					resolve();
				}

				if (this.currentSecond == 0) {
					this.currentMinute -= 1;
					this.currentSecond = 59;
				} else {
					this.currentSecond -= 1;
				}

				this.progressBarUI.hProgressBar.addProgress();
				this.progressBarUI.cProgressBar.addProgress();
				updateTimerDisplay(this.timerDisplay, this.currentMinute, this.currentSecond);
			}, 1000);
		});
	}

	//Pause Timer
	pause() {
		clearInterval(this.timerId);
		this.isRunning = false;
	}

	//Reset Timer
	reset() {
		clearInterval(this.timerId);
		this.isRunning = false;
		this.setCurrentTime(this.initialMinutes, this.initialSeconds);
		updateTimerDisplay(this.timerDisplay, this.currentMinute, this.currentSecond);
		this.progressBarUI.hProgressBar.setTotalTime(this.initialMinutes);
		this.progressBarUI.cProgressBar.setTotalTime(this.initialMinutes);
		this.progressBarUI.hProgressBar.setIncrementValue();
		this.progressBarUI.cProgressBar.setIncrementValue();
		this.progressBarUI.hProgressBar.resetProgress(this.currentBlock);
		this.progressBarUI.cProgressBar.resetProgress(this.currentBlock);
	}

	setInitialTime(mins, secs) {
		this.initialMinutes = mins;
		this.initialSeconds = secs;
	}

	setCurrentTime(mins, secs) {
		this.currentMinute = mins;
		this.currentSecond = secs;
	}
}