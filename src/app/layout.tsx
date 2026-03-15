import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Choice Lab — 당신은 어떻게 선택하는 사람인가요?',
  description:
    '선택의 결과가 아닌 방식을 분석합니다. 윤리 딜레마·행동 반응·가치 판단을 통해 의사결정 패턴을 해석하는 인터랙티브 실험 서비스.',
  openGraph: {
    title: 'The Choice Lab',
    description: '당신은 어떻게 선택하는 사람인가요?',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-dark text-white min-h-screen`}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-EZ5B8G3D3X" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EZ5B8G3D3X');
        `}</Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
