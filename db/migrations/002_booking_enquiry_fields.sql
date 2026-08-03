ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS last_name text;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS event_type text;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS year_size integer;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS attendance_band text;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS preferred_location text;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS referral_source text;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS referral_other text;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS joining_schools text;

CREATE INDEX IF NOT EXISTS enquiries_event_type_idx ON enquiries (event_type);
CREATE INDEX IF NOT EXISTS enquiries_preferred_date_idx ON enquiries (preferred_date);
