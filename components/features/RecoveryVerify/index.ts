'use client';

import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { createClient } from '@/utils/supabase/client';
import { ROUTER_PATH } from '@/constants';

export const RecoveryVerify = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyRecovery = async () => {
      const code = searchParams.get('code');

      if (!code) {
        redirect(ROUTER_PATH.RECOVERYPASSWORD);
      }

      const supabase = createClient();

      const { error } = await supabase.auth.verifyOtp({
        type: 'recovery' as const,
        token_hash: code,
      });

      if (error) {
        toast.error(error.message);
      }
    };

    verifyRecovery();
  }, [searchParams]);

  return null;
};
