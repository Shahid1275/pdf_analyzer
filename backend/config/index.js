import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 10 * 1024 * 1024, // 10MB
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};