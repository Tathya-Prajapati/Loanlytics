import { type NextRequest, NextResponse } from "next/server"

// Simplified IBM Watson integration
async function callIBMWatson(prompt: string): Promise<string> {
  try {
    // Get IBM Watson access token
    const tokenResponse = await fetch("https://iam.cloud.ibm.com/identity/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: `grant_type=urn:iam:grant-type:apikey&apikey=${process.env.IBM_APIKEY}`,
    })

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Call IBM Watson text generation
    const response = await fetch("https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        input: prompt,
        parameters: {
          decoding_method: "greedy",
          max_new_tokens: 500,
          temperature: 0.7,
        },
        model_id: "ibm/granite-13b-chat-v2",
        project_id: process.env.IBM_PROJECT_ID,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("IBM Watson API error:", data)
      throw new Error(`IBM Watson API error: ${data.error || "Unknown error"}`)
    }

    return data.results?.[0]?.generated_text || "I'm sorry, I couldn't generate a response at this time."
  } catch (error) {
    console.error("IBM Watson call failed:", error)
    return "I'm experiencing technical difficulties. Please try again later."
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const systemPrompt = `You are an AI loan analysis assistant. You help explain loan decisions, risk factors, and bias detection results. 

Context: You have access to a loan analysis for John Smith:
- Risk Score: 25/100 (Low Risk)
- Recommendation: Approve
- Key factors: Strong credit score (720), stable employment, reasonable debt-to-income ratio
- Bias factors: Low overall bias risk (12%)

Provide helpful, accurate responses about loan analysis and decisions.

User question: ${message}

Please provide a helpful response:`

    const response = await callIBMWatson(systemPrompt)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json(
      {
        response: "I'm sorry, I'm experiencing technical difficulties. Please try again later.",
      },
      { status: 200 },
    ) // Return 200 to avoid frontend errors
  }
}
