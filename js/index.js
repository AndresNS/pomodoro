"use strict";

const timer = document.getElementById("timer");

let min = 25;
let sec = 0;


setInterval(function () {
	timer.textContent = `${min}:${formatNumber(sec)}`;
	if (sec == 0) {
		min -= 1;
		sec = 59;
	}else{
		sec--;
	}

}, 1000);



function formatNumber(num) {
	return ("0" + num).slice(-2);
}