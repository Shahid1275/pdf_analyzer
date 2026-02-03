import express from 'express';
import cors from 'cors';
import { config } from './index.js';
import pdfRoutes from '../routes/pdfRoutes.js';
import { errorHandler } from '../middlewares/errorHandler.js';

const app = express();

// Middleware
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', pdfRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;