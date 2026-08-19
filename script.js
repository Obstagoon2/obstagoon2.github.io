/* =========================================================
   Zakk Jackson Portfolio — site behavior
   Content belongs in data/*.js. Presentation belongs in CSS.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderRobotics();
  renderProjects();
  renderLeadership();
  renderFourH();
  renderFirstEvents();
  renderAchievements();
  renderElsewhere();
  setupNavigation();
  setupConfigurableContact();
  updateFooterYear();
  loadNowPlaying();
  setInterval(loadNowPlaying, SITE_CONFIG.refreshMs);
});

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function externalLink(url, label) {
  return `<a class="button" href="${escapeHTML(url)}" target="_blank" rel="noopener">${escapeHTML(label)} <span>↗</span></a>`;
}

function renderRobotics() {
  const root = document.querySelector("#robotics-grid");
  root.innerHTML = roboticsRoles.map(item => `
    <article class="robotics-card ${item.current ? "current" : ""}">
      <div class="card-meta">${escapeHTML(item.program)}</div>
      <h3>${escapeHTML(item.organization)}</h3>
      <ul class="role-list">
        ${item.roles.map(role => `<li>${escapeHTML(role)}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

function renderProjects() {
  const root = document.querySelector("#projects-grid");
  root.innerHTML = projects.map((project, index) => `
    <article class="project-card">
      <div class="project-top">
        <div>
          <div class="card-meta">${escapeHTML(project.category)}</div>
          <h3>${escapeHTML(project.title)}</h3>
        </div>
        <div class="card-meta">${String(index + 1).padStart(2, "0")}</div>
      </div>
      <p>${escapeHTML(project.description)}</p>
      ${project.details ? `<p class="project-details">${escapeHTML(project.details)}</p>` : ""}
      <div class="tags">${(project.tags || []).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div>
      ${project.links?.length ? `<div class="project-links">${project.links.map(link => externalLink(link.url, link.label)).join("")}</div>` : ""}
    </article>
  `).join("");
}

function renderLeadership() {
  const root = document.querySelector("#leadership-timeline");
  root.innerHTML = leadership.map(item => `
    <article class="timeline-item">
      <div class="timeline-year">${escapeHTML(item.year)}</div>
      <div>
        <div class="timeline-org">${escapeHTML(item.organization)}</div>
        <div class="timeline-role">${escapeHTML(item.role)}</div>
        <p class="timeline-desc">${escapeHTML(item.description || "")}</p>
      </div>
    </article>
  `).join("");
}

function renderFourH() {
  const shooting = document.querySelector("#shooting-timeline");
  const poultry = document.querySelector("#poultry-timeline");

  shooting.innerHTML = fourH.shootingSports.map(renderMiniYear).join("");
  poultry.innerHTML = fourH.poultry.map(renderMiniYear).join("");

  document.querySelector("#fourh-achievements").innerHTML = fourH.achievements.map(item => `
    <article class="fourh-card">
      <h3>${escapeHTML(item.title)}${item.year ? ` — ${escapeHTML(item.year)}` : ""}</h3>
      <p>${escapeHTML(item.description)}</p>
    </article>
  `).join("");

  document.querySelector("#fourh-projects").innerHTML = fourH.projects.map(item => `
    <article class="fourh-card">
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.description)}</p>
      <p><strong>${escapeHTML(item.result)}</strong></p>
    </article>
  `).join("");
}

function renderMiniYear(item) {
  return `
    <div class="mini-year">
      <div class="mini-year-head"><span>${escapeHTML(item.year)}</span><span>${item.results.length} RESULT${item.results.length === 1 ? "" : "S"}</span></div>
      <ul>${item.results.map(result => `<li>${escapeHTML(result)}</li>`).join("")}</ul>
    </div>
  `;
}

function renderFirstEvents() {
  document.querySelector("#first-events-list").innerHTML = firstEvents.map(item => `
    <article class="event-card">
      <div class="event-year">${escapeHTML(item.year)}</div>
      <h3>${escapeHTML(item.event)} — ${escapeHTML(item.role)}</h3>
      <p>${escapeHTML(item.description)}</p>
    </article>
  `).join("");
}

function renderAchievements() {
  document.querySelector("#achievements-grid").innerHTML = achievements.map(item => `
    <article class="achievement-card">
      <div class="achievement-value">${escapeHTML(item.value)}</div>
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.description)}</p>
    </article>
  `).join("");
}

function renderElsewhere() {
  const profiles = [
    { icon: "GH", name: "GitHub", description: "Code, projects, and experiments.", url: "https://github.com/Obstagoon2" },
    { icon: "in", name: "LinkedIn", description: "Professional profile and experience.", url: "https://www.linkedin.com/in/zakk-jackson/" },
    { icon: "CD", name: "Chief Delphi", description: "FIRST Robotics community profile.", url: "https://www.chiefdelphi.com/u/zakk_j/summary" },
    { icon: "♫", name: "Last.fm", description: "Currently playing music integration.", url: "https://www.last.fm/" }
  ];

  document.querySelector("#elsewhere-grid").innerHTML = profiles.map(item => `
    <a class="elsewhere-card" href="${escapeHTML(item.url)}" target="_blank" rel="noopener">
      <div class="elsewhere-icon">${escapeHTML(item.icon)}</div>
      <h3>${escapeHTML(item.name)}</h3>
      <p>${escapeHTML(item.description)}</p>
      <span class="elsewhere-arrow">→</span>
    </a>
  `).join("");
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

function setupConfigurableContact() {
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.href = `mailto:${SITE_CONFIG.contactEmail}`;
  });
}

function updateFooterYear() {
  document.querySelector("#footer-year").textContent = new Date().getFullYear();
}

async function loadNowPlaying() {
  const root = document.querySelector("#now-playing-content");

  if (!LASTFM_CONFIG.apiKey || LASTFM_CONFIG.apiKey === "YOUR_API_KEY" ||
      !LASTFM_CONFIG.username || LASTFM_CONFIG.username === "YOUR_LASTFM_USERNAME") {
    showNotPlaying("SET UP LAST.FM");
    return;
  }

  try {
    const params = new URLSearchParams({
      method: "user.getrecenttracks",
      user: LASTFM_CONFIG.username,
      api_key: LASTFM_CONFIG.apiKey,
      format: "json",
      limit: "1"
    });

    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${params}`);
    if (!response.ok) throw new Error("Last.fm request failed");

    const data = await response.json();
    const track = data?.recenttracks?.track?.[0];

    if (!track || track["@attr"]?.nowplaying !== "true") {
      showNotPlaying("NOT CURRENTLY PLAYING");
      return;
    }

    const image = track.image?.find(item => item.size === "extralarge")?.["#text"]
      || track.image?.find(item => item.size === "large")?.["#text"];

    root.innerHTML = `
      ${image
        ? `<img class="album-art" src="${escapeHTML(image)}" alt="Album artwork for ${escapeHTML(track.name)}">`
        : `<div class="album-art placeholder-art" aria-hidden="true">♫</div>`}
      <div>
        <p class="music-state">NOW PLAYING</p>
        <h2>${escapeHTML(track.name || "Unknown track")}</h2>
        <p class="music-artist">${escapeHTML(track.artist?.["#text"] || track.artist || "Unknown artist")}</p>
      </div>
    `;
  } catch (error) {
    console.warn("Last.fm unavailable:", error);
    showNotPlaying("MUSIC STATUS UNAVAILABLE");
  }
}

function showNotPlaying(state) {
  document.querySelector("#now-playing-content").innerHTML = `
    <div class="album-art placeholder-art" aria-hidden="true">♫</div>
    <div>
      <p class="music-state">${escapeHTML(state)}</p>
      <h2>Music status unavailable</h2>
      <p class="music-artist">Check back later.</p>
    </div>
  `;
}
