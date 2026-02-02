import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import LayoutWrapper from '@/components/LayoutWrapper';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shun Harvest (旬) - Premium Japanese Seasonal Fruits',
  description: 'In harmony with nature. Premium High-Quality Seasonal Fruits. Weekly orders flown fresh - direct from farm to home.',
  keywords: ['Japanese fruits', 'seasonal fruits', 'premium fruits', 'Shun Harvest', 'farm to home', 'Japanese melons', 'Japanese strawberries'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-stone-900 overflow-x-hidden">
        <CartProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
