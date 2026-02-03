import { upload } from '../middlewares/multerConfig.js';
import { analyzePDF } from '../services/pdfAnalyzer.js';

export const analyzePdf = [
  upload.array('pdfs', 10), // max 10 files
  async (req, res, next) => {
    try {
      if (!req.files?.length) {
        return res.status(400).json({ error: 'No PDF files uploaded' });
      }

      const promises = req.files.map((file) =>
        analyzePDF(file.path, file.originalname)
      );

      const results = await Promise.all(promises);

      res.json({ success: true, results });
    } catch (err) {
      next(err);
    }
  },
];