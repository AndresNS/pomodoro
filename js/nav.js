"use strict";

const hamburger = document.querySelector(".header__hamburger");
const headerNav = document.querySelector(".header__nav");
const btnCloseNav = document.querySelector(".header__close");
const headerLogo = document.querySelector(".header__logo");
const header = document.querySelector("header");
// const menuItems = document.querySelectorAll(".menu li");

let w = header.offsetWidth;
let logow = headerLogo.getBoundingClientRect().width;
let aux = w/2 - logow/2;
window.onresize = function () {
	w = header.offsetWidth;
	logow = headerLogo.getBoundingClientRect().width;
	aux = w/2 - logow/2;
};


hamburger.addEventListener("click", () => {
	headerNav.classList.toggle("open");
	btnCloseNav.classList.toggle("visible");
	console.log(aux);
	headerLogo.style.transform = "translateX(" + aux + "px)";
	hamburger.style.display = "none";
	// menuItems.forEach(item => {
	// 	item.classList.toggle("fade");
	// });
});

btnCloseNav.addEventListener("click", () => {
	headerNav.classList.toggle("open");
	btnCloseNav.classList.toggle("visible");
	headerLogo.style.transform = "translateX(0px)";
	hamburger.style.display = "block";
	// menuItems.forEach(item => {
	// 	item.classList.toggle("fade");
	// });
});