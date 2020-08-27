"use strict";

export default class Timer {
	constructor(timerDisplay, initialMinutes, initialSeconds = 0) {
		this.timerDisplay = timerDisplay;
		this.timerId = 0;
		this.isRunning = false;
		this.initialMinutes = initialMinutes;
		this.initialSeconds = initialSeconds;
		this.currentMinute = initialMinutes;
		this.currentSecond = initialSeconds;
	}

	//Start Timer
	start() {
		return new Promise((resolve) => {
			this.isRunning = true;
			this.timerId = setInterval(() => {
				

				//Stops timer when done
				if (this.currentMinute == 0 && this.currentSecond == 0) {
					this.reset();
					resolve();
				}

				if (this.currentSecond == 0) {
					this.currentMinute -= 1;
					this.currentSecond = 59;
				} else {
					this.currentSecond -= 1;
				}
				this.updateTimerDisplay(this.timerDisplay, this.currentMinute, this.currentSecond);
			}, 300);
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
	}

	setInitialTime(mins, secs) {
		this.initialMinutes = mins;
		this.initialSeconds = secs;
	}

	setCurrentTime(mins, secs) {
		this.currentMinute = mins;
		this.currentSecond = secs;
	}

	updateTimerDisplay(element, mins, secs) {
		//USE FUNCTION formatNumber()
		element.textContent = `${("0" + mins).slice(-2)}:${("0" + secs).slice(-2)}`;
	}
}