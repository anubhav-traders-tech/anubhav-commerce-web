import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('CRITICAL ERROR: Missing Supabase environment variables!');
    console.error('Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
    console.warn('Authentication and database features will not work, but the UI will continue to load.');
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder-project.supabase.co',
    supabaseAnonKey || 'placeholder-anon-key'
);
