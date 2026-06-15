-- Unified table for all blog post surveys (scale, choice, etc.)
CREATE TABLE IF NOT EXISTS blog_survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  survey_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  numeric_value INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT blog_survey_numeric_range CHECK (
    numeric_value IS NULL OR (numeric_value >= 0 AND numeric_value <= 100)
  )
);

CREATE INDEX IF NOT EXISTS idx_blog_survey_post_survey
  ON blog_survey_responses(post_slug, survey_id);

CREATE INDEX IF NOT EXISTS idx_blog_survey_survey_id
  ON blog_survey_responses(survey_id);

ALTER TABLE blog_survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blog survey responses"
  ON blog_survey_responses FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit blog survey response"
  ON blog_survey_responses FOR INSERT
  WITH CHECK (
    post_slug IS NOT NULL
    AND survey_id IS NOT NULL
    AND answer IS NOT NULL
  );

-- Migrate legacy health survey data if present
INSERT INTO blog_survey_responses (post_slug, survey_id, answer, numeric_value, created_at)
SELECT
  post_slug,
  'health-data-sharing',
  score::text,
  score,
  created_at
FROM health_data_survey_responses
WHERE EXISTS (
  SELECT 1 FROM information_schema.tables
  WHERE table_schema = 'public' AND table_name = 'health_data_survey_responses'
);

DROP POLICY IF EXISTS "Anyone can read survey responses" ON health_data_survey_responses;
DROP POLICY IF EXISTS "Anyone can submit survey response" ON health_data_survey_responses;
DROP TABLE IF EXISTS health_data_survey_responses;
