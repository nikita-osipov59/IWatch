'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createServer } from '@/utils/supabase/server';

import { ROUTER_PATH } from '@/constants';
import { SignUpForm } from '@/components/features';

export const signUp = async (data: SignUpForm) => {
  const supabase = await createServer();

  const email = data.email;
  const password = data.password;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(ROUTER_PATH.HOME);
  redirect(ROUTER_PATH.HOME);
};

export const signIn = async (data: SignUpForm) => {
  const supabase = await createServer();

  const email = data.email;
  const password = data.password;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(ROUTER_PATH.HOME);
  redirect(ROUTER_PATH.HOME);
};

export const signOut = async () => {
  const supabase = await createServer();
  await supabase.auth.signOut();

  revalidatePath(ROUTER_PATH.HOME);
  redirect(ROUTER_PATH.SIGNIN);
};
