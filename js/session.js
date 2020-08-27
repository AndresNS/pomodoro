"use strict";
import Timer from "./timer.js";

export default class Session {
	constructor(sequence, pomomodoroMinutes, shortBreakMinutes, longBreakMinutes) {
		//Singleton
		if (Session.instance instanceof Session) {
			return Session.instance;
		}
		this.sequence = sequence;
		this.pomomodoroMinutes = pomomodoroMinutes;
		this.shortBreakMinutes = shortBreakMinutes;
		this.longBreakMinutes = longBreakMinutes;
		this.timer = new Timer(pomomodoroMinutes);

		Object.freeze(this);
		Session.instance = this;
	}

	start(){

	}

	pause(){

	}

	reset(){
		
	}

	nextBlock(){

	}

	previousBlock(){

	}
}