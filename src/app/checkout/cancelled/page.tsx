'use client';

import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function CheckoutCancelledPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-serif text-stone-900 mb-4">
          Order Cancelled
        </h1>
        <p className="text-stone-600 mb-8">
          Your order was cancelled. No charges were made. 
          Your cart items are still saved if you&apos;d like to complete your purchase.
        </p>
        <div className="space-y-4">
          <Link
            href="/shop"
            className="block w-full px-6 py-3 bg-amber-700 text-white font-medium hover:bg-amber-800 transition-colors"
          >
            Return to Shop
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
