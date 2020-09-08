const slider = document.querySelector(".volume-control__slider .slider");
slider.style.background = setSliderStyle(slider.value);
slider.oninput = function () {
	this.style.background = setSliderStyle(this.value);
};

function setSliderStyle(value) {
	return "linear-gradient(to right, #23BDDC 0%, #23BDDC " + value + "%, #B7B7B7 " + value + "%, #B7B7B7 100%)";
}
