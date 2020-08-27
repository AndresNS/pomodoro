"use strict";

export default class Timer {
	constructor(initialMinutes, initialSeconds = 0) {
		this.timerId = 0;
		this.isRunning = false;
		// this.isDone = false;
		this.initialMinutes = initialMinutes;
		this.initialSeconds = initialSeconds;
		this.currentMinute = initialMinutes;
		this.currentSecond = initialSeconds;
	}

	//Start Timer
	start() {
		this.isRunning = true;
		this.timerId = setInterval(() => {
			console.log(`${this.currentMinute}:${this.currentSecond}`)

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
		this.isRunning = false;
	}

	//Reset Timer
	reset() {
		clearInterval(this.timerId);
		this.isRunning = false;
		// this.isDone = true;
		this.setCurrentTime(this.initialMinutes,this.initialSeconds);
	}

	setInitialTime(mins, secs){
		this.initialMinutes = mins;
		this.initialSeconds = secs;
	}

	setCurrentTime(mins, secs){
		this.currentMinute = mins;
		this.currentSecond = secs;
	}
}