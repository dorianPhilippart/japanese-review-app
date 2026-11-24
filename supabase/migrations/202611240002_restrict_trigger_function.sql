-- This function is only invoked by database triggers.
-- Prevent API roles from calling it directly.
revoke execute on function public.set_updated_at() from public, anon, authenticated;
