"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe } from "lucide-react"

export function ResultsDisplay() {
  const [processedText, setProcessedText] = useState(null)
  const [keywords, setKeywords] = useState([])
  const [language, setLanguage] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const text = localStorage.getItem("processedText")
    const storedKeywords = localStorage.getItem("keywords")
    const detectedLanguage = localStorage.getItem("detectedLanguage")

    if (text) setProcessedText(text)
    if (storedKeywords) setKeywords(JSON.parse(storedKeywords))
    if (detectedLanguage) setLanguage(detectedLanguage)
  }, [])

  if (!isClient) return null
  if (!processedText) return null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Analysis Results</CardTitle>
          {language && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-500">Detected language: {language}</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="text">
            <TabsList className="mb-4">
              <TabsTrigger value="text">Extracted Text</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <div className="rounded-md border p-4 bg-slate-50 dark:bg-slate-900">
                <p className="whitespace-pre-line text-sm">{processedText}</p>
              </div>
            </TabsContent>

            <TabsContent value="keywords">
              <div className="rounded-md border p-4 bg-slate-50 dark:bg-slate-900">
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Upload your handwritten document (JPG, PNG, or PDF)</li>
            <li>Our OCR engine extracts text from your document</li>
            <li>Natural language processing identifies the document language</li>
            <li>Advanced algorithms extract the 5 most important keywords</li>
            <li>View and copy your extracted text and keywords</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
