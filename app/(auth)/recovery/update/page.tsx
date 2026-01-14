'use client';

import { Suspense } from 'react';

import { RecoveryVerify, UpdatePasswordForm } from '@/components/features';
import { BorderPanel } from '@/components/common';

export default function UpdatePasswordPage() {
  return (
    <BorderPanel>
      <Suspense fallback={<div>Проверка ссылки...</div>}>
        <RecoveryVerify />
      </Suspense>
      <UpdatePasswordForm />
    </BorderPanel>
  );
}
