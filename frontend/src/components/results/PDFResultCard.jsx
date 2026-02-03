import { useState } from 'react'
import { FileText, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import PageSummaryTable from './PageSummaryTable'

const PDFResultCard = ({ result, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0)

  const hasIssues = result.pageSummary?.some(page => 
    page.printedPage === null || page.range === null
  )

  return (
    <div className="card hover:shadow-2xl border-2 border-slate-200 hover:border-primary-300 transition-all duration-300">
      <div 
        className="flex items-start justify-between cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-4 rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow">
            <FileText className="w-7 h-7 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 truncate group-hover:text-primary-700 transition-colors">
              {result.fileName}
            </h3>
            
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-slate-600 font-medium">Total Pages:</span>
                <span className="font-bold text-primary-700 text-base">{result.totalPages}</span>
              </div>
              
              {hasIssues && (
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-semibold">Needs Review</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2.5">
              <div className="px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 rounded-lg text-sm font-semibold border border-primary-200">
                📄 {result.printedPageSequence?.filter(p => p !== null).length || 0} Pages Numbered
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-lg text-sm font-semibold border border-green-200">
                ✓ {result.pageSummary?.filter(p => p.range !== null).length || 0} With Questions
              </div>
            </div>
          </div>
        </div>

        <button className="p-3 hover:bg-primary-50 rounded-xl transition-all duration-200 ml-4 flex-shrink-0 border border-transparent hover:border-primary-200">
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-primary-600" />
          ) : (
            <ChevronDown className="w-6 h-6 text-slate-500 group-hover:text-primary-600" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t-2 border-slate-200">
          <div className="mb-6">
            <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-primary-600 rounded"></div>
              Printed Page Sequence
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {result.printedPageSequence?.map((page, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                    page === null
                      ? 'bg-red-50 text-red-700 border-2 border-red-300 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-2 border-slate-300 hover:border-primary-400 hover:shadow-md'
                  }`}
                >
                  {page === null ? '❌ No Page #' : `📄 ${page}`}
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
