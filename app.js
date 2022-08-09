const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");

const startBtn = document.querySelector(".startBtn");
let lastHole;
let timeUp = false;
let score = 0;

function randTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    // console.log("ah mah that the same one bud");
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randTime(300, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  peep();
  setTimeout(() => {
    timeUp = true;
  }, 10000);
}

function bonk(e) {
  if (!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}
startBtn.addEventListener("click", startGame);

moles.forEach((mole) => mole.addEventListener("click", bonk));
