let minutes = 25
let seconds = 0
let timerRunning = false;
let paused = false;
let interval;
let pausedTime;
let initialTime;


// -- QUERY SELECTORS --  //
const timerDisplay = document.querySelector('.time-display')
const tomato = document.querySelector('.btn-tomato');
const start = document.querySelector('.btn-start');
const stop = document.querySelector('.btn-stop');
const reset = document.querySelector('.btn-reset');
const shortBreak = document.querySelector('.btn-break-short');
const longBreak = document.querySelector('.btn-break-long');
const tomatoSlider = document.querySelector('.tomato-slider');
let inputValue = document.querySelector('.input-value');

timerDisplay.textContent = minutes + `:0${seconds}`
initialTime = timerDisplay.textContent.split(':');

// -- EVENT LISTENERS -- //
shortBreak.addEventListener('click', function() {
  minutes = 5;
  takeBreak();
  padMinutesAndSeconds();
});

longBreak.addEventListener('click', function(){
  minutes = 10;
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
  //get time at moment timer is stopped. split into array. arr[0] = minutes, arr[1] = seconds
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
  inputValue.textContent = `${this.value}`;
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
  clearInterval(interval);
  timerRunning = false;
  padMinutesAndSeconds();
}

function takeBreak() {
  seconds = 0;
  paused = false;
  clearInterval(interval);
  timerDisplay.textContent = minutes + `:0${seconds}`
  timerRunning = true;
  timer();
}

function resetTimer() {
  timerRunning = false;
  paused = false;
  clearInterval(interval);
  minutes = parseInt(initialTime[0]);
  seconds = parseInt(initialTime[1]);
  timerDisplay.textContent = minutes + `:0${seconds}`
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
    // if `stop` is clicked, then start timer where it left off
    if (paused === true) {
      minutes = parseInt(pausedTime[0]);
      seconds = parseInt(pausedTime[1]);
    }

  //setInterval Function
  interval = setInterval(function() {
  timerDisplay.textContent = minutes + `:${seconds}`;

    padMinutesAndSeconds();
      
    seconds = seconds - 1;
    if (seconds < 0) {
      seconds = seconds + 60
      minutes = minutes - 1
    }
    if (minutes < 0) {
      clearInterval(interval)
      alert('Time is up!')
    }
  }, 1000);
}







