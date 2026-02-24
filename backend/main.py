"""
Ghana News Aggregator - FastAPI Backend
Serves articles, handles views/shares, search, and trending.
"""

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
import os
from datetime import datetime, timezone
from typing import Optional

app = FastAPI(title="Ghana News API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # lock down to your domain in production
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_KEY"]
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ─── Models ──────────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    query: str

# ─── Routes ──────────────────────────────────────────────────────────────────

@app.get("/api/articles")
def get_articles(
    category: Optional[str] = None,
    region: Optional[str] = None,
    sort: str = "trending",  # trending | recent | views
    page: int = 1,
    limit: int = 20,
):
    q = supabase.table("articles").select("*")
    if category and category != "all":
        q = q.eq("category", category)
    if region and region != "all":
        q = q.eq("region", region)

    offset = (page - 1) * limit

    if sort == "trending":
        q = q.order("trending_score", desc=True)
    elif sort == "recent":
        q = q.order("published_at", desc=True)
    elif sort == "views":
        q = q.order("views", desc=True)

    result = q.range(offset, offset + limit - 1).execute()
    return {"articles": result.data, "page": page, "limit": limit}


@app.get("/api/articles/{article_id}")
def get_article(article_id: str):
    result = supabase.table("articles").select("*").eq("id", article_id).single().execute()
    if not result.data:
        raise HTTPException(404, "Article not found")
    # Increment views
    supabase.table("articles").update({"views": result.data["views"] + 1}).eq("id", article_id).execute()
    return result.data


@app.post("/api/articles/{article_id}/share")
def share_article(article_id: str):
    result = supabase.table("articles").select("shares").eq("id", article_id).single().execute()
    if not result.data:
        raise HTTPException(404, "Article not found")
    supabase.table("articles").update({"shares": result.data["shares"] + 1}).eq("id", article_id).execute()
    return {"ok": True}


@app.get("/api/search")
def search_articles(q: str = Query(..., min_length=2), limit: int = 10):
    result = supabase.rpc("search_articles", {"query": q, "result_limit": limit}).execute()
    return {"results": result.data}


@app.get("/api/trending")
def get_trending(limit: int = 10):
    result = (
        supabase.table("articles")
        .select("id,title,category,source,image_url,trending_score,published_at")
        .order("trending_score", desc=True)
        .limit(limit)
        .execute()
    )
    return result.data


@app.get("/api/categories")
def get_categories():
    return {
        "categories": [
            "politics", "business", "sports", "tech",
            "health", "entertainment", "world", "general"
        ]
    }


@app.post("/api/chat")
def chat_search(req: ChatRequest):
    query = req.query.lower()
    result = supabase.rpc("search_articles", {"query": query, "result_limit": 5}).execute()
    articles = result.data or []

    if not articles:
        return {
            "answer": f"I couldn't find recent news about '{req.query}'. Try browsing our categories.",
            "sources": []
        }

    sources = [{"title": a["title"], "url": a["url"], "source": a["source"]} for a in articles[:3]]
    top = articles[0]
    answer = (
        f"Here's what I found about '{req.query}': "
        f"{top['summary']} "
        f"— reported by {top['source']}."
    )
    return {"answer": answer, "sources": sources}


@app.get("/api/sitemap")
def sitemap():
    result = supabase.table("articles").select("id,published_at").order("published_at", desc=True).limit(1000).execute()
    return result.data


@app.get("/api/status")
def api_status():
    """Live system status — article count and last scrape time."""
    article_count = 0
    last_scrape = None
    error = None
    try:
        # Fetch minimal data to count rows
        rows = supabase.table("articles").select("id, created_at").order("created_at", desc=True).limit(1000).execute()
        article_count = len(rows.data) if rows.data else 0
        if rows.data:
            last_scrape = rows.data[0].get("created_at")
    except Exception as e:
        error = str(e)

    return {
        "article_count": article_count,
        "last_scrape": last_scrape,
        "status": "error" if error else "ok",
        "error": error,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/api/scrape")
def run_scrape():
    """Manually trigger a scrape cycle from the admin panel."""
    import threading
    results = {"new_articles": 0, "error": None}

    def do_scrape():
        try:
            from rss_scraper import scrape_all_feeds
            scrape_all_feeds()
        except Exception as e:
            results["error"] = str(e)

    t = threading.Thread(target=do_scrape, daemon=True)
    t.start()
    t.join(timeout=25)
    return {"ok": True, "new_articles": results["new_articles"], "error": results["error"]}


@app.get("/health")
def health():
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}
