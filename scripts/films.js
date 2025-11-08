async function loadFilms() {
  const res = await fetch("data/films");
  const parser = new DOMParser();
  const html = parser.parseFromString(await res.text(), "text/html");
  const files = Array.from(html.querySelectorAll("a"))
    .map(a => a.getAttribute("href"))
    .filter(h => h.endsWith(".json"));

  const container = document.querySelector(".video-section .container");
  container.innerHTML = "";

  for (const file of files) {
    const data = await fetch(`data/films/${file}`).then(r => r.json());

    const videoHTML = data.type === "유튜브"
      ? `<iframe src="${data.video}" frameborder="0" allowfullscreen></iframe>`
      : `<video controls poster="${data.thumbnail || ""}">
           <source src="${data.video}" type="video/mp4">
         </video>`;

    container.innerHTML += `
      <div class="video-container">
        <div class="video-player">${videoHTML}</div>
        <div class="video-info">
          <h4>${data.caption_title}</h4>
          <p>${data.description}</p>
        </div>
      </div>
    `;
  }
}
document.addEventListener("DOMContentLoaded", loadFilms);
