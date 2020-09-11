/*eslint indent: ["error", "tab", { "SwitchCase": 1 }]*/
"use strict";
import Timer from "./timer.js";

export default class Session {
	constructor(userSettings, timerDisplay) {
		//Singleton
		if (Session.instance instanceof Session) {
			return Session.instance;
		}
		this.sequence = userSettings.sequence;
		this.currentBlock = 0;
		this.pomomodoroMinutes = userSettings.pomMin;
		this.shortBreakMinutes = userSettings.shortBreakMins;
		this.longBreakMinutes = userSettings.longBreakMins;
		switch (userSettings.sequence[0]) {
			case 0:
				this.timer = new Timer(timerDisplay, userSettings.pomMin);
				break;
			case 1:
				this.timer = new Timer(timerDisplay, userSettings.shortBreakMins);
				break;
			case 2:
				this.timer = new Timer(timerDisplay, userSettings.longBreakMins);
				break;
		}
		this.autostart = userSettings.autostart;

		Session.instance = this;
	}

	startTimer() {
		if (!this.timer.isRunning) {
			this.timer.currentBlock = this.currentBlock;
			this.timer.start().then(() => {
				if (this.currentBlock + 1 < this.sequence.length) {
					this.nextBlock(this.autostart);
				} else {
					clearInterval(this.timer.timerId);
					this.resetSession();
					const playButton = document.querySelector(".timer-controls__button.pause");
					playButton.classList.toggle("play");
					playButton.classList.toggle("pause");
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
		switch (this.sequence[0]) {
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
		this.currentBlock = 0;
		this.timer.currentBlock = 0;
		this.resetTimer();
	}

	nextBlock() {
		if (this.currentBlock + 1 < this.sequence.length) {
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
			if (this.autostart) {
				this.startTimer();
			}
		}
	}

	previousBlock() {
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
			if (this.autostart) {
				this.startTimer();
			}
		}
	}
}