import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { APP_CONFIG } from '@/lib/config';
import { FloatingNavBottom } from '@/components/layout/FloatingNavBottom';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: APP_CONFIG.metadata.title,
    template: `%s | ${APP_CONFIG.name}`
  },
  description: APP_CONFIG.metadata.description,
  keywords: [
    'private coding class',
    'kursus coding privat',
    'belajar bikin website',
    'belajar bikin aplikasi mobile',
    'bimbingan 1 on 1',
    'tutor coding',
    'mentoring pemrograman',
    'integrasi website mobile',
    'gemini pro'
  ],
  authors: [{ name: APP_CONFIG.name }],
  creator: APP_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: APP_CONFIG.metadata.siteUrl,
    title: APP_CONFIG.metadata.title,
    description: APP_CONFIG.metadata.description,
    siteName: APP_CONFIG.name
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.metadata.title,
    description: APP_CONFIG.metadata.description
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 pb-20 md:pb-0">
        {children}
        <FloatingNavBottom />
      </body>
    </html>
  );
}
