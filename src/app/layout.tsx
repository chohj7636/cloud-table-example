import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Tatum Cloud Table',
  description: 'Tatum Cloud Table',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
