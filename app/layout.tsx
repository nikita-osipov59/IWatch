import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';

import '@/styles/globals.css';

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants';
import { TanstackProvider } from '@/providers';

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
          <div className="h-screen">{children}</div>
          <Analytics mode={'production'} />
        </TanstackProvider>
      </body>
    </html>
  );
}
