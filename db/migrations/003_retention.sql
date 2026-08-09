DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enquiries' AND column_name = 'privacy_consent_at'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enquiries' AND column_name = 'privacy_notice_acknowledged_at'
  ) THEN
    ALTER TABLE enquiries RENAME COLUMN privacy_consent_at TO privacy_notice_acknowledged_at;
  END IF;
END $$;

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS last_activity_at timestamptz;
UPDATE enquiries SET last_activity_at = created_at WHERE last_activity_at IS NULL;
ALTER TABLE enquiries ALTER COLUMN last_activity_at SET DEFAULT now();
ALTER TABLE enquiries ALTER COLUMN last_activity_at SET NOT NULL;

CREATE INDEX IF NOT EXISTS enquiries_retention_idx ON enquiries (lead_status, last_activity_at);
