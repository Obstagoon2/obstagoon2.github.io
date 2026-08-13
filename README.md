# Zakk Jackson Personal Site

Static GitHub Pages portfolio for Zakk Jackson.

## Files

- `index.html` — site content
- `style.css` — visual design and responsive layout
- `script.js` — Last.fm polling and dynamic UI
- `config.js` — Last.fm username/API key

## Last.fm setup

1. Create/sign into a Last.fm account.
2. Create a Last.fm API application and obtain an API key.
3. Open `config.js`.
4. Replace:
   - `YOUR_LASTFM_USERNAME`
   - `YOUR_LASTFM_API_KEY`
5. Push the files to the GitHub Pages repository.

The site calls Last.fm's `user.getrecenttracks` endpoint every 30 seconds and only displays a track when Last.fm marks it as `nowplaying`.

If you are not currently listening, the card remains compact and says "Nothing playing"; it never displays your previous track as if it were current.

## Customizing content

Most portfolio text is directly in `index.html`, so it can be edited without touching the JavaScript.

There is intentionally no "current obsession" system in this version.
