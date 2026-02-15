let runningScore = 7.0;
let history = [runningScore];

const currentEl = document.getElementById("currentScore");
const prevEl = document.getElementById("prevScore");
const nextEl = document.getElementById("nextScore");
const nudgeSelect = document.getElementById("nudgeAmount");
const shifter = document.getElementById("shifter");
const finishBtn = document.getElementById("finishBtn");
const canvas = document.getElementById("graph");

function render() {
  currentEl.textContent = runningScore.toFixed(1);
  prevEl.textContent = Math.floor(runningScore);
  nextEl.textContent = Math.min(10, Math.floor(runningScore) + 1);
}

render();

let startY = null;

shifter.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

shifter.addEventListener("touchend", e => {
  if (startY === null) return;

  const endY = e.changedTouches[0].clientY;
  const diff = startY - endY;
  const nudge = parseFloat(nudgeSelect.value);

  if (Math.abs(diff) > 30) {
    if (diff > 0) runningScore += nudge;
    else runningScore -= nudge;

    runningScore = Math.max(5, Math.min(10, runningScore));

    history.push(runningScore);
    render();
  }

  startY = null;
});

finishBtn.addEventListener("click", () => {
  const ctx = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const stepX = canvas.width / (history.length - 1);

  ctx.beginPath();

  history.forEach((score, i) => {
    const x = i * stepX;
    const y = canvas.height - ((score - 5) / 5) * canvas.height;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
});
