import { useEffect, useState } from 'react';
import { supabase, useSupabase as useSupabaseUtil } from '../utils/supabase';

export function useSupabase() {
  const [user, setUser] = useState(null);
  const { supabase } = useSupabaseUtil();

  useEffect(() => {
    const fetchUser = async () => {
      const mockUser = { id: 'mock-user-id', email: 'user@example.com' }; // Mock user for preview
      setUser(mockUser);
    };
    fetchUser();
  }, []);

  return {
    supabase,
    user,
  };
}