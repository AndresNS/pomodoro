"use strict";

export default class Timer {
	constructor(initialMinutes, initialSeconds = 0) {
		this.timerId = 0;
		this.running = false;
		this.done = false;
		this.initialMinutes = initialMinutes;
		this.initialSeconds = initialSeconds;
		this.currentMinute = initialMinutes;
		this.currentSecond = initialSeconds;
	}

	//Start Timer
	start() {
		this.running = true;
		this.timerId = setInterval(() => {

			//Stops timer when done
			if (this.currentMinute == 0 && this.currentSecond == 0) {
				this.reset();
			}

			if (this.currentSecond == 0) {
				this.currentMinute -= 1;
				this.currentSecond = 59;
			} else {
				this.currentSecond -= 1;
			}
		}, 1000);
	}

	//Pause Timer
	pause() {
		clearInterval(this.timerId);
		this.running = false;
	}

	//Reset Timer
	reset() {
		clearInterval(this.timerId);
		this.running = false;
		this.done = true;
		this.currentMinute = this.initialMinutes;
		this.currentSecond = this.initialSeconds;
	}
}