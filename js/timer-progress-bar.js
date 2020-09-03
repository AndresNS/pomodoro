"use strict";
/* PROGRESS BAR DESKTOP */
import sessionData from "./session-data.js";
import HorizontalProgressBar from "./HorizontalProgressBar.js";
import CircularProgressBar from "./CircularProgressBar.js";


//Desktop Progress Bar
const deskProgressBarElement = document.querySelector(".timer__progress-bar__current--desktop");
const mobileProgressBarElement = document.querySelector(".timer__progress-bar__current--mobile");

const hProgressBar = new HorizontalProgressBar(deskProgressBarElement, sessionData.pomMin, sessionData.sequence);
const mProgressBar = new CircularProgressBar(mobileProgressBarElement, sessionData.pomMin, sessionData.sequence);
export default {hProgressBar, mProgressBar};