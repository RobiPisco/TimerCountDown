class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener("click", this.start);
        this.pauseButton.addEventListener("click", this.pause);
    }
    start = () => {                                                     //the goal of the start() method is to start the timer
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();                                                    //here I'm starting right away the timer
        this.interval = setInterval(this.tick, 50);                     //invoking tick every second
    };

    pause = () => {                                                     //the goal of the pause() method is to pause the timer when the user click the pause button
        clearInterval(this.interval);
    };

    tick = () => {                                                      //the goal of the tick() method is to update the timer and the text(number)
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - 0.05;
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {                                            //the goal is to change the time of the imput and passing the value in the variable to timeRemaining
        this.durationInput.value = time.toFixed(2);                                 //and wherever is the value of timeRemaining - 1; will be passed in (time) .toFixed(2) will tell the program to count only 2 decimal number
    }
}