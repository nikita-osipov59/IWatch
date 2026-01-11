import { Metadata } from 'next';

import { SignUpForm } from '@/components/features';
import { BorderPanel } from '@/components/common';

export const metadata: Metadata = {
  title: 'Регистрация',
};

export default function SignUpPage() {
  return (
    <BorderPanel>
      <SignUpForm />
    </BorderPanel>
  );
}
