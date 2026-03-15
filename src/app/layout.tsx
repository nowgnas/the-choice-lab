import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-choice-lab-beige.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'The Choice Lab — 당신은 어떻게 선택하는 사람인가요?',
    template: '%s | The Choice Lab',
  },
  description:
    '선택의 결과가 아닌 방식을 분석합니다. 윤리 딜레마·행동 반응·가치 판단을 통해 의사결정 패턴을 해석하는 인터랙티브 실험 서비스.',
  keywords: [
    '심리 테스트', '의사결정', '성격 유형', '윤리 딜레마', '행동 분석',
    '가치관 테스트', '인터랙티브 실험', 'MBTI 대안', '선택 패턴',
  ],
  authors: [{ name: 'The Choice Lab' }],
  creator: 'The Choice Lab',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'The Choice Lab — 당신은 어떻게 선택하는 사람인가요?',
    description: '선택의 결과가 아닌 방식을 분석합니다. 윤리 딜레마·행동 반응·가치 판단을 통해 의사결정 패턴을 해석합니다.',
    url: siteUrl,
    siteName: 'The Choice Lab',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'The Choice Lab — 당신은 어떻게 선택하는 사람인가요?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Choice Lab — 당신은 어떻게 선택하는 사람인가요?',
    description: '선택의 결과가 아닌 방식을 분석합니다. 지금 바로 실험에 참여하세요.',
    images: ['/opengraph-image'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'The Choice Lab',
  url: siteUrl,
  description: '선택의 결과가 아닌 방식을 분석합니다. 윤리 딜레마·행동 반응·가치 판단을 통해 의사결정 패턴을 해석하는 인터랙티브 실험 서비스.',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web',
  inLanguage: 'ko',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2114994662223496"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-EZ5B8G3D3X" strategy="beforeInteractive" />
        <Script id="google-analytics" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EZ5B8G3D3X');
        `}</Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-dark text-white min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
