import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

const PageSummaryTable = ({ pageSummary }) => {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-slate-700 mb-3">Page-by-Page Analysis</h4>
      
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-slate-200 rounded-lg">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    PDF Page
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Printed Page
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Question Range
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider hidden sm:table-cell">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {pageSummary?.map((page, idx) => {
                  const hasPageNumber = page.printedPage !== null
                  const hasQuestions = page.range !== null
                  
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {idx + 1}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                        {hasPageNumber ? (
                          <span className="text-slate-700 font-medium">{page.printedPage}</span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-red-600">
                            <XCircle className="w-4 h-4" />
                            <span className="font-medium">Not Found</span>
                          </span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                        {hasQuestions ? (
                          <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md font-medium">
                            Q{page.range}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium">No questions</span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell">
                        {hasPageNumber && hasQuestions ? (
                          <span className="flex items-center gap-1.5 text-green-600">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="font-medium">Complete</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-amber-600">
                            <AlertCircle className="w-4 h-4" />
                            <span className="font-medium">Partial</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageSummaryTable
