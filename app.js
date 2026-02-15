alert("JS LOADED");
```javascript
const finishBtn = document.getElementById("finishBtn");
const canvas = document.getElementById("graph");
const finalScoreEl = document.getElementById("finalScore");

function render() {
  currentEl.textContent = runningScore.toFixed(1);
  prevEl.textContent = Math.floor(runningScore);
  nextEl.textContent = Math.min(10, Math.floor(runningScore) + 1);
}

window.startScore = function(score) {
  runningScore = score;
  history = [score];

  phaseStart.style.display = "none";
  phaseScore.style.display = "block";

  render();
};

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

finishBtn.addEventListener("click", () => {
  phaseScore.style.display = "none";
  phaseEnd.style.display = "block";

  finalScoreEl.textContent = "Final Score: " + runningScore.toFixed(1);

  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const stepX = canvas.width / (history.length - 1 || 1);

  ctx.beginPath();

  history.forEach((score, i) => {
    const x = i * stepX;
    const y = canvas.height - ((score - 5) / 5) * canvas.height;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
});

window.restartApp = function() {
  phaseEnd.style.display = "none";
  phaseStart.style.display = "block";
};
```
