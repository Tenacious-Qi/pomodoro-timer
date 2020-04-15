let minutes = 25
let seconds = 0
let tomatoCount = 0;
let completedSessions = 0;
let timerRunning = false;
let paused = false;
let onBreak = false;
let interval;
let timerEndInterval;
let pausedTime;
let initialTime;

// -- QUERY SELECTORS --  //
const audio = document.querySelector('#alarm');
const timerDisplay = document.querySelector('.time-display')
const start = document.querySelector('.btn-start');
const stop = document.querySelector('.btn-stop');
const reset = document.querySelector('.btn-reset');
const tomato = document.querySelector('.btn-tomato');
const shortBreak = document.querySelector('.btn-break-short');
const longBreak = document.querySelector('.btn-break-long');
const tomatoDisplay = document.querySelector('.tomato-display');
const sessionDisplay = document.querySelector('.session-display');

// -- QUERY SELECTORS FOR CHANGING TIMER SETTINGS -- //
const tomatoSlider = document.querySelector('.tomato-slider');
const increaseShortBreakTime = document.querySelector('.btn-short-break-increase');
const decreaseShortBreakTime = document.querySelector('.btn-short-break-decrease')
const increaseLongBreakTime = document.querySelector('.btn-long-break-increase');
const decreaseLongBreakTime = document.querySelector('.btn-long-break-decrease');
const shortBreakValue = document.querySelector('.short-break-value');
const longBreakValue = document.querySelector('.long-break-value');
const resetCount = document.querySelector('.reset-count');
let inputValue = document.querySelector('.input-value');

timerDisplay.textContent = minutes + `:0${seconds}`
initialTime = timerDisplay.textContent.split(':');

audio.volume = 0.3

// -- EVENT LISTENERS -- //
shortBreak.addEventListener('click', function() {
  minutes = parseInt(shortBreakValue.textContent);
  takeBreak();
  padMinutesAndSeconds();
  shortBreak.classList.add('active');
  longBreak.classList.remove('active');
  tomato.classList.remove('active');
});

longBreak.addEventListener('click', function(){
  minutes = parseInt(longBreakValue.textContent);
  takeBreak();
  padMinutesAndSeconds();
  longBreak.classList.add('active');
  shortBreak.classList.remove('active');
  tomato.classList.remove('active');
});

tomato.addEventListener('click', function() {
  resetTimer();
  timer();
  timerRunning = true; 
  padMinutesAndSeconds();
  tomato.classList.add('active');
  shortBreak.classList.remove('active');
  longBreak.classList.remove('active');
});

stop.addEventListener('click', function() {
  clearInterval(interval);
  timerRunning = false;
  paused = true;
  //get time at moment timer is stopped.
  pausedTime = timerDisplay.textContent.split(':')
});

start.addEventListener('click', function() {
  if (timerRunning === false) {timer();}
  timerRunning = true;
  tomato.classList.add('active');
});

tomatoSlider.addEventListener('change', updateTimer);
tomatoSlider.addEventListener('mousemove', function() {
  inputValue.textContent = `${this.value} min`;
});

// -- RESET EVENT LISTENERS -- //
reset.addEventListener('click', resetTimer);
resetCount.addEventListener('click', resetTomatoesAndSessions)

// -- EVENT LISTENERS TO HANDLE CHANGES TO BREAK DURATION. -- //
increaseShortBreakTime.addEventListener('click', function() {
  if (parseInt(shortBreakValue.textContent) < 60) { // limit break time to 1 hour
    shortBreakValue.textContent = parseInt(shortBreakValue.textContent) + 1;
  }
});

decreaseShortBreakTime.addEventListener('click', function() {
  if (parseInt(shortBreakValue.textContent) > 1) { // prevent negative break times
    shortBreakValue.textContent = parseInt(shortBreakValue.textContent) - 1;
  }
});

increaseLongBreakTime.addEventListener('click', function() {
  if (parseInt(longBreakValue.textContent) < 60) { // limit break time to 1 hour
    longBreakValue.textContent = parseInt(longBreakValue.textContent) + 1;
  }
});

decreaseLongBreakTime.addEventListener('click', function() {
  if (parseInt(longBreakValue.textContent) > 1) { // prevent negative break times
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
  tomato.classList.remove('active');
}

function takeBreak() {
  onBreak = true;
  seconds = 0;
  paused = false;
  timerRunning = true;
  clearInterval(interval);
  timerDisplay.textContent = minutes + `:0${seconds}`
  delayTimer(); // so timerDisplay shows 5:00 instead of 4:59 on click.
}

function delayTimer() {
  const delayedTimer = setInterval(function() {
    timer()
    clearInterval(delayedTimer)
  }, 100);
}

function resetTimer() {
  timerRunning = false;
  paused = false;
  onBreak = false;
  clearInterval(interval);
  minutes = parseInt(initialTime[0]);
  seconds = parseInt(initialTime[1]);
  timerDisplay.textContent = minutes + `:0${seconds}`
  padMinutesAndSeconds();
  tomato.classList.add('active');
  longBreak.classList.remove('active');
  shortBreak.classList.remove('active');
  document.title = 'TomatoTimer';
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

function countNumberofTomatoes() {
  if (onBreak === false) {
    tomatoCount = tomatoCount + 1;
    completedSessions = tomatoCount / 4;
    displayTomatoAndSessionCount();
  }
}

function resetTomatoesAndSessions() {
  tomatoCount = 0;
  completedSessions = 0;
  displayTomatoAndSessionCount();
}

function displayTomatoAndSessionCount() {
  tomatoDisplay.innerHTML = "tomatoes" + "<br />" + `${tomatoCount}`;
  sessionDisplay.innerHTML = "sessions" + "<br />" + `${completedSessions}`;
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
    document.title = '(' + timerDisplay.textContent + ')' + ' TomatoTimer';

    seconds = seconds - 1;

    if (seconds < 0) {
      seconds = seconds + 60
      minutes = minutes - 1
    }
    
    if (minutes < 0) {
      countNumberofTomatoes(); 
      clearInterval(interval)
      audio.play();
      timerDisplay.textContent = "Time\'s up!";
      document.title = 'BUZZZZZzZZzZZZZzZZZ!';

      //reset timer after displaying "Time's up!" for 5 seconds
      timerEndInterval = setInterval(function() {
        resetTimer();
        clearInterval(timerEndInterval);
      }, 5000);
    }
  }, 1000);
}