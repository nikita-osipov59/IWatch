import { createServer } from '@/utils/supabase';
import { type User } from '@supabase/supabase-js';

export type TUser = {
  user: User;
};

export const getUser = async () => {
  const supabase = await createServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.log(error.message);
    return null;
  }

  return user;
};
