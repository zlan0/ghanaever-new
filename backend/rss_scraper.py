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

from dotenv import load_dotenv
load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger(__name__)

# ─── Config ──────────────────────────────────────────────────────────────────

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_KEY"]

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

RSS_FEEDS = [
    # Ghana
    {"name": "CitiNews",          "url": "https://citinewsroom.com/feed/",                          "region": "ghana"},
    {"name": "JoyOnline",         "url": "https://www.myjoyonline.com/feed/",                        "region": "ghana"},
    {"name": "GhanaWeb",          "url": "https://www.ghanaweb.com/GhanaHomePage/rss/index.php",     "region": "ghana"},
    {"name": "Graphic Online",    "url": "https://www.graphic.com.gh/feed/rss",                      "region": "ghana"},
    {"name": "GhanaBusinessNews", "url": "https://www.ghanabusinessnews.com/feed/",                  "region": "ghana"},
    # African/Global
    {"name": "BBC Africa",        "url": "http://feeds.bbci.co.uk/news/world/africa/rss.xml",        "region": "africa"},
    {"name": "Reuters Africa",    "url": "https://feeds.reuters.com/reuters/AFRICANews",             "region": "africa"},
    {"name": "Al Jazeera",        "url": "https://www.aljazeera.com/xml/rss/all.xml",                "region": "global"},
]

# ─── Categorization ───────────────────────────────────────────────────────────
# Each category has:
#   "strong"  — high-confidence keywords (worth 3 points each)
#   "weak"    — supporting keywords (worth 1 point each)
# A minimum score threshold prevents weak/accidental matches defaulting to tech.

CATEGORIES = {
    "politics": {
        "strong": [
            "election", "parliament", "president", "prime minister", "government",
            "minister", "ndc", "npp", "senator", "akufo-addo", "mahama", "ballot",
            "constituency", "lawmaker", "legislature", "coup", "cabinet", "policy",
            "referendum", "democratic", "opposition", "ruling party", "mp ", "mps ",
            "member of parliament", "speaker of parliament", "attorney general",
            "political", "petition mahama", "petition akufo",
        ],
        "weak": [
            "vote", "campaign", "governance", "regulation", "law", "bill passed",
            "corruption", "accountability", "protest", "demonstration", "judiciary",
        ],
    },
    "business": {
        "strong": [
            "economy", "cedi", "ghana stock exchange", "gse", "investment",
            "gdp", "inflation", "bank of ghana", "imf", "world bank", "trade",
            "revenue", "tax", "fiscal", "monetary", "interest rate", "stock",
            "bond", "finance minister", "budget", "debt", "forex", "export",
            "import", "cocoa board", "ghana cocoa", "trade surplus", "trade deficit",
            "entrepreneur", "startup funding", "series a", "series b", "ipo",
        ],
        "weak": [
            "business", "market", "profit", "loss", "revenue", "growth",
            "economic", "financial", "quarter", "annual", "billion", "million",
            "fund", "donation", "investment drive",
        ],
    },
    "sports": {
        "strong": [
            "black stars", "ghana football", "gfa", "premier league ghana",
            "afcon", "world cup", "olympics", "commonwealth games",
            "asante kotoko", "hearts of oak", "accra lions",
            "athletics", "marathon", "boxing", "wrestling", "swimming",
            "cricket", "rugby", "basketball", "tennis", "volleyball",
            "transfer", "signed", "manager sacked", "coach appointed",
            "goal", "match", "tournament", "champion", "trophy",
            "fifa", "caf ", "uefa",
        ],
        "weak": [
            "sports", "football", "soccer", "league", "club", "player",
            "team", "score", "fixture", "squad", "game", "defeat", "win", "draw",
        ],
    },
    "tech": {
        "strong": [
            "artificial intelligence", " ai ", "machine learning", "blockchain",
            "cryptocurrency", "bitcoin", "fintech", "cybersecurity", "data breach",
            "5g", "software launch", "app launch", "tech startup", "google",
            "apple ", "microsoft", "meta ", "amazon web", "cloud computing",
            "robotics", "drone", "satellite", "programming", "developer",
            "open source", "silicon", "semiconductor", "data centre", "iso/iec",
        ],
        "weak": [
            "technology", "digital", "mobile", "internet", "innovation",
            "platform", "online", "website", "cyber", "software",
        ],
    },
    "health": {
        "strong": [
            "hospital", "disease", "covid", "malaria", "clinic", "vaccine",
            "outbreak", "epidemic", "pandemic", "surgery", "diagnosis",
            "treatment", "medicine", "doctor", "nurse", "patient",
            "ghana health service", "ministry of health", "who ", "world health",
            "nhis", "national health", "public health", "mortality",
            "hiv", "aids", "tuberculosis", "cancer", "diabetes",
            "mental health", "ambulance", "emergency care", "no bed",
            "dialysis", "hpv", "immunization", "vaccination programme",
        ],
        "weak": [
            "health", "medical", "wellness", "nutrition", "drug",
            "pharmacy", "research", "clinical", "therapy",
        ],
    },
    "entertainment": {
        "strong": [
            "music video", "album", "concert", "award show", "grammy",
            "ghana music awards", "vgma", "afrobeats", "hiplife", "highlife",
            "movie", "film", "nollywood", "actor", "actress", "celebrity",
            "fashion week", "runway", "reality show", "tv series",
            "spotify ghana", "youtube", "black sherif", "sarkodie", "stonebwoy",
            "kuami eugene", "shatta wale", "medikal",
        ],
        "weak": [
            "entertainment", "music", "arts", "culture", "festival",
            "performance", "tour", "release", "single", "fan",
        ],
    },
    "world": {
        "strong": [
            "united nations", "un security council", "nato", "european union",
            "white house", "us president", "russia", "ukraine", "israel",
            "palestin", "iran", "china ", "north korea", "trump", "biden",
            "sanctions", "treaty", "diplomacy", "foreign minister",
            "g7", "g20", "imf ", "world bank", "refugee", "war crimes",
            "ceasefire", "military strike", "nuclear", "coup d'etat",
            "africom", "un delegates",
        ],
        "weak": [
            "international", "global", "world", "usa", "europe",
            "washington", "london", "paris", "beijing", "overseas",
        ],
    },
}

