/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js';

const authUrl = import.meta.env.VITE_AUTH_SUPABASE_URL as string;
const authKey = import.meta.env.VITE_AUTH_SUPABASE_KEY as string;

export const supabaseAuth = createClient(authUrl, authKey);
