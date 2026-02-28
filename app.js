const phaseStart = document.getElementById("phaseStart");
const phaseScore = document.getElementById("phaseScore");
const shifter = document.getElementById("shifter");

let runningScore = 7;
let history = [];
let startY = 0;
let nudgeAmount = 0.2;

document.querySelectorAll(".initial-score-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const score = Number(btn.dataset.score);

    runningScore = score;
    history = [score];

    phaseStart.hidden = true;
    phaseScore.hidden = false;

    render();
  });
});

// SWIPE

shifter.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

shifter.addEventListener("touchmove", e => {
  e.preventDefault();
});

shifter.addEventListener("touchend", e => {
  if (startY === null) return;

  const diff = startY - e.changedTouches[0].clientY;
  const nudge = parseFloat(nudgeSelect.value);

  if (Math.abs(diff) > 30) {
    runningScore += diff > 0 ? nudge : -nudge;
    runningScore = Math.max(5, Math.min(10, runningScore));

    history.push(runningScore);
    render();
  }

  startY = null;
});

// FINISH

finishBtn.addEventListener("click", () => {
  phaseScore.hidden = true;
  phaseEnd.hidden = false;

  finalScoreEl.textContent = "Final Score: " + runningScore.toFixed(1);

  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (history.length < 2) return;

  const stepX = canvas.width / (history.length - 1);

  ctx.beginPath();

  for (let i = 0; i < history.length - 1; i++) {
    const x1 = i * stepX;
    const y1 = canvas.height - ((history[i] - 5) / 5) * canvas.height;

    const x2 = (i + 1) * stepX;
    const y2 = canvas.height - ((history[i + 1] - 5) / 5) * canvas.height;

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    if (i === 0) ctx.moveTo(x1, y1);

    ctx.quadraticCurveTo(x1, y1, midX, midY);

    if (i === history.length - 2) ctx.lineTo(x2, y2);
  }

  ctx.stroke();
});

// RESTART

restartBtn.addEventListener("click", () => {
  phaseEnd.hidden = true;
  phaseStart.hidden = false;
});