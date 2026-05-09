-- ============================================================
-- ASR INFRA — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Quote Requests Table
create table if not exists quote_requests (
  id bigserial primary key,
  name text not null,
  phone text not null,
  email text not null,
  service_type text not null,
  pickup_location text,
  delivery_location text,
  load_details text,
  preferred_date text,
  quantity text,
  unit text,
  steel_type text,
  steel_grade text,
  sand_type text,
  sand_grade text,
  material_type text,
  vehicle_type text,
  status text not null default 'new',
  admin_note text,
  offer text,
  sent_via_whatsapp boolean default false,
  created_at timestamptz default now()
);

-- Contact Requests Table
create table if not exists contact_requests (
  id bigserial primary key,
  name text not null,
  phone text not null,
  email text not null,
  service_type text,
  message text not null,
  status text not null default 'new',
  admin_note text,
  created_at timestamptz default now()
);

-- Offers Table
create table if not exists offers (
  id bigserial primary key,
  user_id text not null,
  user_name text,
  title text not null,
  description text,
  original_amount numeric not null,
  current_amount numeric not null,
  counter_amount numeric,
  counter_message text,
  admin_notes text,
  expiry_date text,
  status text not null default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Negotiation History Table
create table if not exists negotiation_history (
  id bigserial primary key,
  offer_id bigint references offers(id) on delete cascade,
  type text not null,
  amount numeric,
  message text not null,
  author text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security (open for now — tighten later)
alter table quote_requests enable row level security;
alter table contact_requests enable row level security;
alter table offers enable row level security;
alter table negotiation_history enable row level security;

-- Allow all operations (public access via publishable key)
create policy "Allow all on quote_requests" on quote_requests for all using (true) with check (true);
create policy "Allow all on contact_requests" on contact_requests for all using (true) with check (true);
create policy "Allow all on offers" on offers for all using (true) with check (true);
create policy "Allow all on negotiation_history" on negotiation_history for all using (true) with check (true);
