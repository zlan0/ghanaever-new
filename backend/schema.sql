-- Ghana News Aggregator - Supabase Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ─── Articles ────────────────────────────────────────────────────────────────

CREATE TABLE articles (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  title_hash    TEXT UNIQUE NOT NULL,
  summary       TEXT,
  url           TEXT NOT NULL,
  image_url     TEXT,
  source        TEXT NOT NULL,
  region        TEXT DEFAULT 'ghana',
  category      TEXT DEFAULT 'general',
  published_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  views         INTEGER DEFAULT 0,
  shares        INTEGER DEFAULT 0,
  trending_score FLOAT DEFAULT 0,
  affiliates    JSONB DEFAULT '{}',
  seo_score     INTEGER DEFAULT 0
);

-- Indexes for fast queries
CREATE INDEX idx_articles_category      ON articles(category);
CREATE INDEX idx_articles_region        ON articles(region);
CREATE INDEX idx_articles_published     ON articles(published_at DESC);
CREATE INDEX idx_articles_trending      ON articles(trending_score DESC);
CREATE INDEX idx_articles_title_trgm    ON articles USING gin(title gin_trgm_ops);
CREATE INDEX idx_articles_summary_trgm  ON articles USING gin(summary gin_trgm_ops);

-- ─── Sources ─────────────────────────────────────────────────────────────────

CREATE TABLE sources (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name      TEXT NOT NULL,
  rss_url   TEXT NOT NULL UNIQUE,
  region    TEXT DEFAULT 'ghana',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Users (for personalization) ────────────────────────────────────────────

CREATE TABLE users (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email        TEXT UNIQUE,
  prefs        JSONB DEFAULT '{"categories": [], "regions": ["ghana"]}',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Full-Text Search Function ───────────────────────────────────────────────

CREATE OR REPLACE FUNCTION search_articles(query TEXT, result_limit INT DEFAULT 10)
RETURNS TABLE (
  id UUID, title TEXT, summary TEXT, url TEXT,
  image_url TEXT, source TEXT, category TEXT,
  published_at TIMESTAMPTZ, trending_score FLOAT
)
LANGUAGE sql
AS $$
  SELECT
    id, title, summary, url, image_url, source, category,
    published_at, trending_score
  FROM articles
  WHERE
    title ILIKE '%' || query || '%'
    OR summary ILIKE '%' || query || '%'
  ORDER BY
    trending_score DESC,
    published_at DESC
  LIMIT result_limit;
$$;

-- ─── Row Level Security ──────────────────────────────────────────────────────

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Articles are publicly readable"
  ON articles FOR SELECT USING (true);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only read own data"
  ON users FOR SELECT USING (auth.uid() = id);

-- ─── Sample Sources Seed ────────────────────────────────────────────────────

INSERT INTO sources (name, rss_url, region) VALUES
  ('CitiNews',          'https://citinewsroom.com/feed/',                         'ghana'),
  ('JoyOnline',         'https://www.myjoyonline.com/feed/',                      'ghana'),
  ('GhanaWeb',          'https://www.ghanaweb.com/GhanaHomePage/rss/index.php',  'ghana'),
  ('Graphic Online',    'https://www.graphic.com.gh/feed/rss',                    'ghana'),
  ('Ghana Business',    'https://www.ghanabusinessnews.com/feed/',                'ghana'),
  ('BBC Africa',        'http://feeds.bbci.co.uk/news/world/africa/rss.xml',      'africa'),
  ('Reuters Africa',    'https://feeds.reuters.com/reuters/AFRICANews',           'africa');
