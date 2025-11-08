async function loadExperience() {
  const response = await fetch("data/experience");
  const files = await response.json();

  const section = document.querySelector(".experience-section .container");
  section.innerHTML = "";

  for (const file of files) {
    const exp = await fetch(`data/experience/${file}`).then(r => r.json());
    section.innerHTML += `
      <div class="exp-item">
        <h4>${exp.company}</h4>
        <p>${exp.period}</p>
        <p>${exp.description}</p>
        ${exp.image ? `<img src="${exp.image}" alt="">` : ""}
      </div>`;
  }
}
document.addEventListener("DOMContentLoaded", loadExperience);
