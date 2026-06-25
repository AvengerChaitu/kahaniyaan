-- Run this in Supabase SQL editor

create table if not exists referrals (
  id            uuid        default gen_random_uuid() primary key,
  referrer_id   text        not null,          -- clerk_user_id of the person who shared
  referee_id    text        unique,             -- clerk_user_id of the person who signed up
  code          text        unique not null,    -- short code e.g. "abc12"
  status        text        default 'pending',  -- pending | completed
  bonus_stories int         default 0,         -- stories rewarded to referrer
  created_at    timestamptz default now(),
  completed_at  timestamptz
);

create index if not exists referrals_referrer_idx on referrals(referrer_id);
create index if not exists referrals_code_idx     on referrals(code);
