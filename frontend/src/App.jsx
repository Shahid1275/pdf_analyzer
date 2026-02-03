import { useState } from 'react'
import Header from './components/layout/Header'
import UploadSection from './components/upload/UploadSection'
import ResultsSection from './components/results/ResultsSection'
import Footer from './components/layout/Footer'

function App() {
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalysisComplete = (data) => {
    setResults(data)
  }

  const handleReset = () => {
    setResults(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {!results ? (
            <UploadSection 
              onAnalysisComplete={handleAnalysisComplete}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <ResultsSection 
              results={results}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
