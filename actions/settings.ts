'use server';

import { getUser } from '@/app/hooks';
import { SettingsProfileForm, SettingsSecurityForm } from '@/components/features';
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

export const updateUserName = async (data: SettingsProfileForm) => {
  const supabase = await createServer();
  const user = await getUser();

  const { error } = await supabase
    .from('profiles')
    .update({
      username: data.username,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user?.id);

  if (error) {
    return { error: error.message };
  }
};
