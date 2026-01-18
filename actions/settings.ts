'use server';

import { createServer } from '@/utils/supabase';

export const updateEmail = async (email: string) => {
  const supabase = await createServer();

  const { error } = await supabase.auth.updateUser({ email: email });

  if (error) {
    return { error: error.message };
  }
};

export const updatePassword = async (password: string) => {
  const supabase = await createServer();

  const { error } = await supabase.auth.updateUser({ password: password });

  if (error) {
    return { error: error.message };
  }
};
