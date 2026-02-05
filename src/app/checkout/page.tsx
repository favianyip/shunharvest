'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CreditCard, QrCode, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// PayNow Payment Form Component
function PayNowForm({ 
  clientSecret, 
  onSuccess, 
  onError 
}: { 
  clientSecret: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'succeeded' | 'failed'>('pending');

  useEffect(() => {
    if (!stripe || !clientSecret) return;

    // Check payment status periodically
    const checkStatus = async () => {
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      if (paymentIntent?.status === 'succeeded') {
        setPaymentStatus('succeeded');
        onSuccess();
      } else if (paymentIntent?.status === 'requires_payment_method') {
        // Payment failed or was cancelled
        if (paymentStatus === 'processing') {
          setPaymentStatus('failed');
          onError('Payment was not completed. Please try again.');
        }
      }
    };

    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, [stripe, clientSecret, paymentStatus, onSuccess, onError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setPaymentStatus('processing');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setPaymentStatus('failed');
      onError(error.message || 'Payment failed');
      setIsProcessing(false);
    }
  };

  if (paymentStatus === 'succeeded') {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-stone-900">Payment Successful!</h3>
        <p className="text-stone-600 mt-2">Redirecting to confirmation...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
        <h4 className="font-medium text-purple-900 mb-2">How PayNow Works</h4>
        <ol className="text-sm text-purple-800 space-y-1 list-decimal list-inside">
          <li>Click &ldquo;Generate QR Code&rdquo; below</li>
          <li>Scan the QR code with your banking app</li>
          <li>Complete payment in your app</li>
          <li>Payment will be confirmed automatically</li>
        </ol>
      </div>

      <PaymentElement 
        options={{
          layout: 'tabs',
          paymentMethodOrder: ['paynow'],
        }}
      />

      {paymentStatus === 'processing' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
          <p className="text-sm text-blue-800">
            Waiting for payment confirmation...
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Complete the payment in your banking app
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 bg-purple-700 text-white font-medium hover:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <QrCode className="w-5 h-5" />
            Generate PayNow QR Code
          </>
        )}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paynow'>('stripe');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStripeCheckout = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.salePrice || item.product.price,
            quantity: item.quantity,
            image: item.product.images?.[0] ? `${window.location.origin}${item.product.images[0]}` : undefined,
          })),
          customerEmail: email,
          paymentMethod: 'card',
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to initiate checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const initializePayNow = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.salePrice || item.product.price,
            quantity: item.quantity,
          })),
          customerEmail: email,
          paymentMethod: 'paynow',
        }),
      });

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error(data.error || 'Failed to initialize PayNow');
      }
    } catch (err) {
      console.error('PayNow init error:', err);
      setError('Failed to initialize PayNow. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayNowSuccess = () => {
    clearCart();
    window.location.href = '/checkout/success';
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
              <div key={item.product.id} className="flex gap-4 p-4 bg-stone-50 rounded-lg">
                <div className="w-20 h-20 bg-stone-200 rounded overflow-hidden flex-shrink-0">
                  {item.product.images?.[0] ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🍓</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-stone-900">{item.product.name}</h3>
                  <p className="text-sm text-stone-600">Qty: {item.quantity}</p>
                  <p className="font-medium text-stone-900">${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-200 pt-4">
            <div className="flex justify-between text-lg font-medium text-stone-900">
              <span>Total</span>
              <span>S${totalPrice.toFixed(2)}</span>
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

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Payment Method Selection */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => {
                setPaymentMethod('stripe');
                setClientSecret(null);
              }}
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

            <button
              type="button"
              onClick={() => {
                setPaymentMethod('paynow');
                if (email && !clientSecret) {
                  initializePayNow();
                }
              }}
              className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-colors ${
                paymentMethod === 'paynow'
                  ? 'border-purple-700 bg-purple-50'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <QrCode className={`w-6 h-6 ${paymentMethod === 'paynow' ? 'text-purple-700' : 'text-stone-400'}`} />
              <div className="text-left">
                <p className="font-medium text-stone-900">PayNow</p>
                <p className="text-sm text-stone-500">Scan QR code to pay (Singapore)</p>
              </div>
            </button>
          </div>

          {/* Stripe Card Checkout */}
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
                  Pay S${totalPrice.toFixed(2)} with Card
                </>
              )}
            </button>
          )}

          {/* PayNow via Stripe */}
          {paymentMethod === 'paynow' && (
            <>
              {!clientSecret && !isLoading && (
                <button
                  onClick={initializePayNow}
                  disabled={!email}
                  className="w-full py-4 bg-purple-700 text-white font-medium hover:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <QrCode className="w-5 h-5" />
                  Initialize PayNow (S${totalPrice.toFixed(2)})
                </button>
              )}

              {isLoading && !clientSecret && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                </div>
              )}

              {clientSecret && (
                <Elements 
                  stripe={stripePromise} 
                  options={{ 
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#7c3aed',
                      },
                    },
                  }}
                >
                  <PayNowForm 
                    clientSecret={clientSecret}
                    onSuccess={handlePayNowSuccess}
                    onError={(msg) => setError(msg)}
                  />
                </Elements>
              )}
            </>
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
