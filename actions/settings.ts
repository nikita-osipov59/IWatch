'use server';

import { SettingsSecurityForm } from '@/components/features';
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

export const updateEmailAndPassword = async (data: SettingsSecurityForm) => {
  const supabase = await createServer();

  const { error } = await supabase.auth.updateUser({ password: data.password, email: data.email });

  if (error) {
    return { error: error.message };
  }
};
