class Timer {
    constructor({ selector, targetDate }) {
        this.targetDate = targetDate.getTime();
        this.selector = selector;

        this.refs = {
            timerBox: document.querySelector(`${selector}`),
            spanDays: document.querySelector(`${selector} span[data-value="days"]`),
            spanHours: document.querySelector(`${selector} span[data-value="hours"]`),
            spanMinutes: document.querySelector(`${selector} span[data-value="mins"]`),
            spanSeconds: document.querySelector(`${selector} span[data-value="secs"]`),
        };
   }

    start() {     
        setInterval(() => {
            const deltaTime = this.targetDate - Date.now();
            this.updateClockface(this.getTimeComponents(deltaTime));          
        }, 1000);
    }

    getTimeComponents(time) {
        const days = String(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    updateClockface({ days, hours, mins, secs }) {
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




