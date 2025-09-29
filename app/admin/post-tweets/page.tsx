"use client"

import { useState } from "react"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { Copy, Check, Twitter, ExternalLink } from "lucide-react"

const tweets = [
  `🎨 Color isn't just aesthetic—it's psychological warfare in good design.

Warm tones (reds, oranges) → Energy, urgency
Cool tones (blues, greens) → Trust, calm
Neutrals → Sophistication, balance

The best designers don't just pick colors. They orchestrate emotions.

#DesignThinking #ColorTheory #UXDesign`,

  `Patterns in design are like jazz rhythms—
They create expectation, then break it beautifully.

Geometric patterns → Order, precision
Organic patterns → Nature, flow
Abstract patterns → Innovation, creativity

Your brand's pattern language speaks before your words do.

#DesignPatterns #VisualDesign #BrandIdentity`,

  `AI is revolutionizing color selection in design:

✨ Extracting palettes from images in milliseconds
✨ Predicting color trends from social data
✨ Generating accessible color combinations
✨ Matching brand colors across platforms

The future of design is intelligent, not just beautiful.

#AIDesign #ColorTheory #DesignAutomation`,

  `Here's the pattern paradox in design:

Too much consistency = Boring
Too much variety = Chaos

The sweet spot?
→ Consistent structure
→ Variable details
→ Predictable rhythm with surprising accents

Master this, and your designs will sing.

#DesignPrinciples #UIDesign #VisualHierarchy`
]

export default function PostTweetsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const copyAll = async () => {
    const allTweets = tweets.join('\n\n---\n\n')
    try {
      await navigator.clipboard.writeText(allTweets)
      setCopiedIndex(-1)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <>
      <WebGLShader />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Post
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              4 tweets about color and pattern in design
            </p>
            <div className="flex gap-4 justify-center">
              <LiquidButton
                onClick={copyAll}
                className="gap-2"
                size="lg"
              >
                {copiedIndex === -1 ? (
                  <>
                    <Check className="h-5 w-5" />
                    All Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    Copy All 4 Tweets
                  </>
                )}
              </LiquidButton>
              <a
                href="https://x.com/compose/tweet"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiquidButton variant="outline" className="gap-2" size="lg">
                  <Twitter className="h-5 w-5" />
                  Open X.com
                  <ExternalLink className="h-4 w-4" />
                </LiquidButton>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {tweets.map((tweet, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-400">
                    Tweet {index + 1}
                  </h3>
                  <LiquidButton
                    onClick={() => copyToClipboard(tweet, index)}
                    size="sm"
                    className="gap-2"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </LiquidButton>
                </div>
                <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {tweet}
                </pre>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-500">
                    {tweet.length} characters
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-white/10">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Twitter className="h-5 w-5 text-blue-400" />
              Quick Post Instructions
            </h3>
            <ol className="space-y-2 text-gray-300">
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Click "Copy" on each tweet or "Copy All 4 Tweets"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Click "Open X.com" or go to x.com/compose/tweet</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Paste and post each tweet (space them 15-30 min apart)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">4.</span>
                <span>After posting, find 4 verified AI accounts to retweet</span>
              </li>
            </ol>
          </div>

          <div className="mt-8 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-xl font-bold mb-3 text-purple-400">
              Suggested Accounts to Engage With:
            </h3>
            <ul className="grid md:grid-cols-2 gap-3 text-gray-300">
              <li>• @sama (Sam Altman - OpenAI)</li>
              <li>• @GregBrockman (Greg Brockman - OpenAI)</li>
              <li>• @ylecun (Yann LeCun - Meta AI)</li>
              <li>• @AndrewYNg (Andrew Ng - AI Pioneer)</li>
              <li>• @karpathy (Andrej Karpathy - AI Researcher)</li>
              <li>• @hardmaru (David Ha - Stability AI)</li>
              <li>• @emollick (Ethan Mollick - AI & Education)</li>
              <li>• @bindureddy (Binu Reddy - AI Builder)</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}