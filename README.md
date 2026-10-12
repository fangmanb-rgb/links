# Bryan's Links

One-page curated links site. Static HTML/CSS/JS, no build step. All content lives in **links.json**.

## Add a link (one line)
Add an object to a category's `links` array (order = display priority):
```json
{"title": "Example", "url": "https://example.com", "desc": "One-line description.", "added": "2026-10-11"}
```
Optional `"via": "Name"` credits whoever suggested the link; it renders as a small muted "via Name" line and stays on the entry if it moves to `archive`:
```json
{"title": "Gazebo", "url": "https://gazebosim.org/home", "desc": "...", "added": "2026-10-12", "via": "Steve Henderson"}
```
Categories display sorted by link count (most first); ties keep their links.json order. To add a category, add `{"name": ..., "links": [...]}` anywhere in `categories`.

Max 5 per category. If a category has more than 5, only the first 5 show; the overflow is shown in the Archive automatically (console warning) until you clean it up.

## Swap / replace a link
1. Put the new entry in the category (in the position you want).
2. Move the old entry into `archive`, adding `"category"` and `"archived": "YYYY-MM-DD"`.

## Verify
    python3 check.py        # cap, required fields, duplicate URLs, overflow

## Run locally
    python3 -m http.server 8000   # then open http://localhost:8000
(Opening index.html via file:// won't load links.json.)

## Hosting (not set up)
- **GitHub Pages** or **Netlify free tier**: push this folder; it's static, so no config needed.
- Optional custom subdomain like `links.taskonomy.net`: add a CNAME DNS record pointing to the host (and a `CNAME` file for GitHub Pages). No purchase needed *if* Bryan already owns taskonomy.net — ownership is unverified.
