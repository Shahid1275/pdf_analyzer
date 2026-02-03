import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

const PageSummaryTable = ({ pageSummary }) => {
  return (
    <div className="mt-6">
      <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
        <div className="w-1 h-5 bg-primary-600 rounded"></div>
        Detailed Page Analysis
      </h4>
      
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border-2 border-slate-200 rounded-xl shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    PDF Page
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Printed Page
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Question Range
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider hidden sm:table-cell">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {pageSummary?.map((page, idx) => {
                  const hasPageNumber = page.printedPage !== null
                  const hasQuestions = page.range !== null
                  
                  return (
                    <tr key={idx} className="hover:bg-primary-50/50 transition-colors">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                          {idx + 1}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                        {hasPageNumber ? (
                          <span className="text-slate-800 font-bold bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                            📄 {page.printedPage}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-red-600 font-semibold">
                            <XCircle className="w-4 h-4" />
                            Not Found
                          </span>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                        {hasQuestions ? (
                          <span className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-lg font-bold border border-green-300">
                            Q{page.range}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-semibold italic">No questions</span>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell">
                        {hasPageNumber && hasQuestions ? (
                          <span className="flex items-center gap-2 text-green-600 font-semibold">
                            <CheckCircle2 className="w-5 h-5" />
                            Complete
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-amber-600 font-semibold">
                            <AlertCircle className="w-5 h-5" />
                            Partial
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
