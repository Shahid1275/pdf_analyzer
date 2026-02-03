import app from './config/app.js';
import { config } from './config/index.js';
import fs from 'fs';

// Suppress pdf2json worker warnings in development
if (config.nodeEnv === 'development') {
  const originalWarn = console.warn;
  const originalLog = console.log;
  
  console.warn = (...args) => {
    const msg = args[0]?.toString?.() || '';
    if (msg.includes('Setting up fake worker')) return;
    originalWarn.apply(console, args);
  };
  
  console.log = (...args) => {
    const msg = args[0]?.toString?.() || '';
    if (msg.includes('Setting up fake worker')) return;
    originalLog.apply(console, args);
  };
}

// Start server
const server = app.listen(config.port, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${config.port} is already in use`);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});