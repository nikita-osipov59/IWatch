import { createServer } from '@/utils/supabase';
import { getUser } from './getUser';
import { TProfile } from '@/types';

export const getUserWithProfile = async (): Promise<TProfile> => {
  const user = await getUser();

  const supabase = await createServer();
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user?.id).single();

  return profile;
};
