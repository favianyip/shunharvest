import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { createOrder } from '@/lib/firebase/firestore';

// This is your Stripe webhook secret for verifying events
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Checkout session completed:', {
        sessionId: session.id,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        paymentStatus: session.payment_status,
      });

      // Create order in Firebase
      try {
        // Get shipping details from session (cast to access optional fields)
        const sessionData = session as Stripe.Checkout.Session & {
          shipping_details?: {
            address?: {
              line1?: string;
              city?: string;
              country?: string;
            };
          };
        };
        
        const shippingAddress = sessionData.shipping_details?.address
          ? `${sessionData.shipping_details.address.line1 || ''}, ${sessionData.shipping_details.address.city || ''}, ${sessionData.shipping_details.address.country || ''}`
          : '';

        await createOrder({
          items: [], // Items are in line_items, would need to fetch
          total: (session.amount_total || 0) / 100,
          status: 'processing',
          customerEmail: session.customer_email || '',
          customerName: session.customer_details?.name || '',
          shippingAddress,
          createdAt: new Date(),
        });
        console.log('Order created in Firebase');
      } catch (err) {
        console.error('Failed to create order:', err);
      }
      
      break;
    }
    
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      
      // Handle PayNow payments (they use payment_intent directly)
      if (paymentIntent.payment_method_types?.includes('paynow')) {
        const metadata = paymentIntent.metadata;
        
        try {
          const items = metadata.items ? JSON.parse(metadata.items) : [];
          
          await createOrder({
            items: items.map((item: { id: string; name: string; quantity: number }) => ({
              product: { id: item.id, name: item.name } as never,
              quantity: item.quantity,
            })),
            total: paymentIntent.amount / 100,
            status: 'processing',
            customerEmail: metadata.customerEmail || '',
            customerName: '',
            shippingAddress: '',
            createdAt: new Date(),
          });
          console.log('PayNow order created in Firebase');
        } catch (err) {
          console.error('Failed to create PayNow order:', err);
        }
      }
      break;
    }
    
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', paymentIntent.id, paymentIntent.last_payment_error?.message);
      break;
    }
    
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
