-- users table declaration
create table public.users (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  name text,
  bio text,
  age 
  avatar_url text
);

-- users table RLS config
alter table public.users enable row level security;
create policy "Allow select for all users" on public.users for select using (true);
create policy "Allow update for all users" on public.users for update using (true);

-- create a new user table when signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email) values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- trigger of handle_new_user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- storage config for avatar_url
insert into storage.buckets (id, name, public) values ('user', 'user', true);
create policy "Allow select for all users" on storage.objects for select using ( bucket_id = 'user' );
create policy "Allow insert for login users" on storage.objects for insert with check (bucket_id = 'user' AND auth.role() = 'authenticated');
create policy "update own avatar_url" on storage.objects for update with check (bucket_id = 'user' AND auth.uid() = owner);
create policy "delete own avatar_url" on storage.objects for delete using ( bucket_id = 'user' AND auth.uid() = owner );
