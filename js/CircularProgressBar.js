"use strict";
import ProgressBar from "./ProgressBar.js";

export default class CircularProgressBar extends ProgressBar {
	constructor(domElement, totalMins, initialBlock) {
		super(domElement, totalMins, initialBlock);
	}

	addProgress() {
		// super.addProgress();
		// this.setElementStyle();
	}
}