"use strict";
/* PROGRESS BAR DESKTOP */

import HorizontalProgressBar from "./HorizontalProgressBar.js";



const deskProgressBarElement = document.querySelector(".timer__progress-bar__current");
const maxWidth = document.querySelector(".timer__progress-bar__bg").getBoundingClientRect().width;
const hProgressBar = new HorizontalProgressBar(deskProgressBarElement, maxWidth);
export default hProgressBar;


// const sessionData = {
// 	sequence: [0, 1, 0, 1, 0, 1, 0, 2],
// 	pomMin: .1,
// 	shortBreakMins: .05,
// 	longBreakMins: .08
// };

// let barWidth = 0;
// let currentBlock = 0;
// progressBarCurrent.style.width = barWidth + "%";
// progressBarCurrent.classList.add("pomodoro");

// let timer = setInterval(() => {
// 	if (barWidth >= 100) {
// 		nextBlock();
// 	}

// 	if (sessionData.sequence[currentBlock] == 0) {
// 		//width per second
// 		barWidth += (100 / (sessionData.pomMin * 60));
// 	} else if (sessionData.sequence[currentBlock] == 1) {
// 		barWidth += (100 / (sessionData.shortBreakMins * 60));
// 	} else if (sessionData.sequence[currentBlock] == 2) {
// 		barWidth += (100 / (sessionData.longBreakMins * 60));
// 	}

// 	progressBarCurrent.style.width = barWidth + "%";
// }, 1000);

// // FIX CLEAR INTERVAL ON LAST INTERVAL

// function nextBlock() {
// 	currentBlock += 1;
// 	if (currentBlock < sessionData.sequence.length) {
// 		barWidth = 0;
// 		// click arrow
// 		const nextIntervalArrow = document.querySelectorAll(".sequence-display__controls>a");
// 		nextIntervalArrow[1].click();
// 		if (sessionData.sequence[currentBlock] == 0) {
// 			progressBarCurrent.classList.remove("break");
// 			progressBarCurrent.classList.add("pomodoro");
// 		} else {
// 			progressBarCurrent.classList.remove("pomodoro");
// 			progressBarCurrent.classList.add("break");
// 		}
// 	} else {
// 		clearInterval(timer);
// 	}
// }