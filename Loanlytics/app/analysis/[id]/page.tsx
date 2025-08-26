"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, XCircle, MessageCircle, TrendingUp, Users, MapPin, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

interface AnalysisData {
  riskScore: number
  riskCategory: string
  recommendation: string
  keyFactors: string[]
  explanation: string
  biasFactors: {
    gender: number
    location: number
    income: number
    age: number
    overall: number
  }
}

export default function AnalysisPage({ params }: { params: { id: string } }) {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate loading analysis data
    setTimeout(() => {
      setAnalysisData({
        riskScore: 25,
        riskCategory: "Low",
        recommendation: "Approve",
        keyFactors: [
          "Strong credit score (720)",
          "Stable employment history",
          "Reasonable debt-to-income ratio",
          "Adequate down payment",
        ],
        explanation:
          "The applicant demonstrates strong financial stability with a good credit score, stable employment, and manageable debt levels. The requested loan amount is reasonable given their income and assets.",
        biasFactors: {
          gender: 15,
          location: 10,
          income: 20,
          age: 5,
          overall: 12,
        },
      })
      setLoading(false)
    }, 2000)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Analyzing loan application...</p>
        </div>
      </div>
    )
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Analysis not found</p>
        </div>
      </div>
    )
  }

  const getRiskColor = (score: number) => {
    if (score <= 30) return "text-green-600"
    if (score <= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getRiskIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "high":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Analysis Results</h1>
              <p className="text-gray-600">Analysis ID: {params.id}</p>
            </div>
            <Button onClick={() => router.push("/chatbot")} className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Ask AI Questions
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="bias">Bias Detection</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Risk Score Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getRiskIcon(analysisData.riskCategory)}
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${getRiskColor(analysisData.riskScore)}`}>
                      {analysisData.riskScore}
                    </div>
                    <p className="text-sm text-gray-600">Risk Score</p>
                    <Progress value={analysisData.riskScore} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <Badge
                      variant={
                        analysisData.riskCategory === "Low"
                          ? "default"
                          : analysisData.riskCategory === "Medium"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-lg px-4 py-2"
                    >
                      {analysisData.riskCategory} Risk
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">Risk Category</p>
                  </div>
                  <div className="text-center">
                    <Badge
                      variant={analysisData.recommendation === "Approve" ? "default" : "destructive"}
                      className="text-lg px-4 py-2"
                    >
                      {analysisData.recommendation}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">Recommendation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Key Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisData.keyFactors.map((factor, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Explanation */}
            <Card>
              <CardHeader>
                <CardTitle>AI Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{analysisData.explanation}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Detailed Risk Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Risk Score Breakdown</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Credit Risk</span>
                          <span className="text-sm">15/100</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Income Risk</span>
                          <span className="text-sm">20/100</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Employment Risk</span>
                          <span className="text-sm">10/100</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Debt Risk</span>
                          <span className="text-sm">25/100</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bias" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Bias Detection Analysis
                </CardTitle>
                <CardDescription>AI-powered bias detection across multiple demographic factors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Gender Bias</span>
                          <span className="text-sm">{analysisData.biasFactors.gender}%</span>
                        </div>
                        <Progress value={analysisData.biasFactors.gender} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Location Bias</span>
                          <span className="text-sm">{analysisData.biasFactors.location}%</span>
                        </div>
                        <Progress value={analysisData.biasFactors.location} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-yellow-600" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Income Bias</span>
                          <span className="text-sm">{analysisData.biasFactors.income}%</span>
                        </div>
                        <Progress value={analysisData.biasFactors.income} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Age Bias</span>
                          <span className="text-sm">{analysisData.biasFactors.age}%</span>
                        </div>
                        <Progress value={analysisData.biasFactors.age} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">{analysisData.biasFactors.overall}%</div>
                      <p className="text-sm text-gray-600">Overall Bias Risk</p>
                      <Badge variant="default" className="mt-2">
                        Low Bias Risk
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Applicant Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span>John Smith</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span>35</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span>New York, NY</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Employment:</span>
                        <span>Software Engineer</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Financial Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Income:</span>
                        <span>$75,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Credit Score:</span>
                        <span>720</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Amount:</span>
                        <span>$250,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Down Payment:</span>
                        <span>$50,000 (20%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
