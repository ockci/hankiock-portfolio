async function loadStillcuts() {
  const res = await fetch("data/stillcut");
  const parser = new DOMParser();
  const html = parser.parseFromString(await res.text(), "text/html");
  const files = Array.from(html.querySelectorAll("a"))
    .map(a => a.getAttribute("href"))
    .filter(h => h.endsWith(".json"));

  const section = document.querySelector(".stillcut-section .container");
  section.innerHTML = "";

  for (const file of files) {
    const sc = await fetch(`data/stillcut/${file}`).then(r => r.json());
    section.innerHTML += `
      <div class="project-gallery">
        <h3>${sc.title} <small>${sc.role || ""}</small></h3>
        <p>${sc.category}</p>
        <div class="gallery-slides">
          ${sc.images
            .map(
              img => `<div class="gallery-slide">
                        <img src="${img.image}" alt="${img.caption || ""}">
                      </div>`
            )
            .join("")}
        </div>
        <p>${sc.description || ""}</p>
      </div>
    `;
  }
}
document.addEventListener("DOMContentLoaded", loadStillcuts);
