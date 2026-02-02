'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CreditCard, QrCode, ArrowLeft, Loader2 } from 'lucide-react';

// Default payment settings
const defaultPaymentSettings = {
  stripeEnabled: true,
  paynowEnabled: true,
  paynowUEN: 'YOUR_UEN_NUMBER',
  paynowName: 'SHUN HARVEST PTE LTD',
  paynowQRImage: '', // Configure in admin
  paynowEmail: 'orders@shunharvest.com',
};

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paynow'>('stripe');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [paynowReference, setPaynowReference] = useState('');
  const [paymentSettings, setPaymentSettings] = useState(defaultPaymentSettings);

  useEffect(() => {
    // Generate a unique reference for PayNow payments
    setPaynowReference(`SH-${Date.now().toString(36).toUpperCase()}`);
    
    // Load payment settings from localStorage
    const saved = localStorage.getItem('shun-payment-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPaymentSettings({ ...defaultPaymentSettings, ...parsed });
      } catch (e) {
        console.error('Failed to load payment settings:', e);
      }
    }
  }, []);

  const handleStripeCheckout = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.images?.[0] ? `${window.location.origin}${item.images[0]}` : undefined,
          })),
          customerEmail: email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-stone-900 mb-4">Your cart is empty</h1>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-amber-700 text-white font-medium hover:bg-amber-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link href="/shop" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-serif text-stone-900 mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-stone-50 rounded-lg">
                <div className="w-20 h-20 bg-stone-200 rounded overflow-hidden flex-shrink-0">
                  {item.images?.[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🍓</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-stone-900">{item.name}</h3>
                  <p className="text-sm text-stone-600">Qty: {item.quantity}</p>
                  <p className="font-medium text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-200 pt-4">
            <div className="flex justify-between text-lg font-medium text-stone-900">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-stone-500 mt-1">Shipping calculated at checkout</p>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-2xl font-serif text-stone-900 mb-6">Payment</h2>
          
          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3 mb-6">
            {paymentSettings.stripeEnabled && (
              <button
                type="button"
                onClick={() => setPaymentMethod('stripe')}
                className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-colors ${
                  paymentMethod === 'stripe'
                    ? 'border-amber-700 bg-amber-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <CreditCard className={`w-6 h-6 ${paymentMethod === 'stripe' ? 'text-amber-700' : 'text-stone-400'}`} />
                <div className="text-left">
                  <p className="font-medium text-stone-900">Credit/Debit Card</p>
                  <p className="text-sm text-stone-500">Pay securely with Stripe</p>
                </div>
              </button>
            )}

            {paymentSettings.paynowEnabled && (
              <button
                type="button"
                onClick={() => setPaymentMethod('paynow')}
                className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-colors ${
                  paymentMethod === 'paynow'
                    ? 'border-amber-700 bg-amber-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <QrCode className={`w-6 h-6 ${paymentMethod === 'paynow' ? 'text-amber-700' : 'text-stone-400'}`} />
                <div className="text-left">
                  <p className="font-medium text-stone-900">PayNow</p>
                  <p className="text-sm text-stone-500">Scan QR code to pay (Singapore)</p>
                </div>
              </button>
            )}
          </div>

          {/* Stripe Checkout */}
          {paymentMethod === 'stripe' && (
            <button
              onClick={handleStripeCheckout}
              disabled={isLoading || !email}
              className="w-full py-4 bg-amber-700 text-white font-medium hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay ${totalPrice.toFixed(2)} with Card
                </>
              )}
            </button>
          )}

          {/* PayNow Instructions */}
          {paymentMethod === 'paynow' && (
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <h3 className="font-medium text-purple-900 mb-4">Scan to Pay with PayNow</h3>
                
                {/* PayNow QR Placeholder */}
                <div className="w-48 h-48 mx-auto bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center mb-4">
                  {paymentSettings.paynowQRImage ? (
                    <Image
                      src={paymentSettings.paynowQRImage}
                      alt="PayNow QR Code"
                      width={180}
                      height={180}
                      className="rounded"
                    />
                  ) : (
                    <div className="text-center text-stone-400">
                      <QrCode className="w-16 h-16 mx-auto mb-2" />
                      <p className="text-sm">QR Code</p>
                    </div>
                  )}
                </div>

                <div className="text-sm text-purple-800 space-y-1">
                  <p><strong>Amount:</strong> ${totalPrice.toFixed(2)} SGD</p>
                  <p><strong>UEN:</strong> {paymentSettings.paynowUEN}</p>
                  <p><strong>Reference:</strong> {paynowReference}</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> After payment, please email your payment screenshot to{' '}
                  <a href="mailto:orders@shunharvest.com" className="underline">orders@shunharvest.com</a>{' '}
                  with reference number <strong>{paynowReference}</strong>
                </p>
              </div>

              <Link
                href={`mailto:orders@shunharvest.com?subject=PayNow Payment - ${paynowReference}&body=Hi, I have made a PayNow payment of $${totalPrice.toFixed(2)} with reference ${paynowReference}. Please find attached my payment screenshot.`}
                className="block w-full py-4 bg-purple-700 text-white font-medium text-center hover:bg-purple-800 transition-colors"
              >
                I&apos;ve Made Payment - Send Confirmation
              </Link>
            </div>
          )}

          {/* Security Note */}
          <p className="text-xs text-stone-500 mt-4 text-center">
            🔒 Your payment information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}
