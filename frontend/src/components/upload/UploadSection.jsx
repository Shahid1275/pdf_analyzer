import { useState, useRef } from 'react'
import { Upload, FileText, X, AlertCircle } from 'lucide-react'
import { analyzePDFs } from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'

const UploadSection = ({ onAnalysisComplete, isLoading, setIsLoading }) => {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    )
    addFiles(droppedFiles)
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    addFiles(selectedFiles)
  }

  const addFiles = (newFiles) => {
    setError(null)
    if (files.length + newFiles.length > 10) {
      setError('Maximum 10 files allowed')
      return
    }
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setError(null)
  }

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setError('Please select at least one PDF file')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await analyzePDFs(files)
      onAnalysisComplete(result)
    } catch (err) {
      setError(err.message || 'Failed to analyze PDFs. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Analyze Your PDF Documents
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
          Upload multiple PDF files to extract page numbers and question ranges with precision
        </p>
      </div>

      <div className="card">
        <div
          className={`upload-area ${isDragging ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-primary-100 p-4 rounded-full">
              <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-primary-600" />
            </div>
            
            <div className="text-center">
              <p className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">
                Drop PDF files here or click to browse
              </p>
              <p className="text-sm text-slate-500">
                Support for multiple files • Maximum 10 files • PDF format only
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="application/pdf"
              onChange={handleFileSelect}
              className="input-file"
            />
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-600" />
              Selected Files ({files.length}/10)
            </h3>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    className="p-1.5 hover:bg-red-100 rounded-lg transition-colors ml-2 flex-shrink-0"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAnalyze}
            disabled={isLoading || files.length === 0}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Analyzing PDFs...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>Analyze {files.length > 0 ? `${files.length} File${files.length > 1 ? 's' : ''}` : 'PDFs'}</span>
              </>
            )}
          </button>
          
          {files.length > 0 && !isLoading && (
            <button
              onClick={() => {
                setFiles([])
                setError(null)
              }}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">📄</div>
          <h3 className="font-semibold text-slate-700 mb-1">Page Detection</h3>
          <p className="text-sm text-slate-600">Accurately extract printed page numbers</p>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">🔍</div>
          <h3 className="font-semibold text-slate-700 mb-1">Question Analysis</h3>
          <p className="text-sm text-slate-600">Identify question ranges per page</p>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">⚡</div>
          <h3 className="font-semibold text-slate-700 mb-1">Fast Processing</h3>
          <p className="text-sm text-slate-600">Quick and efficient batch analysis</p>
        </div>
      </div>
    </div>
  )
}

export default UploadSection
