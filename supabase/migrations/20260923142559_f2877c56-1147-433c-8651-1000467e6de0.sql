
CREATE TABLE public.sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_domain text,
  shop_logo_url text,
  customer_email text,
  amount_cents integer,
  currency text NOT NULL DEFAULT 'EUR',
  phone text,
  plan text,
  method text,
  bank_slug text,
  bank_name text,
  status text NOT NULL DEFAULT 'pending',
  return_url text,
  webhook_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sessions TO authenticated;
GRANT ALL ON public.sessions TO service_role;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read sessions" ON public.sessions FOR SELECT TO authenticated USING (true);

CREATE TABLE public.session_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  type text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.session_events TO authenticated;
GRANT ALL ON public.session_events TO service_role;
ALTER TABLE public.session_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read session_events" ON public.session_events FOR SELECT TO authenticated USING (true);
CREATE INDEX session_events_session_id_idx ON public.session_events(session_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON public.sessions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
