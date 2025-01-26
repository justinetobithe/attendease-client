import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import AppSessionProvider from '@/components/AppSessionProvider';
import AppTanstackProvider from '@/components/AppTanstackProvider';
import poppins from './assets/fonts/poppins';

export const metadata: Metadata = {
  title: 'Attend Ease',
  description: 'Attend Ease is a streamlined platform designed to simplify attendance management, providing features such as real-time attendance tracking, reporting, and data integration. Ideal for educational institutions, organizations, and businesses looking to enhance their attendance systems.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang='en' suppressHydrationWarning className='h-full'>
        <head />
        <body className={`${poppins.variable} min-h-full font-sans`}>
          <AppSessionProvider>
            <AppTanstackProvider>{children}</AppTanstackProvider>
          </AppSessionProvider>
          <Toaster />
        </body>
      </html>
    </>
  );
}
