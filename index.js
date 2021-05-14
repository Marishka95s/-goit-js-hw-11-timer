const spans = document.querySelectorAll('span[data-value]');
const spanDays = spans[0];
const spanHours = spans[1];
const spanMinutes = spans[2];
const spanSeconds = spans[3];

class Timer {
    constructor({ onTick }) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;

        this.start();
        // this.init();
    }

    // init() {
    //     const time = this.getTimeComponents(0);
    //     this.onTick(time);
    // }

    start() {
        if (this.isActive) {
            return;
        }

        const targetDate = new Date('Jul 17, 2021').getTime();
        this.isActive = true;        

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = targetDate - currentTime;
            console.log(deltaTime)
            const time = this.getTimeComponents(deltaTime);
            console.log(time)
            updateClockface(time);
            // this.onTick(time);
        }, 1000);
    }
    stop() {
        clearTimeout(this.intervalId);
        this.isActive = false;
    }

    getTimeComponents(time) {
        const days = String(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return {days, hours, mins, secs};
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const CountdownTimer = new Timer({
    selector: '#timer-1',

    // onTick: updateClockface,
  });

  function updateClockface({ days, hours, mins, secs }) {
    spanDays.textContent = `${days}`;
    spanHours.textContent = `${hours}`;
    spanMinutes.textContent = `${mins}`;
    spanSeconds.textContent = `${secs}`;
  }



