import { getUser } from '@/app/hooks';
import { SettingsList, SettingsProfile } from '@/components/features';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Настройки',
};

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const user = await getUser();
  const resolvedParams = await searchParams;
  const tab = resolvedParams.tab || 'profile';

  return (
    <main className="flex flex-col gap-[15px]">
      <SettingsList />
      {tab === 'profile' && user && <SettingsProfile user={user} />}
    </main>
  );
}
