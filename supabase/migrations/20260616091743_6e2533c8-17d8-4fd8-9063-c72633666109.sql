CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  page_url TEXT,
  referrer TEXT,
  device TEXT,
  user_agent TEXT,
  timezone TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  notifications JSONB NOT NULL DEFAULT '{}'::jsonb
);

GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- No public policies: the public submit-lead edge function uses the service role.
-- Reads require the service role; this prevents anyone from listing leads from the client.

CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX leads_email_idx ON public.leads (email);
