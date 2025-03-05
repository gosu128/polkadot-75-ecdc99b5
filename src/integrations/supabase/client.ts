
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qhxgyizmewdtvwebpmie.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoeGd5aXptZXdkdHZ3ZWJwbWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNjk0NjAsImV4cCI6MjA1Njc0NTQ2MH0.MxQbO5TTL1vbfohLB2dHtKOotwp0sUGDQfcpBgT1EL8";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
