
CREATE TABLE public.telegram_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id TEXT NOT NULL UNIQUE,
  label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.telegram_chats TO authenticated;
GRANT ALL ON public.telegram_chats TO service_role;
ALTER TABLE public.telegram_chats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth read telegram_chats" ON public.telegram_chats FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth insert telegram_chats" ON public.telegram_chats FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth delete telegram_chats" ON public.telegram_chats FOR DELETE TO authenticated USING (true);
