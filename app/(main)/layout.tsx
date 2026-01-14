import { Metadata } from 'next';

import { Footer, Header } from '@/components/common';
import { Search } from '@/components/features';
import { UserPanelServer } from '@/components/common/UserPanel/UserPanelServer';

export const metadata: Metadata = {
  title: 'Главная',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Header />
      <div className="ml-[150px] flex min-h-screen w-full flex-col gap-[15px] p-[15px]">
        <div className="flex items-center justify-between">
          <Search />
          <UserPanelServer />
        </div>
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
