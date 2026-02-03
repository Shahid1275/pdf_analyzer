const Footer = () => {
  return (
    <footer className="glass-effect border-t border-slate-200/50 mt-auto">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-slate-600">
          <p className="mb-1">
            <span className="font-semibold text-primary-700">PDF Analyzer</span> - Professional Document Analysis Tool
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} All rights reserved. Analyze PDFs with precision and accuracy.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
