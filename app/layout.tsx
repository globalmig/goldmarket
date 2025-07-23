import type { Metadata } from "next";
import "./globals.css";
import "./style.css";
import Header from "@/compoennts/Header";
import Footer from "@/compoennts/Footer";

export const metadata: Metadata = {
  title: "한국금시장거래소 압구정점",
  description: "한국금시장거래소 압구정점 홈페이지",
  openGraph: {
    title: '한국금시장거래소 압구정점',
    description: '한국금시장거래소 압구정점 홈페이지입니다.',
    // url: 'https://www.campingmaker.co.kr/', 도메인 주소 확인 필요
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
  // other: { 웹마스터 도구 설정 시, 키 입력
  //   'naver-site-verification': '632bbdbe748e6125f42049c66acc306736a8ad8e',
  // }
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
