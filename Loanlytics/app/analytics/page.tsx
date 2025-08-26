"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, Users, FileText, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

export default function AnalyticsPage() {
  const router = useRouter()

  const riskDistribution = [
    { name: "Low Risk", value: 65, color: "#10B981" },
    { name: "Medium Risk", value: 25, color: "#F59E0B" },
    { name: "High Risk", value: 10, color: "#EF4444" },
  ]

  const monthlyAnalyses = [
    { month: "Jan", analyses: 45, approved: 38, denied: 7 },
    { month: "Feb", analyses: 52, approved: 41, denied: 11 },
    { month: "Mar", analyses: 48, approved: 39, denied: 9 },
    { month: "Apr", analyses: 61, approved: 48, denied: 13 },
    { month: "May", analyses: 55, approved: 44, denied: 11 },
    { month: "Jun", analyses: 67, approved: 53, denied: 14 },
  ]

  const biasMetrics = [
    { factor: "Gender", score: 15 },
    { factor: "Location", score: 10 },
    { factor: "Income", score: 20 },
    { factor: "Age", score: 5 },
    { factor: "Ethnicity", score: 8 },
  ]

  const performanceMetrics = [
    { metric: "Total Analyses", value: "328", change: "+12%", icon: FileText },
    { metric: "Approval Rate", value: "78%", change: "+3%", icon: TrendingUp },
    { metric: "Avg Risk Score", value: "32", change: "-5%", icon: AlertTriangle },
    { metric: "Bias Incidents", value: "4", change: "-25%", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Comprehensive insights into loan evaluation performance</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <p className={`text-sm ${metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                        {metric.change} from last month
                      </p>
                    </div>
                    <Icon className="h-8 w-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
              <CardDescription>Distribution of loan applications by risk category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Analysis Trend</CardTitle>
              <CardDescription>Number of loan analyses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyAnalyses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="analyses" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="approved" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="denied" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bias Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Bias Detection Metrics</CardTitle>
              <CardDescription>Bias scores across different demographic factors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={biasMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="factor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Approval vs Denial */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Approvals vs Denials</CardTitle>
              <CardDescription>Comparison of approved and denied applications</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyAnalyses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="approved" fill="#10B981" />
                  <Bar dataKey="denied" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
