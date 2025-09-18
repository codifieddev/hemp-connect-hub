-- Initial schema for HEMP Connect Hub
-- Tables: users, mentors, mentees, fellows, counselors, events

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  role text not null check (role in ('mentee','mentor','fellow','counselor','admin')),
  created_at timestamptz not null default now()
);

create table if not exists mentors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  bio text,
  expertise text[],
  availability boolean default true,
  links jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists mentees (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  bio text,
  interests text[],
  goals text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists fellows (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  bio text,
  program text,
  cohort text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists counselors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  bio text,
  specialization text[],
  availability_hours text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date timestamptz not null,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- triggers to keep updated_at fresh
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger mentors_set_updated_at before update on mentors
for each row execute procedure set_updated_at();

create trigger mentees_set_updated_at before update on mentees
for each row execute procedure set_updated_at();

create trigger fellows_set_updated_at before update on fellows
for each row execute procedure set_updated_at();

create trigger counselors_set_updated_at before update on counselors
for each row execute procedure set_updated_at();
