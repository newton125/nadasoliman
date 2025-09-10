import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy')

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'egp',
        product_data: {
          name: item.product.title,
          images: [item.product.imageCover],
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.count,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/checkout/success`,
      cancel_url: `${request.nextUrl.origin}/cart`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}