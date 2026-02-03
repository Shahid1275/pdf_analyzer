# PDF Analyzer Frontend

A modern, professional React + Vite application for analyzing PDF documents.

## Features

- 🎨 **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- 📱 **Fully Responsive**: Works seamlessly on all devices (mobile, tablet, desktop)
- 🚀 **Fast**: Built with Vite for lightning-fast development and build times
- 📄 **Multi-file Upload**: Support for analyzing multiple PDFs simultaneously
- 🎯 **Drag & Drop**: Intuitive file upload with drag-and-drop support
- 📊 **Detailed Results**: Comprehensive analysis with page numbers and question ranges
- 💾 **Export Results**: Download analysis results as JSON
- ⚡ **Professional Architecture**: Clean folder structure with separation of concerns

## Tech Stack

- **React 18**: Latest React with hooks
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **Lucide React**: Beautiful, consistent icons

## Folder Structure

```
src/
├── components/
│   ├── common/         # Reusable components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── results/        # Results display components
│   └── upload/         # Upload section components
├── services/           # API and external services
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

## Usage

1. **Upload PDFs**: Drag and drop or click to select PDF files
2. **Analyze**: Click the "Analyze" button to process the files
3. **View Results**: Explore detailed analysis including page numbers and question ranges
4. **Download**: Export results as JSON for further processing

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Best Practices Implemented

✅ Component-based architecture
✅ Separation of concerns (UI, logic, API)
✅ Responsive design with mobile-first approach
✅ Error handling and user feedback
✅ Loading states for better UX
✅ Accessible UI components
✅ Clean code with proper naming conventions
✅ Optimized performance
✅ Environment variable management

## API Integration

The frontend communicates with the backend API at `/api/analyze-pdf` endpoint. The API accepts multipart form data with PDF files and returns analysis results.

## License

All rights reserved.
