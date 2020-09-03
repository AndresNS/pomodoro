"use strict";
import ProgressBar from "./ProgressBar.js";

export default class CircularProgressBar extends ProgressBar {
	constructor(domElement, totalMins, sequence) {
		super(domElement, totalMins, sequence);
		this.setElementStyle();
		this.setCurrentBlockClass(sequence[0]);
		this.frame = 0;
		this.incrementValue = 1 / this.totalSeconds;
	}

	addProgress() {
		super.addProgress();
		this.setElementStyle();
	}

	resetProgress(currentBlock) {
		super.resetProgress(currentBlock);
		this.frame = 0;
		this.setElementStyle();
	}

	setIncrementValue() {
		this.incrementValue = 1 / this.totalSeconds;
	}

	setElementStyle() {
		this.domElement.style.animationDelay = `-${this.frame}s`;
		this.frame += this.incrementValue;
	}
}