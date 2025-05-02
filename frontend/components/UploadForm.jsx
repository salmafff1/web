"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { FileText, Upload, Loader2 } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function FileUploader() {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const onDrop = useCallback(
    (acceptedFiles) => {
      const selectedFile = acceptedFiles[0]

      // Check file type
      const validTypes = ["image/jpeg", "image/png", "application/pdf"]
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, or PDF file.",
          variant: "destructive",
        })
        return
      }

      // Check file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB.",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
    },
    [toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  })

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    try {
      // Create FormData
      const formData = new FormData()
      formData.append("document", file)

      // Here you would make an API call to your backend
      // For now, we'll simulate a successful upload with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful processing
      localStorage.setItem(
        "processedText",
        "This is a sample extracted text from your document. In a real implementation, this would be the actual text extracted from your uploaded document using OCR technology.",
      )
      localStorage.setItem("keywords", JSON.stringify(["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]))
      localStorage.setItem("detectedLanguage", "English")

      toast({
        title: "Document processed successfully",
        description: "Your document has been analyzed.",
      })

      // Refresh the page to show results
      router.refresh()
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "There was an error processing your document.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    localStorage.removeItem("processedText")
    localStorage.removeItem("keywords")
    localStorage.removeItem("detectedLanguage")
    router.refresh()
  }

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-slate-400 bg-slate-100 dark:border-slate-500 dark:bg-slate-800/50"
              : "border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600"
          } ${file ? "bg-slate-50 dark:bg-slate-800/30" : ""}`}
        >
          <input {...getInputProps()} />

          {file ? (
            <div className="flex flex-col items-center">
              <FileText className="h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{file.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {isDragActive ? "Drop your document here" : "Drag & drop your document here"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Supports JPG, PNG, and PDF (max 10MB)</p>
              <Button variant="outline" size="sm" className="mt-4">
                Select File
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          {file && (
            <>
              <Button variant="outline" onClick={resetUpload} disabled={isUploading}>
                Reset
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Process Document"
                )}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
