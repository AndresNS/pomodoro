export function formatNumber(num) {
	return ("0" + num).slice(-2);
}

export function updateTimerDisplay(element, mins, secs) {
	element.textContent = `${formatNumber(mins)}:${formatNumber(secs)}`;
	console.log("updating display");
}

export function addElement(text, tag, parent) {
	const element = document.createElement(tag);
	element.textContent = text;
	parent.appendChild(element);
}