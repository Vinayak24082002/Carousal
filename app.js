const carousel = document.querySelector(".carousel");
const paginationChangers = document.querySelector(".pagination-changers");
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const carouselProgress = document.querySelector("#carousel-progress");

let interval = null;
let progressInterval = null;
let intervalTiming = 5000;
let syncTiming = 50;
let progress = 0;
let currentSlideIndex = 0;

function setSlides() {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlideIndex) * 100}%)`;
  });
  resetInterval();
}
function previousSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  setSlides();
}
function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  setSlides();
}
function syncProgress() {
  progress += syncTiming;
  carouselProgress.style.width = `${Number(
    (progress / intervalTiming) * 100
  )}%`;
}
function attachEventListners() {
  prev.addEventListener("click", previousSlide);
  next.addEventListener("click", nextSlide);
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") previousSlide();
    if (event.key === "ArrowRight") nextSlide();
  });
  paginationChangers.addEventListener("mouseenter", () => {
    clearInterval(interval);
    progress = 0;
    clearInterval(interval);
    clearInterval(progressInterval);
  });
  paginationChangers.addEventListener("mouseout", () => {
    resetInterval();
  });
}
function resetInterval() {
  progress = 0;
  clearInterval(interval);
  clearInterval(progressInterval);
  interval = setInterval(nextSlide, intervalTiming);
  progressInterval = setInterval(syncProgress, syncTiming);
}
function startApp() {
  setSlides();
  attachEventListners();
  resetInterval();
  console.log(interval);
}
startApp();

// Remove event listeners when the page is unloaded -- CleanUp

window.addEventListener("unload", () => {
  prev.removeEventListener("click", previousSlide);
  next.removeEventListener("click", nextSlide);
  clearInterval(interval);
});