-- pushME 初始 schema（阶段 0）
-- 在 Supabase Dashboard → SQL Editor 中整段执行

-- profiles：用户配置（对应 config.md）
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  work_context text,
  available_hours jsonb default '{}',
  energy_pattern jsonb default '{}',
  priority_rules text,
  procrastination_patterns text,
  theme text not null default 'modern' check (theme in ('modern', 'xiuxian')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- tasks：任务（任务榜 + current/backlog）
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  priority text check (priority in ('S', 'A', 'B', 'C')),
  title text not null,
  detail text,
  next_step text,
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'blocked', 'done')),
  deadline timestamptz,
  time_box_minutes integer,
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_user_id_idx on public.tasks (user_id);

-- plans：拆解步骤（对应 plans/）
create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  task_id uuid references public.tasks (id) on delete cascade,
  title text,
  steps jsonb not null default '[]',
  milestone text,
  estimated_minutes integer,
  verification_criteria text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists plans_user_id_idx on public.plans (user_id);

-- check_ins：每日对齐（对应 check-ins/）
create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  check_in_date date not null default current_date,
  type text check (type in ('morning', 'evening', 'weekly')),
  planned text,
  actual text,
  deviation text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists check_ins_user_id_idx on public.check_ins (user_id);

-- evaluations：复盘评估
create table if not exists public.evaluations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  task_id uuid references public.tasks (id) on delete set null,
  completion_score smallint check (completion_score between 0 and 100),
  efficiency_notes text,
  deviation_analysis text,
  reusable_lessons text,
  created_at timestamptz not null default now()
);

create index if not exists evaluations_user_id_idx on public.evaluations (user_id);

-- patterns：跨任务规律（对应 patterns.md，每用户一行）
create table if not exists public.patterns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  content text,
  updated_at timestamptz not null default now()
);

-- messages：对话原文存档
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  session_id text,
  created_at timestamptz not null default now()
);

create index if not exists messages_user_id_idx on public.messages (user_id);

-- inspirations：灵感库
create table if not exists public.inspirations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text,
  content text,
  source text,
  created_at timestamptz not null default now()
);

create index if not exists inspirations_user_id_idx on public.inspirations (user_id);

-- 新用户自动创建 profile
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email)
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.plans enable row level security;
alter table public.check_ins enable row level security;
alter table public.evaluations enable row level security;
alter table public.patterns enable row level security;
alter table public.messages enable row level security;
alter table public.inspirations enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create policy "tasks_all_own" on public.tasks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "plans_all_own" on public.plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "check_ins_all_own" on public.check_ins
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "evaluations_all_own" on public.evaluations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "patterns_all_own" on public.patterns
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "messages_all_own" on public.messages
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "inspirations_all_own" on public.inspirations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
