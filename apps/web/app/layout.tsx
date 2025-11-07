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
          {/* <NavBar /> */}
          <Providers>
            <NavBar />
            {children}
            <GlobalModal />
          </Providers>
        </div>
      </body>
    </html>
  );
}
