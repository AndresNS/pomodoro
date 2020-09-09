"use strict";
import ProgressBar from "./progress-bar.js";

export default class HorizontalProgressBar extends ProgressBar {
	constructor(domElement, totalMins, sequence) {
		super(domElement, totalMins, sequence);
		this.setElementStyle();
		this.setCurrentBlockClass(sequence[0]);
	}

	addProgress() {
		super.addProgress();
		this.setElementStyle();
	}

	resetProgress(currentBlock) {
		super.resetProgress(currentBlock);
		this.setElementStyle();
	}

	setElementStyle() {
		this.domElement.style.width = this.currentPercent + "%";
	}
}