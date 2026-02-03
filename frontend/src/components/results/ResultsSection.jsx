import { ArrowLeft, Download, FileText } from 'lucide-react'
import PDFResultCard from './PDFResultCard'

const ResultsSection = ({ results, onReset }) => {
  const handleDownload = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `pdf-analysis-${new Date().toISOString()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-primary-700 bg-clip-text text-transparent mb-2">
            Analysis Complete ✓
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Successfully processed <span className="font-bold text-primary-700">{results?.results?.length || 0}</span> document{results?.results?.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDownload}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:shadow-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Download JSON</span>
            <span className="sm:hidden">Download</span>
          </button>
          
          <button
            onClick={onReset}
            className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {results?.results?.map((result, index) => (
          <PDFResultCard key={index} result={result} index={index} />
        ))}
      </div>

      {results?.results?.length === 0 && (
        <div className="card text-center py-12">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No Results</h3>
          <p className="text-slate-600">No analysis results available</p>
        </div>
      )}
    </div>
  )
}

export default ResultsSection
