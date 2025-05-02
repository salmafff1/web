import { FileUploader } from "@/components/file-uploader"
import { ResultsDisplay } from "@/components/results-display"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            Document OCR & Keyword Extraction
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Upload a handwritten document to extract text and key concepts in any language
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <FileUploader />
          <ResultsDisplay />
        </div>
      </div>
    </main>
  )
}
