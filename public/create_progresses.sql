-- subjects table declaration
create table if not exists public.subjects (
  id serial primary key,
  name text not null unique
);

-- progresses table declaration
create table if not exists public.progresses (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) default auth.uid(),
  subject_id int references public.subjects(id),
  content text,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null
);
