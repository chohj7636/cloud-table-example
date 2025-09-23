import type { Metadata } from 'next';

import DialogContainer from '@/widgets/DialogContainer';

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
          <div id="inner-container" className="min-h-screen bg-gray-50 p-8">
            {children}
          </div>
          <DialogContainer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
