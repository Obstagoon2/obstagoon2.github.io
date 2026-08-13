(() => {
  const config = window.LASTFM_CONFIG || {};
  const card = document.getElementById("now-playing");
  const albumArt = document.getElementById("album-art");
  const albumPlaceholder = document.getElementById("album-placeholder");
  const trackState = document.getElementById("track-state");
  const trackName = document.getElementById("track-name");
  const artistName = document.getElementById("artist-name");
  const lastfmLink = document.getElementById("lastfm-link");

  document.getElementById("year").textContent = new Date().getFullYear();

  function showNotConfigured() {
    card.style.display = "";
    trackState.textContent = "LAST.FM";
    trackName.textContent = "Connect Last.fm";
    artistName.textContent = "Add your username and API key to config.js";
    albumArt.hidden = true;
    albumPlaceholder.hidden = false;
    lastfmLink.href = "https://www.last.fm/";
  }

  function showNothingPlaying() {
    card.style.display = "";
    trackState.textContent = "NOT LISTENING";
    trackName.textContent = "Nothing playing";
    artistName.textContent = "Last.fm is connected";
    albumArt.hidden = true;
    albumPlaceholder.hidden = false;
    lastfmLink.href = `https://www.last.fm/user/${encodeURIComponent(config.username)}`;
  }

  function showTrack(track) {
    const artist = track.artist?.["#text"] || track.artist?.name || "Unknown artist";
    const name = track.name || "Unknown track";
    const image = Array.isArray(track.image) ? track.image[track.image.length - 1]?.["#text"] : "";
    const url = track.url || `https://www.last.fm/user/${encodeURIComponent(config.username)}`;

    trackState.textContent = "NOW PLAYING";
    trackName.textContent = name;
    artistName.textContent = artist;
    lastfmLink.href = url;

    if (image) {
      albumArt.src = image;
      albumArt.alt = `${name} by ${artist} album art`;
      albumArt.hidden = false;
      albumPlaceholder.hidden = true;
    } else {
      albumArt.hidden = true;
      albumPlaceholder.hidden = false;
    }
  }

  async function updateNowPlaying() {
    if (!config.username || !config.apiKey ||
        config.username.includes("YOUR_") || config.apiKey.includes("YOUR_")) {
      showNotConfigured();
      return;
    }

    const params = new URLSearchParams({
      method: "user.getrecenttracks",
      user: config.username,
      api_key: config.apiKey,
      format: "json",
      limit: "1",
      autocorrect: "1"
    });

    try {
      const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${params}`, {
        cache: "no-store"
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const tracks = data?.recenttracks?.track || [];
      const track = Array.isArray(tracks) ? tracks[0] : tracks;

      if (track && track["@attr"]?.nowplaying === "true") {
        showTrack(track);
      } else {
        showNothingPlaying();
      }
    } catch (error) {
      console.warn("Last.fm update failed:", error);
      trackState.textContent = "LAST.FM";
      trackName.textContent = "Last.fm unavailable";
      artistName.textContent = "Unable to update right now";
      albumArt.hidden = true;
      albumPlaceholder.hidden = false;
    }
  }

  updateNowPlaying();
  window.setInterval(updateNowPlaying, Math.max(config.refreshInterval || 30000, 15000));
})();
