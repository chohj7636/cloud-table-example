import type { Metadata } from 'next';

import CloudDialog from '@/shared/components/CloudDialog';

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
      <body className={`antialiased`}>
        <div id="cloud-dialog"></div>
        {children}
        <CloudDialog />
      </body>
    </html>
  );
}
