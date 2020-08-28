/*eslint indent: ["error", "tab", { "SwitchCase": 1 }]*/
"use strict";
import Timer from "./timer.js";

export default class Session {
	constructor(sequence, pomomodoroMinutes, shortBreakMinutes, longBreakMinutes, timerDisplay) {
		//Singleton
		if (Session.instance instanceof Session) {
			return Session.instance;
		}
		this.sequence = sequence;
		this.currentBlock = 0;
		this.pomomodoroMinutes = pomomodoroMinutes;
		this.shortBreakMinutes = shortBreakMinutes;
		this.longBreakMinutes = longBreakMinutes;
		this.timer = new Timer(timerDisplay, pomomodoroMinutes);
		this.autostart = true;

		Session.instance = this;
	}

	startTimer() {
		if (!this.timer.isRunning) {
			this.timer.currentBlock = this.currentBlock;
			this.timer.start().then(() => {
				if(this.currentBlock<this.sequence.length){
					this.nextBlock(this.autostart);
				}
			});
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
		this.timer.setInitialTime(this.pomomodoroMinutes, 0);
		this.resetTimer();
		this.currentBlock = 0;
		this.timer.currentBlock = 0;
	}

	nextBlock(autostart) {
		if (this.currentBlock < this.sequence.length) {
			this.currentBlock += 1;
			switch (this.sequence[this.currentBlock]) {
				case 0:
					this.timer.setInitialTime(this.pomomodoroMinutes, 0);
					this.timer.currentBlock = this.sequence[this.currentBlock];
					break;

				case 1:
					this.timer.setInitialTime(this.shortBreakMinutes, 0);
					this.timer.currentBlock = this.sequence[this.currentBlock];
					break;

				case 2:
					this.timer.setInitialTime(this.longBreakMinutes, 0);
					this.timer.currentBlock = this.sequence[this.currentBlock];
					break;
			}
			this.resetTimer();
			if (autostart) {
				this.startTimer();
			}
		}
	}

	previousBlock(autostart) {
		if (this.currentBlock > 0) {
			this.currentBlock -= 1;
			switch (this.sequence[this.currentBlock]) {
				case 0:
					this.timer.setInitialTime(this.pomomodoroMinutes, 0);
					this.timer.currentBlock = this.sequence[this.currentBlock];
					break;

				case 1:
					this.timer.setInitialTime(this.shortBreakMinutes, 0);
					this.timer.currentBlock = this.sequence[this.currentBlock];
					break;

				case 2:
					this.timer.setInitialTime(this.longBreakMinutes, 0);
					this.timer.currentBlock = this.sequence[this.currentBlock];
					break;
			}
			this.resetTimer();
			if (autostart) {
				this.startTimer();
			}
		}
	}
}