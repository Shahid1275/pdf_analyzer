import { useState } from 'react'
import { FileText, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import PageSummaryTable from './PageSummaryTable'

const PDFResultCard = ({ result, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0)

  const hasIssues = result.pageSummary?.some(page => 
    page.printedPage === null || page.range === null
  )

  return (
    <div className="card hover:shadow-2xl">
      <div 
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-3 rounded-xl shadow-lg flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 truncate">
              {result.fileName}
            </h3>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Total Pages:</span>
                <span className="font-semibold text-primary-700">{result.totalPages}</span>
              </div>
              
              {hasIssues && (
                <div className="flex items-center gap-1.5 text-amber-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Has Issues</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                {result.printedPageSequence?.filter(p => p !== null).length || 0} Pages Numbered
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {result.pageSummary?.filter(p => p.range !== null).length || 0} Pages with Questions
              </div>
            </div>
          </div>
        </div>

        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors ml-4 flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-600" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Printed Page Sequence</h4>
            <div className="flex flex-wrap gap-2">
              {result.printedPageSequence?.map((page, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    page === null
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {page === null ? 'No Page #' : page}
                </div>
              ))}
            </div>
          </div>

          <PageSummaryTable pageSummary={result.pageSummary} />
        </div>
      )}
    </div>
  )
}

export default PDFResultCard
