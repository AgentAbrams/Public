"use client"

import { useEffect, useState } from "react"
import { Twitter, Heart, Repeat2, MessageCircle, ExternalLink } from "lucide-react"
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

interface TwitterFeedProps {
  limit?: number
  showTitle?: boolean
}

export function TwitterFeed({ limit = 4, showTitle = true }: TwitterFeedProps) {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTweets() {
      try {
        const response = await fetch('/api/tweets')
        if (!response.ok) {
          throw new Error('Failed to fetch tweets')
        }
        const data = await response.json()
        setTweets(data.tweets.slice(0, limit))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tweets')
        console.error('Error fetching tweets:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTweets()
  }, [limit])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        {showTitle && (
          <div className="flex items-center gap-2 mb-4">
            <Twitter className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Latest on X</h2>
          </div>
        )}
        <div className="space-y-4">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        {showTitle && (
          <div className="flex items-center gap-2 mb-4">
            <Twitter className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Latest on X</h2>
          </div>
        )}
        <p className="text-gray-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Twitter className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Latest on X</h2>
          </div>
          <Link
            href="https://x.com/goodquestion_ai"
            target="_blank"
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            Follow
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="border-b border-white/10 last:border-0 pb-4 last:pb-0"
          >
            <p className="text-gray-300 mb-2 leading-relaxed">{tweet.text}</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-gray-500">
                {tweet.metrics && (
                  <>
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
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{formatDate(tweet.created_at)}</span>
                <Link
                  href={tweet.url}
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tweets.length === 0 && (
        <p className="text-gray-400 text-center py-4">No tweets found</p>
      )}
    </div>
  )
}