let countdown;
let timerRunning=false;
let timerInterval;

function beep() {
    const audioContext = new AudioContext();
    let oscillators = [];
    let gainNode = audioContext.createGain();
    
    let frequencies = [440, 880, 1320]; // Fundamental + Harmonics (1st, 2nd, 3rd)

    frequencies.forEach(freq => {
        let oscillator = audioContext.createOscillator();
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = "triangle"; // Change to "sawtooth", "triangle" for different textures
        oscillator.connect(gainNode);
        oscillator.start();
        oscillators.push(oscillator);
    });

    gainNode.connect(audioContext.destination);
    
    let now = audioContext.currentTime;

    // Schedule three smooth beeps
    scheduleBeep(gainNode, now);
    scheduleBeep(gainNode, now + .2);
    scheduleBeep(gainNode, now + .4);
    scheduleBeep(gainNode, now + .6, .8);

    // Stop all oscillators after the last beep
    oscillators.forEach(osc => osc.stop(now + 2));
}
function externalBeep(){
    let audio = new Audio("alarm.mp3"); // Ensure "beep.mp3" is in the same folder or adjust the path
    audio.play().catch(error => console.error("Playback failed:", error));
}
function scheduleBeep(gainNode, start, beepTime) {
    let fadeTime = 0.02; // 100ms fade in/out
    if(beepTime == undefined){
        beepTime=.1;
    }

    // Start at 0 volume
    gainNode.gain.setValueAtTime(0, start);

    // Smooth fade in (0 to 0.5 in 100ms)
    gainNode.gain.linearRampToValueAtTime(0.5, start + fadeTime);

    // Hold at 0.5 for the rest of the beep (0.5 seconds total beep time)
    gainNode.gain.setValueAtTime(0.5, start + beepTime - fadeTime);

    // Smooth fade out (0.5 to 0 in 100ms)
    gainNode.gain.linearRampToValueAtTime(0, start + beepTime);
}
function updateTimer() {
    countdown--;
    document.getElementById("timer").textContent=countdown;
    if(countdown<=0){
        timerRunning=false;
        clearInterval(timerInterval);
        document.getElementById("word").textContent="Tap to play!";
        beep();
    }
}

function startTimer() {
    if(timerRunning)return;//prevent multiple timers
    clearWordList();
    timerRunning=true;
    countdown=60;
    document.getElementById("timer").textContent=countdown;
    timerInterval=setInterval(updateTimer,1000)
}