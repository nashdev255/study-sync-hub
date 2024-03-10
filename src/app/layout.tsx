import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StudySyncHub | みんなで創ろう。学びに「同期」とよりよい学習体験を。',
  description: 'StudySyncHubは勉強の効率化と管理、モチベーションの上昇に加え、勉強に関する記事や本を投稿できるコミュニティを提供するサービスです。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
