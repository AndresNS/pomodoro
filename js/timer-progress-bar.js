"use strict";
/* PROGRESS BAR DESKTOP */
import sessionData from "./session-data.js";
import HorizontalProgressBar from "./HorizontalProgressBar.js";
import CircularProgressBar from "./CircularProgressBar.js";


//Desktop Progress Bar
const deskProgressBarElement = document.querySelector(".timer__progress-bar__current--desktop");

const hProgressBar = new HorizontalProgressBar(deskProgressBarElement, sessionData.pomMin, sessionData.sequence);
export default hProgressBar;