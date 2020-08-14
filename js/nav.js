"use strict";

const header = document.querySelector("header");
const headerNav = document.querySelector(".header__nav");
const headerLogo = document.querySelector(".header__logo");
const hamburger = document.querySelector(".header__hamburger");
const btnCloseNav = document.querySelector(".header__close");
const btnCloseNavImg = document.querySelector(".header__close>a>img");
const menuItems = document.querySelectorAll(".menu li");

let headerWidth = header.getBoundingClientRect().width;
let logoWidth = headerLogo.getBoundingClientRect().width;
let translateValue = Math.round(headerWidth / 2 - logoWidth / 2 - 40);

window.onresize = function () {
	headerWidth = header.getBoundingClientRect().width;
	logoWidth = headerLogo.getBoundingClientRect().width;
	translateValue = Math.round(headerWidth / 2 - logoWidth / 2 - 40);
};

hamburger.addEventListener("click", () => {
	toggleMenu(translateValue);
});

btnCloseNav.addEventListener("click", () => {
	toggleMenu(0);
});

function toggleMenu(translateValue){
	headerNav.classList.toggle("open");
	btnCloseNav.classList.toggle("visible");
	headerLogo.style.transform = "translateX(" + translateValue + "px)";
	hamburger.classList.toggle("hidden");
	btnCloseNavImg.classList.toggle("close");
	menuItems.forEach(item => {
		item.classList.toggle("fade");
	});
}