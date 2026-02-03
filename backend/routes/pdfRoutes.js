import express from 'express';
import { analyzePdf } from '../controllers/pdfController.js';

const router = express.Router();

router.post('/analyze-pdf', analyzePdf);

export default router;