import "./countdown.css";

export class Countdown {
    constructor(selector = '#countdown', endDate = null) {
        if (!document.querySelector(selector)) {
            return null;
        }

        this.selector = selector;
        this.interval = null;
        this.endDate = endDate instanceof Date ? endDate : null;
    }

    startWithDate(date) {
        if (date instanceof Date) {
            this.endDate = date;
            this.startCountdown();
        }
    }

    startCountdown() {
        let passed = this.calcDiff();
        if (!passed) {
            this.interval = setInterval(this.calcDiff.bind(this), 1000);
        } else {
            this.stopCountdown();
            document.querySelector(this.selector).appendChild(this.template({
                years: 0, 
                months: 0, 
                days: 0, 
                hours: 0, 
                minutes: 0, 
                seconds: 0
            }, true));
        }
    }
    
    stopCountdown() {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
    }

    calcDiff() {
        let years, months, days, hours, minutes, seconds = 0;
        let currentDate = new Date();

        if (this.endDate.getTime() <= currentDate.getTime()) {
            return true;
        }

        years = this.endDate.getFullYear() - currentDate.getFullYear();
        months = this.endDate.getMonth() - currentDate.getMonth();
        days = this.endDate.getDay() - currentDate.getDay();
        hours = this.endDate.getHours() - currentDate.getHours();
        minutes = this.endDate.getMinutes() - currentDate.getMinutes();
        seconds = this.endDate.getSeconds() - currentDate.getSeconds() +59;

        console.table({years, months, days, hours, minutes, seconds});

        document.querySelector(this.selector).innerHTML = null;
        document.querySelector(this.selector).appendChild(this.template({years, months, days, hours, minutes, seconds}));
        return false;
    }

    template(args, force = false) {
        let wrapper = document.createElement('div');
        wrapper.classList.add('countdown-wrapper');
        let field = document.createElement('div');
        field.classList.add('cd-field');

        let keys = Object.keys(args);
        for (let key of keys) {
            if (force == false) {
                if (args[key] <= 0 && ['years', 'months', 'days'].includes(key)) {
                    continue;
                }
            }

            let span = document.createElement('span');
            span.classList.add('label');
            span.innerText = key;

            let spanVal = document.createElement('span');
            spanVal.classList.add('val');
            spanVal.innerText = args[key];

            let currentField = field.cloneNode();
            currentField.classList.add(`cd-${key}`);
            currentField.appendChild(span);
            currentField.appendChild(spanVal);
            wrapper.appendChild(currentField);
        }
        
        return wrapper;
    }
}