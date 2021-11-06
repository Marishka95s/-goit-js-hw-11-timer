class Timer {
    constructor({ selector, targetDate }) {
        this.targetDate = targetDate.getTime();
        this.selector = selector;

        this.refs = {
            timerBox: document.querySelector(`${selector}`),
            spanYears: document.querySelector(`${selector} span[data-value="years"]`),
            spanDays: document.querySelector(`${selector} span[data-value="days"]`),
            spanHours: document.querySelector(`${selector} span[data-value="hours"]`),
            spanMinutes: document.querySelector(`${selector} span[data-value="mins"]`),
            spanSeconds: document.querySelector(`${selector} span[data-value="secs"]`),
        };
   }

    start() {     
        setInterval(() => {
            const deltaTime = Date.now() - this.targetDate;
            this.updateClockface(this.getTimeComponents(deltaTime));          
        }, 1000);
    }

    getTimeComponents(time) {
        const years = String(Math.floor(time / (1000 * 60 * 60 * 24 * 365)));
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24))) - years * 365;
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs, years };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    updateClockface({ days, hours, mins, secs, years }) {
        this.refs.spanYears.textContent = years;
        this.refs.spanDays.textContent = days;
        this.refs.spanHours.textContent = hours;
        this.refs.spanMinutes.textContent = mins;
        this.refs.spanSeconds.textContent = secs;
    }
}

const CountdownTimer = new Timer({
    selector: '#timer-1',
    targetDate: new Date('Oct 30, 2020'),
  });

  CountdownTimer.start();