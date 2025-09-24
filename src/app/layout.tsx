import type { Metadata } from 'next';

import { Toaster } from '@/shared/components/ui/sonner';
import DialogContainer from '@/widgets/CloudDialog/DialogContainer';

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
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
