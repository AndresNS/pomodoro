"use strict";
import {
	updateTimerDisplay
} from "./helper-functions.js";
import {
	default as ProgressBar
} from "./timer-progress-bar.js";

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
	}

	//Start Timer
	start() {
		return new Promise((resolve) => {
			this.isRunning = true;
			this.timerId = setInterval(() => {

				//Stops timer when done
				if (this.currentMinute == 0 && this.currentSecond == 0) {
					resolve();
				}

				if (this.currentSecond == 0) {
					this.currentMinute -= 1;
					this.currentSecond = 59;
				} else {
					this.currentSecond -= 1;
				}

				ProgressBar.hProgressBar.addProgress();
				ProgressBar.mProgressBar.addProgress();
				updateTimerDisplay(this.timerDisplay, this.currentMinute, this.currentSecond);
			}, 100);
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
		ProgressBar.hProgressBar.setTotalTime(this.initialMinutes);
		ProgressBar.mProgressBar.setTotalTime(this.initialMinutes);
		ProgressBar.hProgressBar.setIncrementValue();
		ProgressBar.mProgressBar.setIncrementValue();
		ProgressBar.hProgressBar.resetProgress(this.currentBlock);
		ProgressBar.mProgressBar.resetProgress(this.currentBlock);
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