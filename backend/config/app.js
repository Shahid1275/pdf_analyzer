import express from 'express';
import cors from 'cors';
import { config } from './index.js';
import pdfRoutes from '../routes/pdfRoutes.js';
import { errorHandler } from '../middlewares/errorHandler.js';

const app = express();

// CORS Configuration - Allow all origins for Vercel
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.json({ message: 'Server is running' }));
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