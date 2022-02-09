import { Countdown } from "./countdown";

const countdown = new Countdown('#countdown');
let date = new Date("2022-02-10T23:59:00")
countdown.startWithDate(date);
// countdown.stopCountdown();
