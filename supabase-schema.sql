-- Math Mastery: Supabase Schema
-- Run this in the Supabase SQL editor to set up your database

-- Students table
create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references auth.users(id) on delete cascade,
  name text not null,
  grade_level int default 1,
  assessment_complete boolean default false,
  created_at timestamptz default now()
);

-- Skill scores table
create table if not exists skill_scores (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  skill_id text not null,
  mastery text default 'not_started',
  total_attempts int default 0,
  total_correct int default 0,
  recent_attempts jsonb default '[]',
  last_attempted timestamptz,
  first_mastered_at timestamptz,
  next_review_at timestamptz,
  unique(student_id, skill_id)
);

-- Sessions table
create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  session_type text not null,
  started_at timestamptz default now(),
  duration_seconds int,
  problems_attempted int default 0,
  problems_correct int default 0,
  skill_breakdown jsonb default '[]'
);

-- Indexes
create index if not exists idx_students_parent on students(parent_id);
create index if not exists idx_skill_scores_student on skill_scores(student_id);
create index if not exists idx_sessions_student on sessions(student_id);

-- Row Level Security
alter table students enable row level security;
alter table skill_scores enable row level security;
alter table sessions enable row level security;

-- Students: parent can only see their own students
create policy "Users can view own students"
  on students for select
  using (parent_id = auth.uid());

create policy "Users can insert own students"
  on students for insert
  with check (parent_id = auth.uid());

create policy "Users can update own students"
  on students for update
  using (parent_id = auth.uid());

-- Skill scores: accessible via student ownership
create policy "Users can view own skill scores"
  on skill_scores for select
  using (student_id in (select id from students where parent_id = auth.uid()));

create policy "Users can insert own skill scores"
  on skill_scores for insert
  with check (student_id in (select id from students where parent_id = auth.uid()));

create policy "Users can update own skill scores"
  on skill_scores for update
  using (student_id in (select id from students where parent_id = auth.uid()));

-- Sessions: accessible via student ownership
create policy "Users can view own sessions"
  on sessions for select
  using (student_id in (select id from students where parent_id = auth.uid()));

create policy "Users can insert own sessions"
  on sessions for insert
  with check (student_id in (select id from students where parent_id = auth.uid()));
