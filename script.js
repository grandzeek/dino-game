const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    jump();
  }
});

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");
    setTimeout(function() {
      dino.classList.remove("jump");
    }, 300);
  }
}

// Add jump class via CSS
let style = document.createElement('style');
style.innerHTML = `
  .jump {
    animation: jump 0.3s ease;
  }
  @keyframes jump {
    0% { bottom: 0; }
    50% { bottom: 80px; }
    100% { bottom: 0; }
  }
`;
document.head.appendChild(style);

// Move cactus
let isAlive = setInterval(function () {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  if (cactusLeft < 90 && cactusLeft > 50 && dinoTop > 140) {
    alert("Game Over!");
  }
}, 10);

let score = 0;
let scoreInterval = setInterval(() => {
  score++;
  document.getElementById("score").innerText = "Score: " + score;
}, 100);


function moveCactus() {
  cactus.style.left = "580px";
  let cactusInterval = setInterval(function() {
    let left = parseInt(cactus.style.left);
    if (left <= -20) {
      left = 600;
    }
    cactus.style.left = (left - 5) + "px";
  }, 20);
}

moveCactus();

function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");
    document.getElementById("jump-sound").play();
    setTimeout(() => {
      dino.classList.remove("jump");
    }, 300);
  }
}

// In the collision check:
if (cactusLeft < 90 && cactusLeft > 50 && dinoTop > 140) {
  document.getElementById("game-over-sound").play();
  alert("Game Over! Your score: " + score);
  location.reload();
}

document.getElementById("jump-btn").addEventListener("click", jump);
