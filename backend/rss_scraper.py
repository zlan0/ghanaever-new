"""
Ghana News Aggregator - RSS Scraper Bot
Polls RSS feeds every 5 minutes, dedupes, categorizes, and stores to Supabase.
"""

import hashlib
import os
import time
import logging
from datetime import datetime, timezone
from typing import Optional
import feedparser
import requests
from bs4 import BeautifulSoup
from supabase import create_client, Client
import schedule

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger(__name__)

# ─── Config ──────────────────────────────────────────────────────────────────

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_KEY"]

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

RSS_FEEDS = [
    # Ghana
    {"name": "CitiNews",      "url": "https://citinewsroom.com/feed/",                          "region": "ghana"},
    {"name": "JoyOnline",     "url": "https://www.myjoyonline.com/feed/",                        "region": "ghana"},
    {"name": "GhanaWeb",      "url": "https://www.ghanaweb.com/GhanaHomePage/rss/index.php",     "region": "ghana"},
    {"name": "Graphic Online","url": "https://www.graphic.com.gh/feed/rss",                      "region": "ghana"},
    {"name": "GhanaBusinessNews", "url": "https://www.ghanabusinessnews.com/feed/",              "region": "ghana"},
    # African/Global
    {"name": "BBC Africa",    "url": "http://feeds.bbci.co.uk/news/world/africa/rss.xml",        "region": "africa"},
    {"name": "Reuters Africa","url": "https://feeds.reuters.com/reuters/AFRICANews",             "region": "africa"},
    {"name": "Al Jazeera",    "url": "https://www.aljazeera.com/xml/rss/all.xml",                "region": "global"},
]

CATEGORIES = {
    "politics":      ["election", "parliament", "president", "government", "minister", "ndc", "npp", "vote", "akufo", "mahama", "policy"],
    "business":      ["economy", "cedi", "ghana stock", "business", "investment", "gdp", "inflation", "bank", "trade", "revenue", "tax"],
    "sports":        ["black stars", "football", "soccer", "athletics", "olympics", "sports", "league", "goal", "match", "tournament"],
    "tech":          ["technology", "mobile", "internet", "startup", "fintech", "app", "digital", "ai", "cyber", "software", "innovation"],
    "health":        ["health", "hospital", "disease", "covid", "malaria", "clinic", "medicine", "who", "vaccine", "outbreak"],
    "entertainment": ["music", "movie", "celebrity", "arts", "culture", "fashion", "award", "entertainment", "festival", "concert"],
    "world":         ["international", "usa", "europe", "china", "uk", "global", "united nations", "war", "sanctions", "treaty"],
}

# ─── Categorization (keyword-only, no ML model) ──────────────────────────────

def categorize_article(title: str, summary: str) -> str:
    text = f"{title} {summary}".lower()
    scores = {}
    for category, keywords in CATEGORIES.items():
        scores[category] = sum(1 for kw in keywords if kw in text)
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "general"

# ─── Trending Score ──────────────────────────────────────────────────────────

def trending_score(views: int, shares: int, hours_old: float) -> float:
    recency = 1 / max(hours_old, 0.1)
    return 0.6 * views + 0.3 * shares + 0.1 * recency

# ─── Image Extraction ────────────────────────────────────────────────────────

def extract_image(entry) -> Optional[str]:
    if hasattr(entry, "media_content") and entry.media_content:
        return entry.media_content[0].get("url")
    if hasattr(entry, "enclosures") and entry.enclosures:
        for enc in entry.enclosures:
            if "image" in enc.get("type", ""):
                return enc.get("href") or enc.get("url")
    if hasattr(entry, "summary"):
        soup = BeautifulSoup(entry.summary, "html.parser")
        img = soup.find("img")
        if img and img.get("src"):
            return img["src"]
    return None

# ─── Affiliate Link Insertion ─────────────────────────────────────────────────

