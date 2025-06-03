const menu = document.querySelector(".menu");
const food = document.querySelector(".food");
const game = document.querySelector(".game");
const mask = document.querySelector(".mask");

// Fish cursor function. Updates the image to the cursor position on each mouse move.
// Adds context to the game instead of using just the cursor
const fishCursor = document.getElementById("fish-cursor");
document.addEventListener("mousemove", function (e) {
  // Gets mouse location with clintX/Y, then centres it by dividing the width/height in half.
  fishCursor.style.left = e.clientX - fishCursor.width / 2 + "px";
  fishCursor.style.top = e.clientY - fishCursor.height / 2 + "px";
});

// Cursor trail functionality. Gives more emphasis on the hover interaction as the user moves their mouse.
const spread = 20;
const trailColour = "#00FFFF";
document.addEventListener("mousemove", function (e) {
  // Creates a trail particle on mousemove
  const trail = document.createElement("div");
  trail.className = "trail";
  trail.style.background = trailColour;
  // Trial position is slightly offset to add variety
  const offsetX = (Math.random() - 0.5) * 30;
  const offsetY = (Math.random() - 0.5) * 30;
  trail.style.left = e.clientX + offsetX + "px";
  trail.style.top = e.clientY + offsetY + "px";
  // Trail div is destroyed after a second to not slow down the website
  setTimeout(() => {
    trail.remove();
  }, 1000);
  // appendChild adds the trail effect to the website
  document.body.appendChild(trail);
});

let score = 0;

// Event listener for mouse entering obstacles that ends the game when hovered over.
// forEach lets me select all the obstacles with the class
document.querySelectorAll(".obstacle").forEach((obstacle) => {
  obstacle.addEventListener("mouseenter", gameEnd);
});

// Game over function when the user wins or loses. Updates the menu to show the score
function gameEnd() {
  menu.style.display = "block";
  const scoreText = document.getElementById("score-text");
  if (score === 6) {
    document.getElementById("score-text").textContent =
      "You win! Your score is " + score;
    scoreText.style.color = "green";
  } else {
    document.getElementById("score-text").textContent =
      "You lose! Your score is " + score;
    scoreText.style.color = "red";
  }
}

// Resets the score and hides the menu so the user can start or replay the game
function reset() {
  menu.style.display = "none";
  score = 0;
  document.querySelectorAll(".food").forEach((foodItem) => {
    foodItem.style.display = "block";
  });
}

// Gives each the foodItem element.
// With this I can add an event listener for each food item, and using function(e) I can track which foodItem triggered the function and remove it from the scene when it is collected
// Collectibles give context and an objective to the game
document.querySelectorAll(".food").forEach((foodItem) => {
  foodItem.addEventListener("mouseenter", function (e) {
    score++;
    console.log("Score:", score);
    e.target.style.display = "none";

    if (score === 6) {
      gameEnd();
    }
  });
});

document.addEventListener("mousemove", function (e) {
  // Set CSS variables for the mask position
  mask.style.setProperty("--x", `${e.clientX}px`);
  mask.style.setProperty("--y", `${e.clientY}px`);
});
