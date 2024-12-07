import '@/app/globals.scss';

import { GeistSans } from 'geist/font/sans';

import AppLayout from '@/components/layout/AppLayout';
import { ThemeProvider } from '@/components/theme-provider';

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistSans.className} dark:bg-gray-900 ${GeistSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}