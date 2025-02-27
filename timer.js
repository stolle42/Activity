let countdown;
let timerRunning=false;
let timerInterval;

function updateTimer() {
    countdown--;
    document.getElementById("timer").textContent=countdown;
    if(countdown<=0){
        timerRunning=false;
        clearInterval(timerInterval);
        document.getElementById("word").textContent="Tap to play";
    }
}

function startTimer() {
    if(timerRunning)return;//prevent multiple timers
    clearWordList();
    timerRunning=true;
    countdown=6;
    document.getElementById("timer").textContent=countdown;
    timerInterval=setInterval(updateTimer,1000)
}