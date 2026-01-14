import { createServer } from '@/utils/supabase';

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
