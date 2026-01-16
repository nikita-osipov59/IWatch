import { Metadata } from 'next';

import { BorderPanel, Footer, Header, UserPanelExtended } from '@/components/common';
import { Search } from '@/components/features';
import { getUser } from '@/app/hooks';

export const metadata: Metadata = {
  title: 'Главная',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    return <BorderPanel>Перезагрузите страницу!</BorderPanel>;
  }

  return (
    <div className="flex">
      <Header />
      <div className="ml-[150px] flex min-h-screen w-full flex-col gap-[15px] p-[15px]">
        <div className="flex items-center justify-between">
          <Search />
          <UserPanelExtended user={user} />
        </div>
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
