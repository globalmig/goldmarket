import type { Metadata } from "next";
import "./globals.css";
import "./style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "한국금시장거래소 압구정점",
  description: "한국금시장거래소 압구정점 홈페이지",
  openGraph: {
    title: '한국금시장거래소 압구정점',
    description: '한국금시장거래소 압구정점 홈페이지입니다.',
    url: 'https://www.goldmarket.co.kr/',
    siteName: '한국금시장거래소 압구정점',
    images: [
      {
        url: 'https://images/og_image.png',
        width: 1200,
        height: 630,
        alt: '한국금시장거래소 미리보기 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
