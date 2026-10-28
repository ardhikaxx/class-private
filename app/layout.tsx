import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { APP_CONFIG } from '@/lib/config';
import { getStructuredData } from '@/lib/seo';
import { FloatingNavBottom } from '@/components/layout/FloatingNavBottom';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.metadata.siteUrl),
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
    'kursus programming privat',
    'bimbingan 1 on 1 coding',
    'tutor coding indonesia',
    'mentoring pemrograman',
    'integrasi website mobile',
    'belajar react nextjs flutter',
    'gemini pro gratis',
    'belajar coding pemula'
  ],
  authors: [{ name: APP_CONFIG.name, url: APP_CONFIG.metadata.siteUrl }],
  creator: APP_CONFIG.name,
  publisher: APP_CONFIG.name,
  alternates: {
    canonical: '/'
  },
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
    description: APP_CONFIG.metadata.description,
    creator: '@ardhikaxx'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = getStructuredData();

  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-zinc-950 text-zinc-100 selection:bg-white selection:text-black pb-20 md:pb-0">
        {children}
        <FloatingNavBottom />
      </body>
    </html>
  );
}
