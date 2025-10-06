const turtle = document.getElementById("turtle");
const totalFrames = 10;
const bgBorder = document.getElementById("bg-border");
const bgContainer = document.getElementById("bg-container");
let currentFrame = 1;
let isScrolling = false;
let animationInterval;
let verticalbg = true;
let turtleeating = false;

const bg = document.getElementById("bg-container");
const mainText = document.getElementById("main-text");

// preload
for (let i = 1; i <= totalFrames; i++) {
  const img = new Image();
  img.src = `TurtleSide${i}.png`;
}

function nextFrame() {
  currentFrame++;
  if (currentFrame > totalFrames) currentFrame = 1;
  turtle.src = `TurtleSide${currentFrame}.png`;
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
    window.scrollY < window.innerHeight * 15
  ) {
    // Only translateY when in this scroll range
    turtle.style.transform = "translateY(-50vh)";
  } else {
    turtle.style.transform = "rotate(0deg)";
  }
}

window.addEventListener("scroll", () => {
  if (!isScrolling) {
    isScrolling = true;
    animationInterval = setInterval(nextFrame, 150); // swim speed
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
    window.scrollY < window.innerHeight * 15
  ) {
    bgBorder.style.width = "80vw";
    bgBorder.style.height = "60vh";
    mainText.textContent =
      "The reefs then provide cover from natural predators";
    mainText.style.fontSize = "3rem";
    verticalbg = false;
    turtleeating = false;
  } else {
    bgBorder.style.width = "50vw";
    bgBorder.style.height = "80vh";
    mainText.textContent = "80 Years";
    mainText.style.fontSize = "5rem";
    verticalbg = true;
    turtleeating = false;
    turtle.style.transform = "rotate(0deg)";
  }

  textPosition();
  bgposition();
  turtleRotate();

  clearTimeout(window.scrollTimeout);
  window.scrollTimeout = setTimeout(() => {
    isScrolling = false;
    clearInterval(animationInterval);
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
