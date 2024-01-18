-- subjects type declaration
create type types.subjects as enum (
  '国語', '数学', '英語'
);

-- progresses table declaration
create table if not exists public.progresses (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) default auth.uid(),
  subject types.subjects,
  content text,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null
);
