// selecting elements for showing output
let dd = document.querySelector('#day');
let hh = document.querySelector('#hour');
let mm = document.querySelector('#minute');
let ss = document.querySelector('#second');

// selecting elements for getting input
let input = document.querySelector('input');
let startBtn = document.querySelector('#start');
let resetBtn = document.querySelector('#reset');

let countDown;
let days, hours, minutes, seconds;

// reset timer values
function resetCountdownValues() {
    input.value = '';

    days = '00';
    hours = '00';
    minutes = '00';
    seconds = '00';
}

// display timer values
function displayCountdownValues(days, hours, minutes, seconds) {
    dd.innerHTML = days;
    hh.innerHTML = hours;
    mm.innerHTML = minutes;
    ss.innerHTML = seconds;
}

// calculate and display coutdown
let timeCount = function (val) {
    let eventTime = new Date(val).getTime();
    let curntTime = Date.now();

    // total seconds
    let totalTime = (eventTime - curntTime) / 1000;

    let dayConst = 86400;
    let hourConst = 3600;
    let minuteConst = 60;

    // distribute total seconts to days, hours, minutes and seconds
    days = Math.floor(totalTime / dayConst);
    totalTime = totalTime % dayConst;

    hours = Math.floor(totalTime / hourConst);
    totalTime = totalTime % hourConst;

    minutes = Math.floor(totalTime / minuteConst);
    totalTime = totalTime % minuteConst;

    seconds = Math.floor(totalTime);

    // fix single number input
    if (days < 10) {
        days = '0' + days;
    }

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (totalTime < 0) {
        clearInterval(countDown);
        resetCountdownValues();
    }

    displayCountdownValues(days, hours, minutes, seconds);

}

// check if the timer is running or not
function isTimerRunning(days, hours, minutes, seconds) {
    let dd = Number(days);
    let hh = Number(hours);
    let mm = Number(minutes);
    let ss = Number(seconds);

    if (dd || hh || mm || ss) {
        return true;
    } else {
        return false;
    }
}

startBtn.onclick = () => {
    let val = input.value;
    let timerStatus = isTimerRunning(days, hours, minutes, seconds);

    if (val !== '' && !timerStatus) {
        countDown = setInterval(timeCount, 1000, val);
        resetBtn.removeAttribute('disabled');
    } else if (val !== '' && timerStatus) {
        alert('Timer is running... Please reset first!');
    } else {
        alert('Please set timer values!');
    }
}

resetBtn.onclick = () => {
    clearInterval(countDown);
    resetBtn.setAttribute('disabled', 'true');

    resetCountdownValues();

    displayCountdownValues(days, hours, minutes, seconds);
}