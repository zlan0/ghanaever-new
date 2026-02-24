# GhanaFront — Plain HTML/CSS/JS

Ghana's fastest news aggregator. No build tools. No Node. No TypeScript.
Just open `index.html` and you're done.

## Project Structure

```
ghanafront/
├── index.html              ← Main feed (open this in your browser)
├── css/
│   └── style.css           ← All styles + design tokens
├── js/
│   └── app.js              ← All JS: icons, components, data, chat, dark mode
├── pages/
│   ├── article.html        ← Article detail page
│   ├── politics.html       ← Politics category
│   ├── business.html       ← Business category
│   ├── sports.html         ← Sports category
│   ├── tech.html           ← Tech category
│   ├── health.html         ← Health category
│   ├── entertainment.html  ← Entertainment category
│   └── world.html          ← World category
├── backend/
│   ├── main.py             ← FastAPI backend
│   ├── rss_scraper.py      ← RSS scraper bot
│   ├── schema.sql          ← Supabase database schema
│   └── requirements.txt    ← Python dependencies
├── .env.example            ← Environment variables template
├── render.yaml             ← Render.com deploy config
└── README.md
```

## Run Locally (Frontend Only)

No install needed. Just open the file:

```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

Or use a simple local server (recommended to avoid CORS issues):

```bash
# Python (built-in)
python3 -m http.server 3000
# then open http://localhost:3000

# Node (if installed)
npx serve .
```

Works immediately with mock data. Once you connect a backend, it switches to live data automatically.

## Connect the Backend

1. Create a Supabase project at supabase.com
2. Paste `backend/schema.sql` into the Supabase SQL editor
3. Deploy the backend to Render (render.yaml handles this)
4. Set your API URL in the browser console once:

```js
localStorage.setItem('gf_api', 'https://your-backend.onrender.com')
```

Or hardcode it in `js/app.js`:
```js
const API_BASE = 'https://your-backend.onrender.com';
```

## Deploy Frontend

**Option A — Any static host (simplest)**
Upload the entire folder to:
- Netlify (drag & drop at netlify.com)
- Vercel (drag & drop at vercel.com)
- GitHub Pages

**Option B — GitHub Pages**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USER/ghanafront.git
git push -u origin main
```
Then enable GitHub Pages in repo Settings → Pages → main branch / root.

## Deploy Backend

```bash
# Set env vars in Render dashboard:
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_KEY=your_supabase_anon_key
```

render.yaml deploys two services automatically:
- `ghana-news-api` — FastAPI web server
- `ghana-news-scraper` — RSS polling worker

## 7-Day Launch Plan

| Day | Task |
|-----|------|
| 1   | Create Supabase project, run schema.sql |
| 2   | Deploy backend to Render |
| 3   | Upload frontend to Netlify or GitHub Pages |
| 4   | Point API_BASE to your Render URL |
| 5   | Submit sitemap to Google Search Console |
| 6   | Sign up for Google AdSense (manual), replace ad placeholders |
| 7   | Share on social, monitor analytics |

## Tech Stack

| Layer    | Tool               | Cost  |
|----------|--------------------|-------|
| Frontend | HTML + CSS + JS    | Free  |
| Hosting  | Netlify / Vercel   | Free  |
| Backend  | FastAPI + Render   | Free  |
| Database | Supabase           | Free  |
| Scraper  | Python + Render    | Free  |
| Fonts    | Google Fonts       | Free  |
