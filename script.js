let minutes = 25
let seconds = 0
let timerRunning = false;
let paused = false;
let interval;


// -- QUERY SELECTORS --  //
const timerDisplay = document.querySelector('.time-display')
const tomato = document.querySelector('.btn-tomato');
const start = document.querySelector('.btn-start');
const stop = document.querySelector('.btn-stop');
const reset = document.querySelector('.btn-reset');
const shortBreak = document.querySelector('.btn-break-short');
const longBreak = document.querySelector('.btn-break-long');

timerDisplay.textContent = minutes + `:0${seconds}`
initialTime = timerDisplay.textContent.split(':')

// -- EVENT LISTENERS -- //
tomato.addEventListener('click', function() {
  timerRunning = true; 
  if (minutes < 0) {
    minutes = 25;
    seconds = 0;
    timer();

  } else {
    timer();
  }
});

start.addEventListener('click', function() {
  if (timerRunning === false) {
    timer();
  }
  timerRunning = true;
});

let pausedTime;
stop.addEventListener('click', function() {
  clearInterval(interval);
  timerRunning = false;
  paused = true;
  //get time at moment timer is stopped. split into array. arr[0] = minutes, arr[1] = seconds
  pausedTime = timerDisplay.textContent.split(':')
  
});

let resetClicked = false;
function resetTimer() {
  reset.addEventListener('click', function() {
    timerRunning = false;
    paused = false;
    clearInterval(interval);
    minutes = parseInt(initialTime[0]);
    seconds = parseInt(initialTime[1]);
    timerDisplay.textContent = minutes + `:0${seconds}`
  });
}


// -- FUNCTIONS -- //
function timer() {

  minutes = minutes - 1;
  seconds = 59;
    if (paused === true) {
      minutes = parseInt(pausedTime[0]);
      seconds = parseInt(pausedTime[1]);
    }

  //setInterval Function
  interval = setInterval(function() {
  timerDisplay.textContent = minutes + `:${seconds}`;
    if (seconds < 10) {
      timerDisplay.textContent = minutes + `:0${seconds}`
    }
      
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







