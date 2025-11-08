import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "../provider/providers";
import NavBar from "../components/NavBar";
import GlobalModal from "../components/modals/GlobalModal";

//font 설정
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "T1 Chat",
  description: "KakaoTalk Clone Coding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={`${geistSans.variable} ${geistMono.variable}`}>
          <Providers>
            {/* Flex 레이아웃: NavBar와 컨텐츠를 가로로 배치 */}
            <div className="flex h-screen">
              {/* 왼쪽 고정 NavBar */}
              <NavBar />
              
              {/* 오른쪽 메인 컨텐츠 영역 */}
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
            
            {/* 전역 모달 */}
            <GlobalModal />
          </Providers>
        </div>
      </body>
    </html>
  );
}
