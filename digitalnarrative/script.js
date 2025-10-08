const turtle = document.getElementById("turtle");
const shark = document.getElementById("shark");
const totalFrames = 10;
const sharkFrames = 6;
const bgBorder = document.getElementById("bg-border");
const bgContainer = document.getElementById("bg-container");
const turtleTopView = document.getElementById("turtle-top");
const turtleTopFrames = 6;

let turtleTopFrame = 1;
let turtleTopAnimationInterval;
let currentFrame = 1;
let sharkFrame = 1;
let isScrolling = false;
let animationInterval;
let sharkAnimationInterval;
let verticalbg = true;
let turtleeating = false;
let isSideView = true;

const bg = document.getElementById("bg-container");
const mainText = document.getElementById("main-text");

// preload
for (let i = 1; i <= totalFrames; i++) {
  const img = new Image();
  img.src = `TurtleSide${i}.png`;
}

for (let i = 1; i <= sharkFrames; i++) {
  const img = new Image();
  img.src = `shark${i}.png`;
}

for (let i = 1; i <= turtleTopFrames; i++) {
  const img = new Image();
  img.src = `TurtleTopView${i}.png`;
}

function nextFrame() {
  currentFrame++;
  if (currentFrame > totalFrames) currentFrame = 1;
  turtle.src = `TurtleSide${currentFrame}.png`;
}

function sharkNextFrame() {
  sharkFrame++;
  if (sharkFrame > sharkFrames) sharkFrame = 1;
  shark.src = `shark${sharkFrame}.png`;
}

function turtleTopNextFrame() {
  turtleTopFrame++;
  if (turtleTopFrame > turtleTopFrames) turtleTopFrame = 1;
  turtleTopView.src = `TurtleTopView${turtleTopFrame}.png`;
}

function textPosition() {
  if (verticalbg == true) {
    const rect = bgBorder.getBoundingClientRect();
    const rightEdge = rect.right;
    const viewportWidth = window.innerWidth;
    const midpoint = rightEdge + (viewportWidth - rightEdge) / 2;
    mainText.style.left = `${midpoint}px`;
    mainText.style.top = "40%";
    mainText.style.transform = "translate(-50%, -50%)";
  } else if (verticalbg == false) {
    const rect = bgBorder.getBoundingClientRect();
    const midpoint = rect.left + rect.width / 2;
    mainText.style.left = `${midpoint}px`;
    mainText.style.top = `${rect.bottom + 100}px`;
    mainText.style.transform = "translate(-50%, 0)";
  }
}

function bgposition() {
  if (verticalbg == true) {
    bgBorder.style.top = "50%";
    bgBorder.style.left = "5%";
    bgBorder.style.transform = "translate(0%, -50%)";
    bg.style.backgroundPositionY = "0px";
    bg.style.top = "0";
    bg.style.bottom = "auto";
  } else if (verticalbg == false) {
    bgBorder.style.left = "50%";
    bgBorder.style.top = "10%";
    bgBorder.style.transform = "translate(-50%, 0)";
    bg.style.top = "auto";
    bg.style.bottom = "0";
    bg.style.backgroundPositionY = "100%";
  }
}

function turtleRotate() {
  if (turtleeating == true) {
    // Combine rotate and translateY if both are needed
    turtle.style.transform = "rotate(30deg)";
  } else if (
    verticalbg === false &&
    window.scrollY > window.innerHeight * 11.9 &&
    window.scrollY < window.innerHeight * 18
  ) {
    // Only translateY when in this scroll range
    turtle.style.transform = "translateY(20vh)";
  } else {
    turtle.style.transform = "rotate(0deg)";
  }
}

