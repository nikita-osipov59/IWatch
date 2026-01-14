'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';

import { UpdatePasswordForm } from '@/components/features';
import { BorderPanel } from '@/components/common';

export default function UpdatePasswordPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyRecovery = async () => {
      const code = searchParams.get('code');

      if (!code) {
        return <BorderPanel>Отсутствует код</BorderPanel>;
      }

      const supabase = createClient();

      const { error } = await supabase.auth.verifyOtp({
        type: 'recovery' as const,
        token_hash: code,
      });

      if (error) {
        console.log(error.message);
      }
    };

    verifyRecovery();
  }, [searchParams]);

  return (
    <BorderPanel>
      <UpdatePasswordForm />
    </BorderPanel>
  );
}
