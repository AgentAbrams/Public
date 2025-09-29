"use client"

import { useEffect, useState } from "react"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { Twitter, Heart, Repeat2, MessageCircle, ExternalLink, Calendar } from "lucide-react"
import Link from "next/link"

interface Tweet {
  id: string
  text: string
  created_at: string
  metrics?: {
    like_count: number
    retweet_count: number
    reply_count: number
  }
  url: string
}

export default function BlogPage() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTweets() {
      try {
        const response = await fetch('/api/tweets')
        if (response.ok) {
          const data = await response.json()
          setTweets(data.tweets)
        }
      } catch (error) {
        console.error('Error fetching tweets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTweets()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <WebGLShader />
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Blog & Insights
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore the latest trends, insights, and innovations in AI for hospitality and home decor.
            </p>
            <div className="flex justify-center items-center gap-2 mt-4">
              <Twitter className="h-5 w-5 text-blue-400" />
              <Link
                href="https://x.com/goodquestion_ai"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                Follow us on X
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 animate-pulse">
                  <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : tweets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tweets.map((tweet) => (
                <article
                  key={tweet.id}
                  className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="h-4 w-4" />
                      {formatDate(tweet.created_at)}
                    </div>
                    <Twitter className="h-5 w-5 text-blue-400" />
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed line-clamp-6">
                    {tweet.text}
                  </p>

                  {tweet.metrics && (
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-white/10">
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {tweet.metrics.like_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Repeat2 className="h-4 w-4" />
                        {tweet.metrics.retweet_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {tweet.metrics.reply_count}
                      </span>
                    </div>
                  )}

                  <Link
                    href={tweet.url}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View on X
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Twitter className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-400">No posts available yet</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}

          {/* Static Featured Posts */}
          {tweets.length > 0 && (
            <div className="mt-16 pt-16 border-t border-white/10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Featured Articles
                </span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-3xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-white/10 p-8">
                  <h3 className="text-2xl font-bold mb-3">The AI Revolution in Hospitality</h3>
                  <p className="text-gray-300 mb-4">
                    How artificial intelligence is transforming customer experiences and operational efficiency in hotels and restaurants.
                  </p>
                  <span className="text-sm text-blue-400">7 min read</span>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-white/10 p-8">
                  <h3 className="text-2xl font-bold mb-3">Color Psychology in Home Decor</h3>
                  <p className="text-gray-300 mb-4">
                    Understanding how AI-powered color extraction can enhance product recommendations and customer satisfaction.
                  </p>
                  <span className="text-sm text-purple-400">5 min read</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}