// click a project image to see it big
// FIX 6: use the arrows, keyboard arrow keys or a swipe to move between images
// close with the ✕, the Esc key, or by clicking outside the image
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const counter = lightbox.querySelector(".lightbox-count");
// FIX 36: skip the moving GIF that sits on top of a case study board
const galleryImages = document.querySelectorAll(".gallery-item img:not(.case-gif)");
let current = 0;

function showImage(index) {
  // wraps round, so after the last image you go back to the first
  current = (index + galleryImages.length) % galleryImages.length;
  // FIX 17: photography pages show a small thumbnail in the grid and load the big version here
  lightboxImg.src = galleryImages[current].dataset.full || galleryImages[current].src;
  lightboxImg.alt = galleryImages[current].alt;
  counter.innerText = current + 1 + " / " + galleryImages.length;
}

document.querySelectorAll(".gallery-item").forEach(function (item, index) {
  item.addEventListener("click", function () {
    showImage(index);
    lightbox.showModal();
  });
});

lightbox.querySelector(".lightbox-prev").addEventListener("click", function () {
  showImage(current - 1);
});

lightbox.querySelector(".lightbox-next").addEventListener("click", function () {
  showImage(current + 1);
});

lightbox.querySelector(".lightbox-close").addEventListener("click", function () {
  lightbox.close();
});

// clicking the blue area around the image closes it
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

document.addEventListener("keydown", function (event) {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") showImage(current - 1);
  if (event.key === "ArrowRight") showImage(current + 1);
});

// swipe left or right on phones
let touchStartX = 0;

lightbox.addEventListener("touchstart", function (event) {
  touchStartX = event.touches[0].clientX;
});

lightbox.addEventListener("touchend", function (event) {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (distance > 50) showImage(current - 1);
  if (distance < -50) showImage(current + 1);
});
