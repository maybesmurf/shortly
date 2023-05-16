import '../styles/global.css';

import React from 'react';
import { Source_Sans_Pro } from 'next/font/google';
import ThemeProvider from '@modules/theming/context/theme-context';
import ToastsContainer from '@modules/toasts/components/toasts-container';
import { ToastProvider } from '@modules/toasts/context/toasts-context';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import { siteConfig } from '@config/config';
import { getSession } from '@modules/auth/lib/auth.lib';
import AuthContext from '@modules/auth/context/auth-context';

const sourceSansPro = Source_Sans_Pro({
  variable: '--font-sans',
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `Home | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Shortly', 'URL Shortener', 'Links'],
  authors: [
    {
      name: 'Faustino Zanetto',
      url: 'https://www.faustinozanetto.com',
    },
  ],
  creator: 'Faustino Zanetto',
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: 'https://shortlyto.vercel.app/assets/banner.webp',
        width: 2000,
        height: 1500,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@faustinozanetto',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/assets/banner.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  icons: {
    shortcut: 'favicons/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession(headers().get('cookie') ?? '');

  return (
    <html lang="en" className={sourceSansPro.variable} suppressHydrationWarning>
      <body className="bg-neutral-50 font-sans antialiased dark:bg-neutral-900" suppressHydrationWarning>
        <AuthContext session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastProvider>
              {children}
              <ToastsContainer />
            </ToastProvider>
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
