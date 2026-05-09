/**
 * Database service — wraps Supabase calls.
 * Falls back to localStorage if Supabase is unavailable.
 */
import { supabase, type QuoteRequest, type ContactRequest, type Offer, type NegotiationEntry } from './supabase';

// ─── Quote Requests ──────────────────────────────────────────────────────────

export async function saveQuoteRequest(data: Omit<QuoteRequest, 'id' | 'created_at'>): Promise<void> {
  const { error } = await supabase.from('quote_requests').insert([data]);
  if (error) {
    console.error('Supabase error, falling back to localStorage:', error);
    // Fallback
    const existing = JSON.parse(localStorage.getItem('quoteRequests') || '[]');
    localStorage.setItem('quoteRequests', JSON.stringify([...existing, { ...data, id: Date.now(), createdAt: new Date().toISOString() }]));
  }
}

export async function getQuoteRequests(): Promise<QuoteRequest[]> {
  const { data, error } = await supabase.from('quote_requests').select('*').order('created_at', { ascending: false });
  if (error || !data) {
    console.error('Supabase error, falling back to localStorage:', error);
    return JSON.parse(localStorage.getItem('quoteRequests') || '[]');
  }
  return data;
}

export async function updateQuoteRequest(id: number, updates: Partial<QuoteRequest>): Promise<void> {
  const { error } = await supabase.from('quote_requests').update(updates).eq('id', id);
  if (error) console.error('Update error:', error);
}

export async function deleteQuoteRequest(id: number): Promise<void> {
  const { error } = await supabase.from('quote_requests').delete().eq('id', id);
  if (error) console.error('Delete error:', error);
}

// ─── Contact Requests ────────────────────────────────────────────────────────

export async function saveContactRequest(data: Omit<ContactRequest, 'id' | 'created_at'>): Promise<void> {
  const { error } = await supabase.from('contact_requests').insert([data]);
  if (error) {
    console.error('Supabase error, falling back to localStorage:', error);
    const existing = JSON.parse(localStorage.getItem('contactRequests') || '[]');
    localStorage.setItem('contactRequests', JSON.stringify([...existing, { ...data, id: Date.now(), createdAt: new Date().toISOString() }]));
  }
}

export async function getContactRequests(): Promise<ContactRequest[]> {
  const { data, error } = await supabase.from('contact_requests').select('*').order('created_at', { ascending: false });
  if (error || !data) {
    return JSON.parse(localStorage.getItem('contactRequests') || '[]');
  }
  return data;
}

export async function updateContactRequest(id: number, updates: Partial<ContactRequest>): Promise<void> {
  const { error } = await supabase.from('contact_requests').update(updates).eq('id', id);
  if (error) console.error('Update error:', error);
}

export async function deleteContactRequest(id: number): Promise<void> {
  const { error } = await supabase.from('contact_requests').delete().eq('id', id);
  if (error) console.error('Delete error:', error);
}

// ─── Offers ──────────────────────────────────────────────────────────────────

export async function createOffer(data: Omit<Offer, 'id' | 'created_at' | 'updated_at'>): Promise<Offer | null> {
  const { data: result, error } = await supabase.from('offers').insert([data]).select().single();
  if (error) { console.error('Create offer error:', error); return null; }
  // Add initial history entry
  if (result) {
    await addNegotiationEntry({
      offer_id: result.id!,
      type: 'admin_offer',
      amount: data.original_amount,
      message: data.description,
      author: 'admin',
    });
  }
  return result;
}

export async function getOffers(): Promise<Offer[]> {
  const { data, error } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
  if (error || !data) return [];
  return data;
}

export async function getUserOffers(userId: string): Promise<Offer[]> {
  const { data, error } = await supabase.from('offers').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error || !data) return [];
  return data;
}

export async function getOfferById(id: number): Promise<Offer | null> {
  const { data, error } = await supabase.from('offers').select('*').eq('id', id).single();
  if (error || !data) return null;
  return data;
}

export async function updateOffer(id: number, updates: Partial<Offer>): Promise<void> {
  const { error } = await supabase.from('offers').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id);
  if (error) console.error('Update offer error:', error);
}

// ─── Negotiation History ─────────────────────────────────────────────────────

export async function addNegotiationEntry(data: Omit<NegotiationEntry, 'id' | 'created_at'>): Promise<void> {
  const { error } = await supabase.from('negotiation_history').insert([data]);
  if (error) console.error('Add history error:', error);
}

export async function getNegotiationHistory(offerId: number): Promise<NegotiationEntry[]> {
  const { data, error } = await supabase.from('negotiation_history').select('*').eq('offer_id', offerId).order('created_at', { ascending: true });
  if (error || !data) return [];
  return data;
}
