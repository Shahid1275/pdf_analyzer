import { FileText, Zap } from 'lucide-react'

const Header = () => {
  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-slate-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-3 rounded-xl shadow-lg">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">
                PDF Analyzer Pro
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">
                Smart Document Intelligence Platform
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
            <Zap className="w-4 h-4 text-primary-600" />
            <span className="font-semibold text-primary-700 text-sm">Instant Analysis</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
