const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const createCheckoutSession = (priceKey) => post('/api/stripe/create-checkout-session', { priceKey });
export const createPortalSession = () => post('/api/stripe/create-portal-session', {});
