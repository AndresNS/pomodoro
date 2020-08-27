/*eslint indent: ["error", "tab", { "SwitchCase": 1 }]*/
"use strict";
import Timer from "./timer.js";

export default class Session {
	constructor(sequence, pomomodoroMinutes, shortBreakMinutes, longBreakMinutes) {
		//Singleton
		if (Session.instance instanceof Session) {
			return Session.instance;
		}
		this.sequence = sequence;
		this.currentBlock = 0;
		this.pomomodoroMinutes = pomomodoroMinutes;
		this.shortBreakMinutes = shortBreakMinutes;
		this.longBreakMinutes = longBreakMinutes;
		this.timer = new Timer(pomomodoroMinutes);

		Object.freeze(this);
		Session.instance = this;
	}

	startTimer() {
		if (!this.timer.isRunning) {
			this.timer.start();
		}
	}

	pauseTimer() {
		if (this.timer.isRunning) {
			this.timer.pause();
		}
	}

	resetTimer() {
		this.timer.reset();
	}

	resetSession() {
		if (this.timer.isRunning) {
			this.timer.setInitialTime(this.pomomodoroMinutes, 0);
			this.timer.reset();
			this.currentBlock = 0;
		}
	}

	nextBlock(autostart) {
		if (this.currentBlock < this.sequence.length) {
			this.currentBlock += 1;
			switch (this.sequence[this.currentBlock]) {
				case 0:
					this.timer.setInitialTime(this.pomomodoroMinutes, 0);
					break;

				case 1:
					this.timer.setInitialTime(this.shortBreakMinutes, 0);
					break;

				case 2:
					this.timer.setInitialTime(this.longBreakMinutes, 0);
					break;
			}
			this.timer.reset();
			if (autostart) {
				this.timer.start();
			}
		}
	}

	previousBlock(autostart) {
		if (this.currentBlock > 0) {
			this.currentBlock -= 1;
			switch (this.sequence[this.currentBlock]) {
				case 0:
					this.timer.setInitialTime(this.pomomodoroMinutes, 0);
					break;

				case 1:
					this.timer.setInitialTime(this.shortBreakMinutes, 0);
					break;

				case 2:
					this.timer.setInitialTime(this.longBreakMinutes, 0);
					break;
			}
			this.timer.reset();
			if (autostart) {
				this.timer.start();
			}
		}
	}
}