"use strict";

const sequenceDisplayList = document.querySelector(".sequence-display__list");
const sequenceDisplayControls = document.querySelectorAll(".sequence-display__controls>a");
const currentListItem = sequenceDisplayList.firstElementChild;
let listItemWidth = currentListItem.offsetWidth;
let listItemTranslateValue = 0;
let currentIndex = 1;
let maxIndex = sequenceDisplayList.childElementCount - 1;

window.onresize = function () {
	listItemWidth = currentListItem.offsetWidth;
};

sequenceDisplayControls.forEach((item) => {
	item.addEventListener("click", (e) => {
		e.preventDefault();
		if (item.classList.contains("left") && currentIndex > 1) {
			listItemTranslateValue = listItemTranslateValue + listItemWidth;
			sequenceDisplayList.style.transform = "translateX(" + listItemTranslateValue + "px)";
			currentIndex -= 1;
		} else if (item.classList.contains("right") && currentIndex < maxIndex) {
			listItemTranslateValue = listItemTranslateValue + (- listItemWidth);
			sequenceDisplayList.style.transform = "translateX(" + listItemTranslateValue + "px)";
			currentIndex += 1;
		}
	});
});