AFFILIATE_TRIGGERS = {
    "iphone":  "https://amzn.to/ghana-iphone",
    "samsung": "https://amzn.to/ghana-samsung",
    "laptop":  "https://amzn.to/ghana-laptop",
    "tickets": "https://www.eventbrite.com/?aff=ghana_news",
    "book":    "https://amzn.to/ghana-books",
    "jumia":   "https://www.jumia.com.gh/?utm_source=ghananews&utm_medium=affiliate",
}

def insert_affiliates(content: str) -> dict:
    return {trigger: url for trigger, url in AFFILIATE_TRIGGERS.items() if trigger in content.lower()}

# ─── Deduplication ───────────────────────────────────────────────────────────

def title_hash(title: str) -> str:
    return hashlib.md5(title.strip().lower().encode()).hexdigest()

def already_exists(thash: str) -> bool:
    result = supabase.table("articles").select("id").eq("title_hash", thash).execute()
    return len(result.data) > 0

# ─── Core Scrape Loop ────────────────────────────────────────────────────────

def scrape_all_feeds():
    log.info("Starting RSS scrape cycle...")
    new_count = 0

    for feed_meta in RSS_FEEDS:
        try:
            feed = feedparser.parse(feed_meta["url"])
            log.info(f"[{feed_meta['name']}] {len(feed.entries)} entries found")

            for entry in feed.entries[:20]:
                title = entry.get("title", "").strip()
                if not title:
                    continue

                thash = title_hash(title)
                if already_exists(thash):
                    continue

                summary = BeautifulSoup(
                    entry.get("summary", entry.get("description", "")), "html.parser"
                ).get_text()[:500]

                published_raw = entry.get("published_parsed") or entry.get("updated_parsed")
                if published_raw:
                    published_at = datetime(*published_raw[:6], tzinfo=timezone.utc).isoformat()
                else:
                    published_at = datetime.now(timezone.utc).isoformat()

                image_url = extract_image(entry)
                category = categorize_article(title, summary)
                affiliate_map = insert_affiliates(f"{title} {summary}")

                hours_old = max(
                    (datetime.now(timezone.utc) - datetime.fromisoformat(published_at.replace("Z", "+00:00"))).total_seconds() / 3600,
                    0.01
                )

                article = {
                    "title":          title,
                    "title_hash":     thash,
                    "summary":        summary,
                    "url":            entry.get("link", ""),
                    "image_url":      image_url,
                    "source":         feed_meta["name"],
                    "region":         feed_meta["region"],
                    "category":       category,
                    "published_at":   published_at,
                    "views":          0,
                    "shares":         0,
                    "trending_score": trending_score(0, 0, hours_old),
                    "affiliates":     affiliate_map,
                    "seo_score":      0,
                }

                supabase.table("articles").insert(article).execute()
                new_count += 1
                log.info(f"  ✓ Inserted: {title[:60]}")

        except Exception as e:
            log.error(f"[{feed_meta['name']}] Error: {e}")

    log.info(f"Cycle complete. {new_count} new articles inserted.")


def update_trending_scores():
    log.info("Updating trending scores...")
    articles = supabase.table("articles").select("id,views,shares,published_at").execute().data
    for art in articles:
        try:
            published = datetime.fromisoformat(art["published_at"].replace("Z", "+00:00"))
            hours_old = max(
                (datetime.now(timezone.utc) - published).total_seconds() / 3600, 0.01
            )
            score = trending_score(art["views"], art["shares"], hours_old)
            supabase.table("articles").update({"trending_score": score}).eq("id", art["id"]).execute()
        except Exception as e:
            log.warning(f"Score update failed for {art['id']}: {e}")
    log.info("Trending scores updated.")


# ─── Entry point ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    log.info("Ghana News Scraper Bot starting...")
    scrape_all_feeds()          # run immediately on start
    update_trending_scores()    # update scores immediately too

    schedule.every(5).minutes.do(scrape_all_feeds)
    schedule.every(1).hours.do(update_trending_scores)

    while True:
        schedule.run_pending()
        time.sleep(30)
