"use strict";

export default class ProgressBar {
	constructor(domElement, totalMins, initialBlock) {
		//Singleton
		if (ProgressBar.instance instanceof ProgressBar) {
			return ProgressBar.instance;
		}
		this.domElement = domElement;
		this.totalSeconds = totalMins * 60;
		this.incrementValue = 100 / this.totalSeconds;
		this.currentPercent = 0;
		this.currentBlock = initialBlock;

		ProgressBar.instance = this;
	}
	addProgress() {
		this.currentPercent += this.incrementValue;
	}

	resetProgress(currentBlock) {
		this.currentPercent = 0;
		this.currentBlock = currentBlock;
		this.setCurrentBlockClass(this.currentBlock);

	}

	setTotalTime(mins) {
		this.totalSeconds = mins * 60;
	}

	setIncrementValue() {
		this.incrementValue = 100 / this.totalSeconds;
	}

	setCurrentBlockClass(currentBlock) {
		if (currentBlock == 0) {
			this.domElement.classList.add("pomodoro");
			if (this.domElement.classList.contains("break")) {
				this.domElement.classList.remove("break");
			}
		} else {
			this.domElement.classList.add("break");
			if (this.domElement.classList.contains("pomodoro")) {
				this.domElement.classList.remove("pomodoro");
			}
		}

	}
}