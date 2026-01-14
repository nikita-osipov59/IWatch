'use server';

import { SignUpForm } from '@/components/features';
import { ROUTER_PATH } from '@/constants';
import { createServer } from '@/utils/supabase';

export const recoveryPasswordForEmail = async (data: Pick<SignUpForm, 'email'>) => {
  const supabase = await createServer();

  const email = data.email;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTER_PATH.UPDATEPASSWORD}`,
  });

  if (error) {
    return { error: error.message };
  }
};

export const updatePasswordForEmail = async (data: Pick<SignUpForm, 'password'>) => {
  const supabase = await createServer();

  const password = data.password;

  const { error } = await supabase.auth.updateUser({ password: password });

  if (error) {
    return { error: error.message };
  }
};
