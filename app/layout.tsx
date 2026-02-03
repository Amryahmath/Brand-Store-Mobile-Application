import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FashionHub - Premium Fashion Store',
  description: 'Discover the best trendy collections at FashionHub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
