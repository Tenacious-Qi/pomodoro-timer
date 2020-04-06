let minutes = 25
let seconds = 0
let timerRunning = false;
let paused = false;
let interval;
let timerEndInterval;
let pausedTime;
let initialTime;
let shortBreakMinutes;
let longBreakMinutes;

// -- QUERY SELECTORS --  //
const audio = document.querySelector('#alarm');
const timerDisplay = document.querySelector('.time-display')
const tomato = document.querySelector('.btn-tomato');
const start = document.querySelector('.btn-start');
const stop = document.querySelector('.btn-stop');
const reset = document.querySelector('.btn-reset');
const shortBreak = document.querySelector('.btn-break-short');
const longBreak = document.querySelector('.btn-break-long');

// query selectors for changing timer settings
const tomatoSlider = document.querySelector('.tomato-slider');
const increaseShortBreakTime = document.querySelector('.btn-short-break-increase');
const decreaseShortBreakTime = document.querySelector('.btn-short-break-decrease')
const increaseLongBreakTime = document.querySelector('.btn-long-break-increase');
const decreaseLongBreakTime = document.querySelector('.btn-long-break-decrease');
let inputValue = document.querySelector('.input-value');
let shortBreakValue = document.querySelector('.short-break-value');
let longBreakValue = document.querySelector('.long-break-value');


timerDisplay.textContent = minutes + `:0${seconds}`
initialTime = timerDisplay.textContent.split(':');

// -- EVENT LISTENERS -- //
shortBreak.addEventListener('click', function() {
  minutes = parseInt(shortBreakValue.textContent);
  takeBreak();
  padMinutesAndSeconds();
});

longBreak.addEventListener('click', function(){
  minutes = parseInt(longBreakValue.textContent);
  takeBreak();
  padMinutesAndSeconds();
});


tomato.addEventListener('click', function() {
  resetTimer();
  timer();
  timerRunning = true; 
  padMinutesAndSeconds();
});

stop.addEventListener('click', function() {
  clearInterval(interval);
  timerRunning = false;
  paused = true;
  //get time at moment timer is stopped.
  pausedTime = timerDisplay.textContent.split(':')
});

start.addEventListener('click', function() {
  if (timerRunning === false) {
    timer();
  }
  timerRunning = true;
});

reset.addEventListener('click', resetTimer);

tomatoSlider.addEventListener('change', updateTimer);
tomatoSlider.addEventListener('mousemove', function() {
  inputValue.textContent = `${this.value} min`;
});

// EVENT LISTENERS TO HANDLE CHANGES TO BREAK DURATION. 
// add or subtract a minute depending on which button is clicked
increaseShortBreakTime.addEventListener('click', function() {
  shortBreakValue.textContent = parseInt(shortBreakValue.textContent) + 1;
});

decreaseShortBreakTime.addEventListener('click', function() {
  if (parseInt(shortBreakValue.textContent) > 1) {
    shortBreakValue.textContent = parseInt(shortBreakValue.textContent) - 1;
  }
});

increaseLongBreakTime.addEventListener('click', function() {
  longBreakValue.textContent = parseInt(longBreakValue.textContent) + 1;
});

decreaseLongBreakTime.addEventListener('click', function() {
  if (parseInt(longBreakValue.textContent) > 1) {
    longBreakValue.textContent = parseInt(longBreakValue.textContent) - 1;
  }
});

// -- FUNCTIONS -- //

function updateTimer() {
  minutes = this.value;
  initialTime[0] = this.value;
  initialTime[1] = 0
  pausedTime = timerDisplay.textContent.split(':')
  pausedTime[0] = this.value;
  pausedTime[1] = 0
  seconds = 0;
  timerDisplay.textContent = this.value + `:0${seconds}`
  timerRunning = false;
  clearInterval(interval);
  padMinutesAndSeconds();
}

function takeBreak() {
  seconds = 0;
  paused = false;
  timerRunning = true;
  clearInterval(interval);
  timerDisplay.textContent = minutes + `:0${seconds}`
  timer();
}

function resetTimer() {
  timerRunning = false;
  paused = false;
  clearInterval(interval);
  minutes = parseInt(initialTime[0]);
  seconds = parseInt(initialTime[1]);
  timerDisplay.textContent = minutes + `:0${seconds}`
  timerDisplay.style.color = "#dfe6e9"
  padMinutesAndSeconds();
}

// pad minutes or seconds with zeros accordingly
function padMinutesAndSeconds() {
  if (minutes < 10 || seconds < 10) {

    if (seconds < 10 && minutes < 10) {
      timerDisplay.textContent = `0${minutes}` + `:0${seconds}`
    }
    if (minutes < 10 && seconds > 9) {
      timerDisplay.textContent = `0${minutes}:` + seconds;
    }
    if (seconds < 10 && minutes > 9) {
      timerDisplay.textContent = `${minutes}:` + `0${seconds}`;
    }
  }
}

function timer() {
  minutes = minutes - 1;
  seconds = 59;
    // if `STOP` is clicked, then start timer where it left off
    if (paused === true) {
      minutes = parseInt(pausedTime[0]);
      seconds = parseInt(pausedTime[1]);
    }

  //setInterval Function
  interval = setInterval(function() {
  timerDisplay.textContent = minutes + `:${seconds}`;
    
    padMinutesAndSeconds();
    seconds = seconds - 1;
    if (seconds <= 0) {
      seconds = seconds + 60
      minutes = minutes - 1
    }

    if (minutes < 0) {
      clearInterval(interval)
      audio.play();
      timerDisplay.textContent = "Time\'s up!";
      timerDisplay.style.color = "#2d3436"
      //reset timer after displaying "Time's up!"
      timerEndInterval = setInterval(function() {
        resetTimer();
        clearInterval(timerEndInterval);
      }, 10000);
    }
  }, 1000);
}







