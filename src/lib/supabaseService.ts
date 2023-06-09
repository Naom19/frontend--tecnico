import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://niihxbuvokefzlneewln.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5paWh4YnV2b2tlZnpsbmVld2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYwOTg3NjcsImV4cCI6MjAwMTY3NDc2N30.GzuAsLnfAkTQJBPRake-KyrXyJi0CsUVbFeKPEuKTfI';

export const supabase = createClient(supabaseUrl, supabaseKey);