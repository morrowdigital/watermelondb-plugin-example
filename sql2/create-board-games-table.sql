create table board_games (
  id uuid not null default gen_random_uuid(),
  primary key (id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone default null,
  server_created_at timestamp with time zone not null default now(),
  last_modified_at timestamp with time zone not null default now(),
  title character varying not null,
  min_players integer not null default 1
);
-- alter table profiles enable row level security;
-- create policy "profiles are viewable by everyone." on profiles for
-- select using (true);
-- create policy "users can insert their own profile." on profiles for
-- insert with check (auth.uid() = user_id);
-- create policy "users can update their own profile." on profiles for
-- update using (auth.uid() = user_id);