# Minimum score required to assign a category (prevents weak 1-point matches)
MIN_SCORE_THRESHOLD = 2


def categorize_article(title: str, summary: str) -> str:
    text = f"{title} {summary}".lower()
    scores = {}

    for category, kw_groups in CATEGORIES.items():
        score = 0
        for kw in kw_groups.get("strong", []):
            if kw in text:
                score += 3
        for kw in kw_groups.get("weak", []):
            if kw in text:
                score += 1
        scores[category] = score

    best_cat = max(scores, key=scores.get)
    best_score = scores[best_cat]

    if best_score < MIN_SCORE_THRESHOLD:
        return "general"

    return best_cat


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


# ─── Recategorize existing articles ──────────────────────────────────────────

def recategorize_existing():
    """Re-run categorization on all existing articles to fix bad categories."""
    log.info("Recategorizing existing articles...")
    articles = supabase.table("articles").select("id,title,summary").execute().data
    fixed = 0
    for art in articles:
        new_cat = categorize_article(art.get("title", ""), art.get("summary", ""))
        supabase.table("articles").update({"category": new_cat}).eq("id", art["id"]).execute()
        fixed += 1
    log.info(f"Recategorized {fixed} articles.")


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
                    (datetime.now(timezone.utc) - datetime.fromisoformat(
                        published_at.replace("Z", "+00:00")
                    )).total_seconds() / 3600,
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
                log.info(f"  ✓ [{category}] {title[:60]}")

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
    scrape_all_feeds()
    recategorize_existing()   # fix any previously miscategorized articles
    update_trending_scores()

    schedule.every(5).minutes.do(scrape_all_feeds)
    schedule.every(1).hours.do(update_trending_scores)

    while True:
        schedule.run_pending()
        time.sleep(30)
