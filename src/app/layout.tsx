import type { Metadata } from "next";
import { Noto_Sans_KR } from 'next/font/google';
import "@/styles/globals.css";
import { ThemeProvider } from 'next-themes';
import AuthProvider from '@/components/providers/authProvider'

const noto = Noto_Sans_KR({
  subsets: ['latin'], // 또는 preload: false
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Quick JS",
  description: "Generated by fjdkslvn",
  icons: {
		icon: "/images/favicon.png",
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={noto.className}>
        <ThemeProvider attribute='class'>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
