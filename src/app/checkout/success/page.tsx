'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart after successful checkout
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-serif text-stone-900 mb-4">
          Thank you for your order!
        </h1>
        <p className="text-stone-600 mb-8">
          We&apos;ve received your payment and will begin preparing your premium Japanese fruits. 
          You&apos;ll receive a confirmation email shortly with your order details and tracking information.
        </p>
        <div className="space-y-4">
          <Link
            href="/shop"
            className="block w-full px-6 py-3 bg-amber-700 text-white font-medium hover:bg-amber-800 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="block w-full px-6 py-3 border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
