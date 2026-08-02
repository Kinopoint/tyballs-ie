CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  school text NOT NULL,
  county text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  estimated_attendance integer NOT NULL,
  preferred_date date,
  date_flexibility text NOT NULL,
  priorities text[] NOT NULL DEFAULT '{}',
  message text,
  privacy_consent_at timestamptz NOT NULL,
  marketing_consent boolean NOT NULL DEFAULT false,
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  gclid text,
  fbclid text,
  lead_status text NOT NULL DEFAULT 'new' CHECK (lead_status IN ('new', 'contacted', 'qualified', 'quote_sent', 'booked', 'lost')),
  notification_status text NOT NULL DEFAULT 'pending' CHECK (notification_status IN ('pending', 'sent', 'failed')),
  notification_error text,
  request_hash text NOT NULL
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_email_idx ON enquiries (lower(email));
CREATE INDEX IF NOT EXISTS enquiries_request_hash_idx ON enquiries (request_hash, created_at DESC);

CREATE TABLE IF NOT EXISTS submission_windows (
  request_hash text NOT NULL,
  window_started_at timestamptz NOT NULL,
  submissions integer NOT NULL DEFAULT 1,
  PRIMARY KEY (request_hash, window_started_at)
);

CREATE INDEX IF NOT EXISTS submission_windows_started_idx ON submission_windows (window_started_at);
