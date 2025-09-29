import { NextResponse } from "next/server"

export async function GET() {
  // This is a placeholder for future Twitter API integration
  // For now, we use the client-side Twitter embed widget

  const tweets = [
    {
      id: "1",
      text: "Excited to announce our new AI-powered color extraction tool for the home decor industry! 🎨",
      author: "GoodQuestionAI",
      date: new Date().toISOString(),
    },
    {
      id: "2",
      text: "Just launched visual search capabilities for our hospitality clients. Game-changer! 🚀",
      author: "GoodQuestionAI",
      date: new Date().toISOString(),
    },
    {
      id: "3",
      text: "AI is transforming how businesses connect with customers. Read our latest blog post!",
      author: "GoodQuestionAI",
      date: new Date().toISOString(),
    },
  ]

  return NextResponse.json({ tweets })
}