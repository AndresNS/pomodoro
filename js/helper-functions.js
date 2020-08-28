export function formatNumber(num) {
	return ("0" + num).slice(-2);
}

export function updateTimerDisplay(element, mins, secs) {
	element.textContent = `${formatNumber(mins)}:${formatNumber(secs)}`;
}