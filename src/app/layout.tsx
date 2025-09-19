import type { Metadata } from 'next';

import CloudDialog from '@/widgets/CloudDialog';

import { ReactQueryProvider } from './ReactQueryProvider';
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
        <ReactQueryProvider>
          <div id="cloud-dialog"></div>
          {children}
          <CloudDialog />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
