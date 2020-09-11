"use strict";
export default class Toast {
	constructor(element, message, state) {
		this.element = element;
		this.message = message;
		this.state = state;
		this.hideTimeout = null;
	}

	show() {
		clearTimeout(this.hideTimeout);
		this.element.classList.add(`toast--${this.state}`);
		this.element.textContent = this.message;
		this.element.classList.add("toast--visible");
		this.hideTimeout = setTimeout(() => {
			this.element.classList.remove("toast--visible");
		}, 6000);
	}
}