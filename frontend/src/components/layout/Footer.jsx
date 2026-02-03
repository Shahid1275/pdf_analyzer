const Footer = () => {
  return (
    <footer className="glass-effect border-t border-slate-200/50 mt-auto">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm sm:text-base text-slate-700 mb-2">
            <span className="font-bold text-primary-700">PDF Analyzer Pro</span> - Professional Document Intelligence Platform
          </p>
          <p className="text-xs sm:text-sm text-slate-500">
            © {new Date().getFullYear()} All rights reserved. Built with precision • Powered by advanced algorithms
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
