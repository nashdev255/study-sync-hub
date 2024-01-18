-- progresses table declaration
create table if not exists public.progresses (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) default auth.uid(),
  subject_id text,
  content text,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

-- Enable RLS for progresses table
alter table public.progresses enable row level security;

-- Read policy for progress
create policy "All users can read all progresses" on public.progresses
  for select using (true);

-- Write policy for progresses
create policy "Users can modify only their own progresses" on public.progresses
  for all using (user_id = current_user_id())
  with check (user_id = current_user_id())
  