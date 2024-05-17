import { z } from 'zod';
import Stripe from 'stripe';
import { updateOrder } from '@/features/orders/lib/mutations';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
// import { db } from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + ': Webhook Error', { status: 400 });
  }

  const session = event?.data?.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(', ');

  if (
    event.type === 'checkout.session.completed' &&
    session?.metadata?.orderId
  ) {
    const order = await updateOrder({
      id: session?.metadata?.orderId,
      address: addressString,
      phone: session?.customer_details?.phone || '',
      isPaid: true,
    });

    //  // Archive products after sale
    // const productIds = order.orderItems.map((orderItem) => orderItem.productId)

    // await db.product.updateMany({
    //     where: {
    //         id: {
    //             in: [...productIds]
    //         }
    //     },
    //     data: {
    //         isArchived: true
    //     }
    // })

    return new Response('Ok', { status: 200 });
  }

  return new Response('Ok', { status: 200 });
}
