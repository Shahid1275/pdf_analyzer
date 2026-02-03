# PDF Question Mapper - MERN Assessment

A full-stack MERN application that analyzes exam PDFs and extracts printed page numbers and question mappings.

## Features

✅ **PDF-Agnostic Solution** - Works with any PDF layout  
✅ **Printed Page Detection** - Supports all positions (top, bottom, corners)  
✅ **Multiple Formats** - Detects: 1, Page 1, (1), - 1 -  
✅ **Custom Header Filtering** - Ignores headers like "400B F-block LDA"  
✅ **Question Detection** - Supports Q1, Q.1, Q 1, Question 1, Q(1)  
✅ **No Auto-correction** - Preserves exact page/question order  
✅ **Responsive UI** - Mobile, Tablet, Desktop optimized  
✅ **Multiple PDF Upload** - Analyze up to 10 PDFs at once  

## Tech Stack

**Backend:**
- Node.js + Express
- Multer (File upload)
- PDF2JSON (PDF parsing)
- CORS enabled

**Frontend:**
- React 19
- Tailwind CSS
- Responsive design
- Drag & drop upload

## Installation

### Backend Setup
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend/my-react-app
npm install
npm start
# App runs on http://localhost:3000
```

## API Endpoint

### POST /api/analyze-pdf
- Accepts: `multipart/form-data` with PDF files
- Returns: JSON with page numbers and question mappings

**Response Format:**
```json
{
  "success": true,
  "results": [
    {
      "fileName": "paper.pdf",
      "totalPages": 10,
      "printedPageSequence": [1, 2, 8, 9, 10],
      "pageSummary": [
        {
          "printedPage": 1,
          "range": null,
          "questionStarts": []
        },
        {
          "printedPage": 2,
          "range": "1-5",
          "questionStarts": [1, 2, 3, 4, 5]
        }
      ]
    }
  ]
}
```

## Key Constraints Implemented

1. **Generic Solution** - No PDF-specific hardcoding
2. **Exact Page Numbers** - No sorting or gap filling
3. **Question Preservation** - Maintains original order
4. **Position Detection** - All 6 locations supported
5. **Format Support** - Multiple page number formats
6. **Header Filtering** - Rejects custom headers/footers

## Usage

1. Start backend server
2. Start frontend app
3. Upload one or multiple PDFs
4. View analysis results
5. Export as JSON

## Author

Submission for MERN Stack Interview Assessment

## License

MIT
