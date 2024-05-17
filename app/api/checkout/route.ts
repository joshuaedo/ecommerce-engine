import { z } from 'zod';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { OrderedProduct } from '@/features/products/types/extensions';
import { createNewOrder } from '@/features/orders/lib/mutations';
import { stripe } from '@/lib/stripe';
import { Decimal } from '@prisma/client/runtime/library';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);

    const shopId = url.searchParams.get('shopId');

    const shopUrl = url.searchParams.get('shopUrl');

    const {
      subtotal,
      orderedProducts,
    }: { subtotal: number; orderedProducts: OrderedProduct[] } =
      await req.json();

    if (!shopId) {
      return new Response('Missing shopId', { status: 400 });
    }

    if (!shopUrl) {
      return new Response('Missing shopUrl', { status: 400 });
    }

    if (orderedProducts?.length === 0) {
      return new Response('No products have been ordered', { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    orderedProducts.forEach((product) => {
      line_items.push({
        quantity: product?.quantity,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product?.name,
          },
          unit_amount: new Decimal(product.price).toNumber() * 100,
        },
      });
    });

    const order = await createNewOrder({
      shopId,
      isPaid: false,
      products: orderedProducts,
      totalPrice: subtotal,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${shopUrl}?checkout-success=1`,
      cancel_url: `${shopUrl}?checkout-canceled=0`,
      metadata: {
        orderId: order?.id,
      },
    });

    return NextResponse.json(
      {
        url: session?.url,
      },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, {
        status: 422,
      });
    }

    return new Response(error + '', { status: 500 });
  }
}
