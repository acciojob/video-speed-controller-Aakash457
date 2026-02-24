const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");

// play pause
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

// change icon
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// scrub progress
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// volume + speed
function handleRange() {
  video[this.name] = this.value;
}

// skip
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

ranges.forEach(r => r.addEventListener("change", handleRange));
ranges.forEach(r => r.addEventListener("mousemove", handleRange));

skipButtons.forEach(btn => btn.addEventListener("click", skip));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));