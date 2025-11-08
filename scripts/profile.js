async function loadProfile() {
  const res = await fetch("data/profile");
  const parser = new DOMParser();
  const html = parser.parseFromString(await res.text(), "text/html");
  const files = Array.from(html.querySelectorAll("a"))
    .map(a => a.getAttribute("href"))
    .filter(h => h.endsWith(".json"));

  if (files.length === 0) return;

  const profileData = await fetch(`data/profile/${files[0]}`).then(r => r.json());

  // 예시: .profile-photo, .profile-bio 라는 요소가 있다고 가정
  document.querySelector(".profile-photo").src = profileData.photo;
  document.querySelector(".profile-bio").innerHTML = profileData.bio;
}
document.addEventListener("DOMContentLoaded", loadProfile);
