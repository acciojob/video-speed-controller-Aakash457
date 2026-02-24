const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");

// PLAY / PAUSE
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

// UPDATE PLAY BUTTON ICON
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// PROGRESS BAR UPDATE
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// SCRUB
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// VOLUME + SPEED
function handleRange() {
  video[this.name] = this.value;
}

// SKIP
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// LISTENERS
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

ranges.forEach(r => r.addEventListener("change", handleRange));
ranges.forEach(r => r.addEventListener("mousemove", handleRange));

skipButtons.forEach(btn => btn.addEventListener("click", skip));

// SCRUB DRAG
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));