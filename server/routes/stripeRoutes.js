import { Router } from 'express';
import { createCheckoutSession, createPortalSession } from '../controllers/stripeController.js';
const router = Router();
router.post('/create-checkout-session', createCheckoutSession);
router.post('/create-portal-session', createPortalSession);
export default router;
