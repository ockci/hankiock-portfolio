async function loadIndex() {
  const res = await fetch("data/index/main.json");
  const data = await res.json();
  document.querySelector(".main-title").textContent = data.title;
  document.querySelector(".main-intro").textContent = data.intro;
  if (data.hero_image) document.querySelector(".hero-img").src = data.hero_image;
}
document.addEventListener("DOMContentLoaded", loadIndex);
