const audio = document.querySelector("#custom-audio-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
const muteButton = document.querySelector("mute-button");
const muteImg = document.querySelector("#mute-img");
const loopButton = document.querySelector("#loop-button");
const halfSpeed = document.querySelector("#half-speed-button");
const fasterSpeed = document.querySelector("#faster-speed-button");
const fastestSpeed = document.querySelector("#fastest-speed-button");
const defaultSpeed = document.querySelector("#default-speed-button");
const audioSpeed = document.querySelector(".dj-buttons");
const currentTimeDisplay = document.querySelector("#current-time");
const totalTimeDisplay = document.querySelector("#total-time");
const speedSlider = document.querySelector("#speed-slider");
const speedDisplay = document.querySelector("#speed-display");
const audioGif = document.querySelector("#audio-gif");
const volumeSlider = document.querySelector("#volume-slider");
const volumeDisplay = document.querySelector("#volume-display");

audio.removeAttribute("controls");

// formatting time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// update current time displayed
audio.addEventListener("timeupdate", () => {
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  totalTimeDisplay.textContent = formatTime(audio.duration);
});

// Play/Pause button
function togglePlayPause() {
  if (audio.paused || audio.ended) {
    audio.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    audioGif.style.opacity = 100;
  } else {
    audio.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
    audioGif.style.opacity = 0;
  }
}

// Progress bar function
audio.addEventListener("timeupdate", updateProgressBar);
function updateProgressBar() {
  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = value + "%";
}

// mute button function
function toggleMute() {
  if (audio.muted) {
    audio.muted = false;
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
    if (!audio.paused) {
      audioGif.style.opacity = 100;
    }
  } else {
    audio.muted = true;
    muteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
    audioGif.style.opacity = 0;
  }
}

// Loop button function
function toggleLoop() {
  if (audio.loop) {
    audio.loop = false;
    loopButton.style.backgroundColor = ""; // Reset to default background
  } else {
    audio.loop = true;
    loopButton.style.backgroundColor = "cyan";
  }
}

// playback speed control functions

function toggle50Speed() {
  if (audio.playbackRate !== 0.5) {
    audio.playbackRate = 0.5;
    halfSpeed.style.backgroundColor = "cyan";
    fasterSpeed.style.backgroundColor = "white";
    fastestSpeed.style.backgroundColor = "white";
    defaultSpeed.style.backgroundColor = "white";
    speedSlider.value = 0.5;
    speedDisplay.textContent = "0.5x";
  } else {
    audio.playbackRate = 1;
    halfSpeed.style.backgroundColor = "";
    defaultSpeed.style.backgroundColor = "cyan"; // Changed from lime to cyan
    speedSlider.value = 1;
    speedDisplay.textContent = "1x";
  }
}

function toggle150Speed() {
  if (audio.playbackRate !== 1.5) {
    audio.playbackRate = 1.5;
    fasterSpeed.style.backgroundColor = "cyan"; // Changed from lime to cyan
    halfSpeed.style.backgroundColor = "white";
    fastestSpeed.style.backgroundColor = "white";
    defaultSpeed.style.backgroundColor = "white";
    speedSlider.value = 1.5;
    speedDisplay.textContent = "1.5x";
  } else {
    audio.playbackRate = 1;
    fasterSpeed.style.backgroundColor = "";
    defaultSpeed.style.backgroundColor = "cyan"; // Changed from lime to cyan
    speedSlider.value = 1;
    speedDisplay.textContent = "1x";
  }
}

function toggle200Speed() {
  if (audio.playbackRate !== 2) {
    audio.playbackRate = 2;
    fasterSpeed.style.backgroundColor = "white";
    halfSpeed.style.backgroundColor = "white";
    defaultSpeed.style.backgroundColor = "white";
    fastestSpeed.style.backgroundColor = "cyan"; // Changed from lime to cyan
    speedSlider.value = 2;
    speedDisplay.textContent = "2x";
  } else {
    audio.playbackRate = 1;
    fastestSpeed.style.backgroundColor = "";
    defaultSpeed.style.backgroundColor = "cyan"; // Changed from lime to cyan
    speedSlider.value = 1;
    speedDisplay.textContent = "1x";
  }
}

function toggle100Speed() {
  if (audio.playbackRate !== 1) {
    audio.playbackRate = 1;
    defaultSpeed.style.backgroundColor = "cyan"; // Changed from lime to cyan
    fasterSpeed.style.backgroundColor = "white";
    halfSpeed.style.backgroundColor = "white";
    fastestSpeed.style.backgroundColor = "white";
    speedSlider.value = 1;
    speedDisplay.textContent = "1x";
  }
}
// change playback speed when slider is moved
speedSlider.addEventListener("input", () => {
  const speed = speedSlider.value;
  audio.playbackRate = speed;
  speedDisplay.textContent = `${speed}x`;
  // remove any highlights on previous selected playback speed buttons
  defaultSpeed.style.backgroundColor = "white";
  fasterSpeed.style.backgroundColor = "white";
  halfSpeed.style.backgroundColor = "white";
  fastestSpeed.style.backgroundColor = "white";
});

// let  user jump to different parts of the track
function chapter1() {
  audio.currentTime = 90.0;
}
function chapter2() {
  audio.currentTime = 180.0;
}
function chapter3() {
  audio.currentTime = 270.0;
}
function chapter4() {
  audio.currentTime = 360.0;
}
function chapter5() {
  audio.currentTime = 450.0;
}

// skip forward/back functions
function jumpBack() {
  audio.currentTime -= 10;
}
function jumpForward() {
  audio.currentTime += 10;
}

// update volume whenever slider is adjusted using event listener
volumeSlider.addEventListener("input", () => {
  const volume = volumeSlider.value;
  audio.volume = volume;
  volumeDisplay.textContent = `${Math.round(volume * 100)}%`; // display the volume as it is changed
});
