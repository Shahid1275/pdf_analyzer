import express from 'express';
import cors from 'cors';
import { config } from './index.js';
import pdfRoutes from '../routes/pdfRoutes.js';
import { errorHandler } from '../middlewares/errorHandler.js';

const app = express();

// CORS Configuration - Allow multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'https://pdf-analyzer-six.vercel.app',
  config.corsOrigin
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true
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