import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/reset.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IWatch",
  description: "Movie app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${firaCode.variable} antialiased container`}>
        {children}
      </body>
    </html>
  );
}
