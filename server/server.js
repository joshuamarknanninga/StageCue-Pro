import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stripeRoutes from './routes/stripeRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'StageCue Pro API' }));
app.use('/api/stripe', stripeRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`StageCue Pro API listening on ${port}`));
