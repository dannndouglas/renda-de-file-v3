import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SessionProvider } from '@/components/auth/session-provider';
import { QueryProvider } from '@/components/providers/query-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Renda de Filé de Jaguaribe',
    template: '%s | Renda de Filé de Jaguaribe',
  },
  description:
    'Artesanato tradicional de Jaguaribe, Ceará. Mais de 300 anos de tradição em renda de filé feita à mão pelas artesãs locais.',
  keywords: [
    'renda de filé',
    'artesanato',
    'jaguaribe',
    'ceará',
    'tradição',
    'cultura',
  ],
  authors: [{ name: 'Renda de Filé de Jaguaribe' }],
  creator: 'Renda de Filé de Jaguaribe',
  publisher: 'Renda de Filé de Jaguaribe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'Renda de Filé de Jaguaribe',
    description:
      'Artesanato tradicional de Jaguaribe, Ceará. Mais de 300 anos de tradição em renda de filé feita à mão.',
    siteName: 'Renda de Filé de Jaguaribe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renda de Filé de Jaguaribe',
    description:
      'Artesanato tradicional de Jaguaribe, Ceará. Mais de 300 anos de tradição.',
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfairDisplay.variable}`}
    >
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
