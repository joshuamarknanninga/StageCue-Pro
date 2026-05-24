import Stripe from 'stripe';

const priceMap = {
  solo: process.env.STRIPE_PRICE_SOLO,
  department: process.env.STRIPE_PRICE_DEPARTMENT,
  team: process.env.STRIPE_PRICE_TEAM
};

const stripeClient = () => process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function createCheckoutSession(req, res) {
  try {
    const stripe = stripeClient();
    const { priceKey } = req.body;
    if (!stripe) return res.status(400).json({ error: 'Stripe is not configured yet. Add server env keys to enable checkout.' });
    if (!priceMap[priceKey]) return res.status(400).json({ error: 'Invalid or missing price configuration for selected plan.' });
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', line_items: [{ price: priceMap[priceKey], quantity: 1 }],
      success_url: `${process.env.CLIENT_URL}/settings?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/pricing?canceled=true`
    });
    res.json({ url: session.url });
  } catch (e) { res.status(500).json({ error: e.message || 'Unable to create checkout session.' }); }
}

export async function createPortalSession(req, res) {
  try {
    const stripe = stripeClient();
    if (!stripe) return res.status(400).json({ error: 'Stripe is not configured yet. Add server env keys to enable portal.' });
    const session = await stripe.billingPortal.sessions.create({ customer: req.body.customerId || 'cus_placeholder_for_mvp', return_url: `${process.env.CLIENT_URL}/settings` });
    res.json({ url: session.url });
  } catch (e) { res.status(500).json({ error: 'Portal unavailable until a live Stripe customer ID is connected.' }); }
}
