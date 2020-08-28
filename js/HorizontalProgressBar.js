"use strict";
import ProgressBar from "./ProgressBar.js";

export default class HorizontalProgressBar extends ProgressBar {
	constructor(domElement, maxValue) {
		super(domElement, maxValue);
		this.width = 0;
	}

	setElementStyle() {
		this.domElement.style.width = this.width + "%";
	}

	setCurrentBlockClass(newClass, previousClass) {
		this.domElement.classList.add(newClass);

		if (!previousClass) {
			this.domElement.classList.remove(previousClass);
		}
	}
}