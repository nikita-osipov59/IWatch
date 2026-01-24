import { Metadata } from 'next';

import { getUser } from '@/app/hooks';
import { SettingsList, SettingsProfile, SettingsSecurity } from '@/components/features';

export const metadata: Metadata = {
  title: 'Настройки',
};

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const user = await getUser();
  // const userWithProfile = await getUserWithProfile();
  const resolvedParams = await searchParams;
  const tab = resolvedParams.tab || 'profile';

  return (
    <main className="flex flex-col gap-[15px]">
      <SettingsList />
      {tab === 'security' && user && <SettingsSecurity user={user} />}
      {tab === 'profile' && user && <SettingsProfile />}
    </main>
  );
}
