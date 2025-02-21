import { createClient } from '@supabase/supabase-js';

// Initialize supabase as null or a mock object, using a single let declaration
let supabaseInstance = null;

// Check if running in preview mode (mock) or production
const isPreviewMode = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';
const supabaseUrl = isPreviewMode ? null : process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = isPreviewMode ? null : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Conditionally create Supabase client or use mock
if (!isPreviewMode && supabaseUrl && supabaseAnonKey) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} else {
  supabaseInstance = {
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
  };
}

// Export a single supabase instance, avoiding redefinition
export const supabase = supabaseInstance;

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
