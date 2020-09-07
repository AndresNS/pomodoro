document.getElementById("myinput").oninput = function () {
	this.style.background = "linear-gradient(to right, #82CFD0 0%, #82CFD0 " + this.value + "%, #B7B7B7 " + this.value + "%, #B7B7B7 100%)";
};