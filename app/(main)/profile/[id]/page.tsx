import { Metadata } from 'next';

import { Profile } from '@/components/features';
import { getUserWithProfile } from '@/app/hooks';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const userWithProfile = await getUserWithProfile();

    return {
      title: userWithProfile.username,
    };
  } catch (error) {
    console.error('Metadata error:', error);
    return {
      title: 'Profile not found',
    };
  }
}

export default async function ProfilePage() {
  const userWithProfile = await getUserWithProfile();

  return (
    <main>
      <Profile profile={userWithProfile} />
    </main>
  );
}
