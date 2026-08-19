# Zakk Jackson Personal Portfolio

Static GitHub Pages portfolio for Zakk Jackson.

## Structure

- `index.html` — page structure
- `style.css` — visual design
- `script.js` — rendering, navigation, and Last.fm behavior
- `config.js` — site configuration and Last.fm settings
- `data/robotics.js` — robotics roles and seasons
- `data/projects.js` — projects
- `data/leadership.js` — leadership timeline
- `data/fourh.js` — 4-H competition history, achievements, and projects
- `data/achievements.js` — major achievements and FIRST event experience
- `assets/` — images, icons, and favicon

## Updating the site

The important rule is: **edit the data files, not the HTML layout.**

### Add a robotics role

Edit `data/robotics.js`:

```js
{
  organization: "FRC 1912 Combustion",
  program: "FRC",
  season: "2027–28",
  roles: ["New Role"],
  current: true
}
```

### Add leadership

Edit `data/leadership.js`:

```js
{
  year: "2027–28",
  organization: "FRC 1912 Combustion",
  role: "New Role",
  description: "What I did."
}
```

### Add a project

Edit `data/projects.js`:

```js
{
  category: "ROBOTICS / SOFTWARE",
  title: "New Project",
  description: "What it does.",
  details: "Additional technical details.",
  tags: ["Robotics", "Software"],
  links: [
    { label: "Project", url: "https://example.com/" }
  ]
}
```

### Add an achievement

Edit `data/achievements.js`:

```js
{
  value: "2027",
  title: "New Award",
  description: "What it was for."
}
```

### Add 4-H results

Edit `data/fourh.js` and add a year object to either `shootingSports` or `poultry`.

## Last.fm

Open `config.js` and set:

```js
const LASTFM_CONFIG = {
  apiKey: "YOUR_API_KEY",
  username: "YOUR_LASTFM_USERNAME"
};
```

The page only displays the currently playing track. It does not display recent tracks, top artists, top tracks, listening statistics, or scrobble history.

## Contact

Change `SITE_CONFIG.contactEmail` in `config.js`.

## GitHub Pages

This repository is designed to work as a static GitHub Pages site. No backend is required.
