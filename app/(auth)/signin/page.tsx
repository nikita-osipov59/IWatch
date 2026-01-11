import { Metadata } from 'next';

import { SignInForm } from '@/components/features';
import { BorderPanel } from '@/components/common';

export const metadata: Metadata = {
  title: 'Логин',
};

export default function SignInPage() {
  return (
    <BorderPanel>
      <SignInForm />
    </BorderPanel>
  );
}
