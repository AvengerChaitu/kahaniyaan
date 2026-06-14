-- Run this in Supabase Dashboard → SQL Editor
-- ============================================

-- 1. Story templates (pre-written stories with {childname} placeholders)
CREATE TABLE IF NOT EXISTS story_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  language TEXT NOT NULL,
  age_group TEXT NOT NULL DEFAULT '5-6',
  theme TEXT NOT NULL,
  body TEXT NOT NULL,
  moral TEXT DEFAULT '',
  reading_time_mins INTEGER DEFAULT 3,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_story_templates_lookup ON story_templates (language, age_group, theme);

-- 2. User usage tracking (free tier limit + paid status)
CREATE TABLE IF NOT EXISTS user_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT UNIQUE NOT NULL,
  story_count INTEGER DEFAULT 0,
  month TEXT NOT NULL,
  is_paid BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_usage_clerk ON user_usage (clerk_user_id, month);

-- 3. RLS: allow public reads for story_templates (used by anon key)
ALTER TABLE story_templates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_can_read_templates" ON story_templates;
CREATE POLICY "anon_can_read_templates" ON story_templates FOR SELECT USING (true);

-- 4. RLS: allow service role full access for user_usage
ALTER TABLE user_usage ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_role_all" ON user_usage;
CREATE POLICY "service_role_all" ON user_usage USING (true) WITH CHECK (true);

-- 5. Saved stories table
CREATE TABLE IF NOT EXISTS stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  language TEXT NOT NULL,
  theme TEXT NOT NULL,
  child_name TEXT NOT NULL,
  age TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stories_user ON stories (clerk_user_id);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_role_all_stories" ON stories;
CREATE POLICY "service_role_all_stories" ON stories USING (true) WITH CHECK (true);
