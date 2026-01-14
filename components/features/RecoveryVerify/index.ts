'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export const RecoveryVerify = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyRecovery = async () => {
      const code = searchParams.get('code');

      if (!code) return;

      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        type: 'recovery' as const,
        token_hash: code,
      });

      if (error) {
        console.error('Recovery error:', error.message);
      } else {
        console.log('✅ Recovery verified!');
      }
    };

    verifyRecovery();
  }, [searchParams]);

  return null;
};
