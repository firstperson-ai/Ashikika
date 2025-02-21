import { createClient } from '@supabase/supabase-js';

let supabase = null;

// Check if running in preview mode (mock) or production
const isPreviewMode = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';
const supabaseUrl = isPreviewMode ? null : process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = isPreviewMode ? null : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!isPreviewMode && supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = {
  // Mock methods for preview mode
  auth: {
    signInWithPassword: async () => ({ error: null, data: { user: { id: 'mock-user-id', email: 'user@example.com' } } }),
    signOut: async () => ({ error: null }),
    signUp: async () => ({ error: null, data: { user: { id: 'mock-user-id', email: 'user@example.com' } } }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        data: [], // Mock data
      }),
    }),
  }),
  // Add more mock methods as needed
};

export function useSupabase() {
  const user = { id: 'mock-user-id', email: 'user@example.com' }; // Mock user for preview
  return {
    supabase: isPreviewMode ? supabase : (supabase || createClient(supabaseUrl, supabaseAnonKey)),
    user,
    async getUser() {
      return user; // Mock user data
    },
  };
}
