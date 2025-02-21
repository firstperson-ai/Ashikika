import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'mock';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function useSupabase() {
  const user = { id: 'mock-user-id', email: 'user@example.com' }; // Mock user for preview
  return {
    supabase,
    user,
    async getUser() {
      return user; // Mock user data
    },
  };
}