window.addEventListener("scroll", () => {
  if (!isScrolling) {
    isScrolling = true;
    animationInterval = setInterval(nextFrame, 150);
    sharkAnimationInterval = setInterval(sharkNextFrame, 200); // swim speed
    turtleTopAnimationInterval = setInterval(turtleTopNextFrame, 150);
  }

  // Repeating bg
  bg.style.backgroundPositionX = `-${window.scrollY}px`;

  if (
    window.scrollY > window.innerHeight * 2.9 &&
    window.scrollY < window.innerHeight * 6
  ) {
    bgBorder.style.width = "30vw";
    bgBorder.style.height = "80vh";
    mainText.textContent = "Sea turtles can survive upwards of 100 years";
    mainText.style.fontSize = "3rem";
    verticalbg = true;
    turtleeating = false;
  } else if (
    window.scrollY > window.innerHeight * 5.9 &&
    window.scrollY < window.innerHeight * 9
  ) {
    bgBorder.style.width = "80vw";
    bgBorder.style.height = "40vh";
    mainText.textContent =
      "Much of this time is spent in and around coral reefs";
    mainText.style.fontSize = "3rem";
    verticalbg = false;
    turtleeating = false;
  } else if (
    window.scrollY > window.innerHeight * 8.9 &&
    window.scrollY < window.innerHeight * 12
  ) {
    bgBorder.style.width = "80vw";
    bgBorder.style.height = "40vh";
    mainText.textContent =
      "They rely on reefs for food, aiding both the corals and themselves";
    mainText.style.fontSize = "3rem";
    verticalbg = false;
    turtleeating = true;
  } else if (
    window.scrollY > window.innerHeight * 11.9 &&
    window.scrollY < window.innerHeight * 18
  ) {
    bgBorder.style.width = "80vw";
    bgBorder.style.height = "60vh";
    mainText.textContent =
      "The reefs then provide cover from natural predators";
    mainText.style.fontSize = "3rem";
    verticalbg = false;
    turtleeating = false;
    if (!isSideView) {
      TransitionView();
      isSideView = !isSideView;
    }
  } else if (
    window.scrollY > window.innerHeight * 17.9 &&
    window.scrollY < window.innerHeight * 21
  ) {
    if (isSideView) {
      TransitionView();
      isSideView = false;
    }
    mainText.textContent = "This is a top down view";
  } else {
    bgBorder.style.width = "50vw";
    bgBorder.style.height = "80vh";
    mainText.textContent = "80 Years";
    mainText.style.fontSize = "5rem";
    verticalbg = true;
    turtleeating = false;
    turtle.style.transform = "rotate(0deg)";
    if (!isSideView) {
      TransitionView();
      isSideView = !isSideView;
    }
  }
  sharkUpdate();
  textPosition();
  bgposition();
  turtleRotate();

  clearTimeout(window.scrollTimeout);
  window.scrollTimeout = setTimeout(() => {
    isScrolling = false;
    clearInterval(animationInterval);
    clearInterval(sharkAnimationInterval);
    clearInterval(turtleTopAnimationInterval);
  }, 150);
});

function sharkUpdate() {
  if (
    window.scrollY > window.innerHeight * 11.9 &&
    window.scrollY < window.innerHeight * 18
  ) {
    shark.style.display = "block";
    const start = window.innerHeight * 11.9;
    const end = window.innerHeight * 17;
    const progress = (window.scrollY - start) / (end - start);
    shark.style.position = "absolute";
    shark.style.left = `calc(${progress * 100}% - ${shark.width}px)`;
    shark.style.top = "50%";
    shark.style.transform = "translateY(-50%)";
  } else {
    shark.style.display = "none";
  }
}

let sideView = true;
function TransitionView() {
  sideView = !sideView;
  if (sideView == true) {
    bgContainer.style.opacity = "1";
    bgContainer.style.backgroundImage = 'url("Background1.gif")';
    turtle.style.opacity = "1";
    turtleTopView.style.opacity = "0";
    // Optionally, hide after fade out
    setTimeout(() => {
      turtle.style.display = "block";
      turtleTopView.style.display = "none";
    }, 500);
  } else {
    bgContainer.style.opacity = "1";
    bgContainer.style.backgroundImage = 'url("Background2.png")';
    turtle.style.opacity = "0";
    turtleTopView.style.opacity = "1";
    setTimeout(() => {
      turtle.style.display = "none";
      turtleTopView.style.display = "block";
    }, 500);
  }
}

window.addEventListener("resize", () => {
  bgposition();
  textPosition();
  turtleRotate();
});

window.addEventListener("DOMContentLoaded", () => {
  textPosition();
  bgposition();
  turtleRotate();
});
