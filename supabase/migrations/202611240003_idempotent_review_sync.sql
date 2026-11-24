alter table public.review_events
  add column if not exists client_event_id uuid not null default gen_random_uuid();

create unique index if not exists review_events_user_client_event_idx
  on public.review_events (user_id, client_event_id);

drop function if exists public.record_review(bigint, boolean, text);

create function public.record_review(
  p_vocabulary_id bigint,
  p_result boolean,
  p_mode text,
  p_client_event_id uuid
)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare
  current_user_id uuid := auth.uid();
  inserted_event_id bigint;
begin
  if current_user_id is null then raise exception 'Authentication required'; end if;
  if p_mode not in ('recognition', 'typing', 'mcq', 'quick', 'weak') then
    raise exception 'Invalid review mode';
  end if;

  insert into public.review_events
    (user_id, vocabulary_id, result, mode, client_event_id)
  values
    (current_user_id, p_vocabulary_id, p_result, p_mode, p_client_event_id)
  on conflict (user_id, client_event_id) do nothing
  returning id into inserted_event_id;

  if inserted_event_id is null then
    return false;
  end if;

  insert into public.user_progress
    (user_id, vocabulary_id, seen, correct, ease_factor, interval_days, due_at, last_reviewed_at)
  values
    (current_user_id, p_vocabulary_id, 1, case when p_result then 1 else 0 end,
     case when p_result then 2.60 else 2.30 end, case when p_result then 1 else 0 end,
     case when p_result then now() + interval '1 day' else now() + interval '10 minutes' end, now())
  on conflict (user_id, vocabulary_id) do update set
    seen = public.user_progress.seen + 1,
    correct = public.user_progress.correct + case when p_result then 1 else 0 end,
    ease_factor = least(3.50, greatest(1.30,
      public.user_progress.ease_factor + case when p_result then 0.10 else -0.20 end)),
    interval_days = case when p_result
      then least(3650, greatest(1, public.user_progress.interval_days * 2)) else 0 end,
    due_at = case when p_result
      then now() + make_interval(days => least(3650, greatest(1, public.user_progress.interval_days * 2)))
      else now() + interval '10 minutes' end,
    last_reviewed_at = now();

  return true;
end;
$$;

revoke all on function public.record_review(bigint, boolean, text, uuid) from public, anon;
grant execute on function public.record_review(bigint, boolean, text, uuid) to authenticated;
