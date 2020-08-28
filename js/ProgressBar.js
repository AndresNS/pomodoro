"use strict";

export default class ProgressBar {
	constructor(domElement, maxValue) {
		//Singleton
		if (ProgressBar.instance instanceof ProgressBar) {
			return ProgressBar.instance;
		}
		this.domElement = domElement;
		this.maxValue = maxValue;
		this.incrementValue = 100/maxValue;
		this.currentPercent = 0;

		ProgressBar.instance = this;
	}
	addProgress() {
		this.currentPercent += this.incrementValue;
		console.log(this.currentPercent);
	}

	resetProgress() {
		this.currentPercent = 0;
	}
}