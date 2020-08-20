/* PROGRESS BAR DESKTOP */

const sequence = {
	cicles: [0, 1, 0, 1, 0, 1, 0, 2],
	pomMin: 25,
	shortBreakMins: 5,
	longBreakMins: 10
};

const widths = calculateWidths(sequence.pomMin, sequence.shortBreakMins, sequence.longBreakMins);

const progressBarCurrent = document.querySelector(".timer__progress-bar__current");
const progressBarBg = document.querySelector(".timer__progress-bar__bg");


sequence.cicles.map((i) => {
	if (i === 0) {
		addElement("div", "pomodoro", 0, progressBarCurrent);
		addElement("div", "pomodoro", widths.pomodoroWidth, progressBarBg);
	} else if (i === 1) {
		addElement("div", "break", 0, progressBarCurrent);
		addElement("div", "break", widths.shortBreakWidth, progressBarBg);
	} else {
		addElement("div", "break", 0, progressBarCurrent);
		addElement("div", "break", widths.longBreakWidth, progressBarBg);
	}
});

const currentTimer = document.querySelector(".timer__progress-bar__current .pomodoro");
let w = 0;
currentTimer.style.width = w + "%";

// setInterval(()=>{
// 	currentTimer.style.width = w + "%";
// 	w++;
// 	console.log(currentTimer);
// },1000);




// Helper functions

function calculateWidths(pomMins, shortBreakMins, longBreakMins) {
	const pomodoroInSeconds = pomMins * 60;
	const shortBreakInSeconds = shortBreakMins * 60;
	const longBreakInSeconds = longBreakMins * 60;

	const totalSeconds = pomodoroInSeconds + shortBreakInSeconds + longBreakInSeconds;

	const pomodoroWidth = pomodoroInSeconds * 100 / totalSeconds;
	const shortBreakWidth = shortBreakInSeconds * 100 / totalSeconds;
	const longBreakWidth = longBreakInSeconds * 100 / totalSeconds;

	return {
		pomodoroWidth,
		shortBreakWidth,
		longBreakWidth
	};
}

function addElement(tag, className, width, parent) {
	const element = document.createElement("div");
	element.className = className;
	element.style.width = width + "%";
	parent.appendChild(element);
}