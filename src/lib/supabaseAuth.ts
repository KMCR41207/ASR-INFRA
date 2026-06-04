/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js';

// Auth project credentials (publishable — safe for frontend)
const authUrl =
  (import.meta.env.VITE_AUTH_SUPABASE_URL as string) ||
  'https://hxlhcsdffixcypliiuc.supabase.co';

const authKey =
  (import.meta.env.VITE_AUTH_SUPABASE_KEY as string) ||
  'sb_publishable_FJa_fOrtsixejNTXpXFgaA_J6nLBpZz';

export const supabaseAuth = createClient(authUrl, authKey);
