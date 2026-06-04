/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  'https://qdylukvzmbaqcrtcgixo.supabase.co';

const supabaseKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ||
  'sb_publishable_fLoOkcMtesgVIXj7NvTLwg_nVCIeBsM';

export const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Types matching our DB tables ───────────────────────────────────────────

export interface QuoteRequest {
  id?: number;
  name: string;
  phone: string;
  email: string;
  service_type: string;
  pickup_location: string;
  delivery_location: string;
  load_details: string;
  preferred_date: string;
  quantity?: string;
  unit?: string;
  steel_type?: string;
  steel_grade?: string;
  sand_type?: string;
  sand_grade?: string;
  material_type?: string;
  vehicle_type?: string;
  status: 'new' | 'contacted' | 'completed';
  admin_note?: string;
  offer?: string;
  sent_via_whatsapp?: boolean;
  created_at?: string;
}

export interface ContactRequest {
  id?: number;
  name: string;
  phone: string;
  email: string;
  service_type: string;
  message: string;
  status: 'new' | 'contacted' | 'completed';
  admin_note?: string;
  created_at?: string;
}

export interface Offer {
  id?: number;
  user_id: string;
  user_name: string;
  title: string;
  description: string;
  original_amount: number;
  current_amount: number;
  counter_amount?: number;
  counter_message?: string;
  admin_notes?: string;
  expiry_date?: string;
  status: 'pending' | 'counter_sent' | 'accepted' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export interface NegotiationEntry {
  id?: number;
  offer_id: number;
  type: 'admin_offer' | 'user_counter' | 'admin_response' | 'status_update';
  amount?: number;
  message: string;
  author: 'admin' | 'user';
  created_at?: string;
}
