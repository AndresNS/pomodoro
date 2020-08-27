"use strict";
/* PROGRESS BAR DESKTOP */

// const sessionData = {
// 	sequence: [0, 1, 0, 1, 0, 1, 0, 2],
// 	pomMin: .1,
// 	shortBreakMins: .05,
// 	longBreakMins: .08
// };


const progressBarCurrent = document.querySelector(".timer__progress-bar__current");
let barWidth = 0;
let idx = 0;
progressBarCurrent.style.width = barWidth + "%";
progressBarCurrent.classList.add("pomodoro");
let timer = setInterval(() => {
	if (barWidth >= 100) {
		nextInterval();
	}

	if (sessionData.sequence[idx] == 0) {
		barWidth += (100 / (sessionData.pomMin * 60));
	} else if (sessionData.sequence[idx] == 1) {
		barWidth += (100 / (sessionData.shortBreakMins * 60));
	} else if (sessionData.sequence[idx] == 2) {
		barWidth += (100 / (sessionData.longBreakMins * 60));
	}

	progressBarCurrent.style.width = barWidth + "%";
}, 1000);

// FIX CLEAR INTERVAL ON LAST INTERVAL

function nextInterval() {
	idx += 1;
	if (idx < sessionData.sequence.length) {
		barWidth = 0;
		// click arrow
		const nextIntervalArrow = document.querySelectorAll(".sequence-display__controls>a");
		nextIntervalArrow[1].click();
		if (sessionData.sequence[idx] == 0) {
			progressBarCurrent.classList.remove("break");
			progressBarCurrent.classList.add("pomodoro");
		} else {
			progressBarCurrent.classList.remove("pomodoro");
			progressBarCurrent.classList.add("break");
		}
	} else {
		clearInterval(timer);
	}
}