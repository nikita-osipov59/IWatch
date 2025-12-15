import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';

import '@/styles/globals.css';

import { Footer, Header } from '@/components/common';
import { SITE_DESCRIPTION, SITE_NAME } from '@/constants';
import { TanstackProvider } from '@/providers';
import { Search } from '@/components/features';

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  weight: ['300', '400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${firaCode.variable} container antialiased`}>
        <TanstackProvider>
          <div className="flex">
            <Header />
            <div className="ml-[150px] flex min-h-screen w-full flex-col gap-[15px] p-[15px]">
              <Search />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </div>
          <Analytics mode={'production'} />
        </TanstackProvider>
      </body>
    </html>
  );
}
