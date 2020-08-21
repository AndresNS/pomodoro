/* PROGRESS BAR DESKTOP */

const sequence = {
	cicles: [0, 1, 0, 1, 0, 1, 0, 2],
	pomMin: .1,
	shortBreakMins: .05,
	longBreakMins: .08
};


const progressBarCurrent = document.querySelector(".timer__progress-bar__current");
let barWidth = 0;
let idx = 0;
progressBarCurrent.style.width = barWidth + "%";
progressBarCurrent.classList.add("pomodoro");
let timer = setInterval(() => {
	if (barWidth >= 100) {
		nextInterval();
	}

	if (sequence.cicles[idx] == 0) {
		barWidth += (100 / (sequence.pomMin * 60));
	} else if (sequence.cicles[idx] == 1) {
		barWidth += (100 / (sequence.shortBreakMins * 60));
	} else if (sequence.cicles[idx] == 2) {
		barWidth += (100 / (sequence.longBreakMins * 60));
	}

	progressBarCurrent.style.width = barWidth + "%";
}, 1000);

// FIX CLEAR INTERVAL ON LAST INTERVAL

function nextInterval() {
	idx += 1;
	if (idx < sequence.cicles.length) {
		barWidth = 0;
		// click arrow
		const nextIntervalArrow = document.querySelectorAll(".sequence-display__controls>a");
		nextIntervalArrow[1].click();
		if (sequence.cicles[idx] == 0) {
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