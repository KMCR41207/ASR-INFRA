/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js';

// ASR Infra OTP project — publishable keys (safe for frontend)
const authUrl = 'https://hxlhlcsdffixcypiiiuc.supabase.co';
const authKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bGhsY3NkZmZpeGN5cGlpaXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MjgyMTQsImV4cCI6MjA5NjEwNDIxNH0.1EIx9Jt-vkKNs1FpGUKqTQ2AiDpvycX_wuLZp4g05n0';

export const supabaseAuth = createClient(authUrl, authKey);
