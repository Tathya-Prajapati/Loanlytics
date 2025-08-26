"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, Users, MapPin, DollarSign, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BiassDashboard() {
  const router = useRouter()

  const biasMetrics = {
    overall: 12,
    gender: 15,
    location: 10,
    income: 20,
    age: 5,
    ethnicity: 8,
  }

  const recentAnalyses = [
    { id: 1, applicant: "John Smith", overallBias: 12, status: "Low Risk" },
    { id: 2, applicant: "Sarah Johnson", overallBias: 35, status: "Medium Risk" },
    { id: 3, applicant: "Michael Chen", overallBias: 8, status: "Low Risk" },
    { id: 4, applicant: "Maria Garcia", overallBias: 45, status: "High Risk" },
  ]

  const getBiasLevel = (score: number) => {
    if (score <= 20) return { level: "Low", color: "text-green-600", variant: "default" as const }
    if (score <= 40) return { level: "Medium", color: "text-yellow-600", variant: "secondary" as const }
    return { level: "High", color: "text-red-600", variant: "destructive" as const }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bias Detection Dashboard</h1>
              <p className="text-gray-600">Monitor and analyze potential bias in loan evaluations</p>
            </div>
          </div>
        </div>

        {/* Overall Bias Score */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Overall Bias Assessment
            </CardTitle>
            <CardDescription>Current bias risk level across all demographic factors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-6">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${getBiasLevel(biasMetrics.overall).color}`}>
                  {biasMetrics.overall}%
                </div>
                <Badge variant={getBiasLevel(biasMetrics.overall).variant} className="text-lg px-4 py-2">
                  {getBiasLevel(biasMetrics.overall).level} Bias Risk
                </Badge>
              </div>
            </div>
            <Progress value={biasMetrics.overall} className="h-3" />
          </CardContent>
        </Card>

        {/* Bias Factors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-blue-600" />
                Gender Bias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{biasMetrics.gender}%</span>
                <Badge variant={getBiasLevel(biasMetrics.gender).variant}>
                  {getBiasLevel(biasMetrics.gender).level}
                </Badge>
              </div>
              <Progress value={biasMetrics.gender} className="h-2" />
              <p className="text-xs text-gray-600 mt-2">Analysis of gender-based decision patterns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-green-600" />
                Location Bias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{biasMetrics.location}%</span>
                <Badge variant={getBiasLevel(biasMetrics.location).variant}>
                  {getBiasLevel(biasMetrics.location).level}
                </Badge>
              </div>
              <Progress value={biasMetrics.location} className="h-2" />
              <p className="text-xs text-gray-600 mt-2">Geographic and regional bias detection</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                Income Bias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{biasMetrics.income}%</span>
                <Badge variant={getBiasLevel(biasMetrics.income).variant}>
                  {getBiasLevel(biasMetrics.income).level}
                </Badge>
              </div>
              <Progress value={biasMetrics.income} className="h-2" />
              <p className="text-xs text-gray-600 mt-2">Income-level discrimination analysis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
                Age Bias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{biasMetrics.age}%</span>
                <Badge variant={getBiasLevel(biasMetrics.age).variant}>{getBiasLevel(biasMetrics.age).level}</Badge>
              </div>
              <Progress value={biasMetrics.age} className="h-2" />
              <p className="text-xs text-gray-600 mt-2">Age-related bias in loan decisions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-indigo-600" />
                Ethnicity Bias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{biasMetrics.ethnicity}%</span>
                <Badge variant={getBiasLevel(biasMetrics.ethnicity).variant}>
                  {getBiasLevel(biasMetrics.ethnicity).level}
                </Badge>
              </div>
              <Progress value={biasMetrics.ethnicity} className="h-2" />
              <p className="text-xs text-gray-600 mt-2">Ethnic and cultural bias detection</p>
            </CardContent>
          </Card>

          <Card className="flex items-center justify-center">
            <CardContent className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">System Status</h3>
              <Badge variant="default">Bias Monitoring Active</Badge>
              <p className="text-xs text-gray-600 mt-2">Real-time bias detection enabled</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Analyses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bias Analyses</CardTitle>
            <CardDescription>Latest loan applications and their bias risk assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnalyses.map((analysis) => (
                <div key={analysis.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{analysis.applicant}</h4>
                      <p className="text-sm text-gray-600">Analysis #{analysis.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${getBiasLevel(analysis.overallBias).color}`}>
                        {analysis.overallBias}%
                      </div>
                      <p className="text-xs text-gray-600">Bias Score</p>
                    </div>
                    <Badge variant={getBiasLevel(analysis.overallBias).variant}>{analysis.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
