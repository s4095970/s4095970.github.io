const turtle = document.getElementById("turtle");
const shark = document.getElementById("shark");
const totalFrames = 10;
const sharkFrames = 6;
const bgBorder = document.getElementById("bg-border");
const bgContainer = document.getElementById("bg-container");
const bgContainerB = document.getElementById("bg-containerB");
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
let isSideView = true; // transition guard
let sideView = true; // actual view state

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
  } else {
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
    bgContainer.style.backgroundPositionY = "0px";
    bgContainer.style.top = "0";
    bgContainer.style.bottom = "auto";
  } else {
    bgBorder.style.left = "50%";
    bgBorder.style.top = "10%";
    bgBorder.style.transform = "translate(-50%, 0)";
    bgContainer.style.top = "auto";
    bgContainer.style.bottom = "0";
    bgContainer.style.backgroundPositionY = "100%";
  }
}

function turtleRotate() {
  if (turtleeating == true) {
    turtle.style.transform = "rotate(30deg)";
  } else if (
    verticalbg === false &&
    window.scrollY > window.innerHeight * 11.9 &&
    window.scrollY < window.innerHeight * 18
  ) {
    turtle.style.transform = "translateY(20vh)";
  } else {
    turtle.style.transform = "rotate(0deg)";
  }
}

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

function TransitionView() {
  sideView = !sideView;

  // Fade out turtles and backgrounds together
  shark.style.opacity = "0";
  turtle.style.opacity = "0";
  turtleTopView.style.opacity = "0";
  bgContainer.style.opacity = "0";
  bgContainerB.style.opacity = "0";

  setTimeout(() => {
    shark.style.opacity = "1";
    if (sideView) {
      bgContainer.style.display = "block";
      bgContainerB.style.display = "none";
      turtle.style.display = "block";
      turtleTopView.style.display = "none";
      // Fade in both at the same time, but after display is set
      bgContainer.style.opacity = "1";
      requestAnimationFrame(() => {
        turtle.style.opacity = "1";
      });
    } else {
      bgContainer.style.display = "none";
      bgContainerB.style.display = "block";
      turtle.style.display = "none";
      turtleTopView.style.display = "block";
      bgContainerB.style.opacity = "1";
      requestAnimationFrame(() => {
        turtleTopView.style.opacity = "1";
      });
    }
  }, 500);
}

window.addEventListener("scroll", () => {
  if (sideView) {
    // Background 1: scroll horizontally
    bgContainer.style.backgroundPosition = `-${window.scrollY}px 0px`;
  } else if (!sideView) {
    // Background 2: scroll vertically
    bgContainerB.style.backgroundPosition = `0px -${window.scrollY}px`;
  }

  // Animation intervals
  if (!isScrolling) {
    isScrolling = true;
    animationInterval = setInterval(nextFrame, 150);
    sharkAnimationInterval = setInterval(sharkNextFrame, 200);
    turtleTopAnimationInterval = setInterval(turtleTopNextFrame, 150);
  }

  // Scroll-triggered states
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
      isSideView = true;
    }
  } else if (
    window.scrollY > window.innerHeight * 17.9 &&
    window.scrollY < window.innerHeight * 30
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
      isSideView = true;
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
