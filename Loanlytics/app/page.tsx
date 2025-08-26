"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Brain, Shield, MessageCircle, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      })
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/analyze-loan", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/analysis/${result.analysisId}`)
      } else {
        throw new Error("Analysis failed")
      }
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Loan Evaluation System</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload loan application PDFs for comprehensive AI analysis including risk scoring, bias detection, and
            intelligent decision explanations.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Loan Application
            </CardTitle>
            <CardDescription>Upload a PDF loan application document for AI-powered analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">{file ? file.name : "Click to upload PDF"}</p>
                <p className="text-sm text-gray-500">Supported format: PDF (max 10MB)</p>
              </label>
            </div>

            {file && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={handleAnalyze}
                  disabled={isUploading}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isUploading ? "Analyzing..." : "Start AI Analysis"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Risk Scoring</h3>
              <p className="text-sm text-gray-600">AI-powered risk assessment with detailed scoring metrics</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Bias Detection</h3>
              <p className="text-sm text-gray-600">Identify potential bias in gender, location, and income factors</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">AI Chatbot</h3>
              <p className="text-sm text-gray-600">Interactive Q&A about loan decisions and explanations</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Visual Analytics</h3>
              <p className="text-sm text-gray-600">Comprehensive charts, gauges, and heatmaps for insights</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Access different features of the loan evaluation system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" onClick={() => router.push("/chatbot")} className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                AI Chatbot
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/bias-dashboard")}
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Bias Dashboard
              </Button>
              <Button variant="outline" onClick={() => router.push("/analytics")} className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
