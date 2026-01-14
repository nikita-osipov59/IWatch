import { Metadata } from 'next';

import { RecoveryPasswordForm } from '@/components/features';
import { BorderPanel } from '@/components/common';

export const metadata: Metadata = {
  title: 'Восстановление пароля',
};

export default function RecoveryPasswordPage() {
  return (
    <BorderPanel>
      <RecoveryPasswordForm />
    </BorderPanel>
  );
}
