let score = 0;
let timeLeft = 30;
let timerInterval;
let starInterval;

function startGame() {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  score = 0;
  timeLeft = 30;
  document.getElementById("score").innerText = "⭐ Score: 0";
  document.getElementById("timer").innerText = "⏱️ Time: 30";

  timerInterval = setInterval(updateTimer, 1000);
  starInterval = setInterval(() => {
    const count = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < count; i++) createStar();
  }, 1200);
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").innerText = `⏱️ Time: ${timeLeft}`;
  if (timeLeft === 0) endGame();
}

function createStar() {
  const gameArea = document.getElementById("game-area");
  const star = document.createElement("div");
  star.classList.add("star");

  const isSpecial = Math.random() < 0.1;
  const isBonus = !isSpecial && Math.random() < 0.2;

  if (isSpecial) {
    star.innerText = "💣";
    star.style.backgroundColor = "crimson";
  } else {
    star.innerText = isBonus ? "💎" : "★";
    star.style.backgroundColor = isBonus ? "deepskyblue" : "gold";
  }

  star.style.left = Math.random() * (gameArea.clientWidth - 70) + "px";
  star.style.top = "-70px";

  star.onclick = function () {
    if (gameArea.contains(star)) {
      // 🔊 Play correct sound
      if (star.innerText === "💣") {
        const blastSound = document.getElementById("blast-sound");
        blastSound.currentTime = 0;
        blastSound.play();
      } else {
        const clickSound = document.getElementById("click-sound");
        clickSound.currentTime = 0;
        clickSound.play();
      }

      createExplosion(star);
      gameArea.removeChild(star);
      score += 10;
      document.getElementById("score").innerText = `⭐ Score: ${score}`;
      flashBackground();
    }
  };

  setTimeout(() => {
    if (gameArea.contains(star)) gameArea.removeChild(star);
  }, 10000);

  gameArea.appendChild(star);
}

function createExplosion(star) {
  const explosion = document.createElement("div");
  explosion.classList.add("explosion");
  explosion.style.left = star.style.left;
  explosion.style.top = star.style.top;

  if (star.innerText === "💣") {
    explosion.style.background = "radial-gradient(circle, red, orange, yellow)";
    explosion.style.transform = "scale(3)";
    explosion.style.boxShadow = "0 0 60px 20px red";
  }

  document.getElementById("game-area").appendChild(explosion);
  setTimeout(() => explosion.remove(), 600);
}

function flashBackground() {
  const gameArea = document.getElementById("game-area");
  gameArea.style.backgroundColor = "#333";
  setTimeout(() => {
    gameArea.style.backgroundColor = "#1a1a2e";
  }, 100);
}

function endGame() {
  clearInterval(timerInterval);
  clearInterval(starInterval);
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("game-over-screen").style.display = "block";
  document.getElementById("final-score").innerText = score;
}

function restartGame() {
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("welcome-screen").style.display = "block";
}
