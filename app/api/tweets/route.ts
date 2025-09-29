import { NextResponse } from 'next/server'
import { TwitterApi } from 'twitter-api-v2'

export const dynamic = 'force-dynamic'
export const revalidate = 300 // Revalidate every 5 minutes

// Mock tweets for when API is unavailable or rate limited
const mockTweets = [
  {
    id: '1',
    text: '🎨 Color isn\'t just aesthetic—it\'s psychological warfare in good design.\n\nWarm tones (reds, oranges) → Energy, urgency\nCool tones (blues, greens) → Trust, calm\nNeutrals → Sophistication, balance\n\nThe best designers don\'t just pick colors. They orchestrate emotions.\n\n#DesignThinking #ColorTheory #UXDesign',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    metrics: {
      like_count: 24,
      retweet_count: 8,
      reply_count: 3
    },
    url: 'https://x.com/goodquestion_ai/status/1'
  },
  {
    id: '2',
    text: 'AI is revolutionizing color selection in design:\n\n✨ Extracting palettes from images in milliseconds\n✨ Predicting color trends from social data\n✨ Generating accessible color combinations\n✨ Matching brand colors across platforms\n\nThe future of design is intelligent, not just beautiful.\n\n#AIDesign #ColorTheory',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    metrics: {
      like_count: 42,
      retweet_count: 15,
      reply_count: 7
    },
    url: 'https://x.com/goodquestion_ai/status/2'
  },
  {
    id: '3',
    text: 'Patterns in design are like jazz rhythms—They create expectation, then break it beautifully.\n\nGeometric patterns → Order, precision\nOrganic patterns → Nature, flow\nAbstract patterns → Innovation, creativity\n\nYour brand\'s pattern language speaks before your words do.\n\n#DesignPatterns #VisualDesign',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    metrics: {
      like_count: 31,
      retweet_count: 12,
      reply_count: 5
    },
    url: 'https://x.com/goodquestion_ai/status/3'
  },
  {
    id: '4',
    text: 'Here\'s the pattern paradox in design:\n\nToo much consistency = Boring\nToo much variety = Chaos\n\nThe sweet spot?\n→ Consistent structure\n→ Variable details\n→ Predictable rhythm with surprising accents\n\nMaster this, and your designs will sing.\n\n#DesignPrinciples #UIDesign',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    metrics: {
      like_count: 38,
      retweet_count: 14,
      reply_count: 6
    },
    url: 'https://x.com/goodquestion_ai/status/4'
  }
]

export async function GET() {
  try {
    const bearerToken = process.env.TWITTER_BEARER_TOKEN

    if (!bearerToken) {
      console.log('Using mock tweets - No bearer token configured')
      return NextResponse.json({
        tweets: mockTweets,
        user: {
          id: 'mock',
          username: 'goodquestion_ai',
          name: 'GoodQuestion.AI',
          profile_image: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
          description: 'AI Development for Hospitality & Home Decor'
        }
      })
    }

    const client = new TwitterApi(bearerToken)
    const readOnlyClient = client.readOnly

    // Get user by username
    const user = await readOnlyClient.v2.userByUsername(
      process.env.TWITTER_USERNAME || 'goodquestion_ai',
      {
        'user.fields': ['profile_image_url', 'description']
      }
    )

    if (!user.data) {
      console.log('Using mock tweets - User not found')
      return NextResponse.json({
        tweets: mockTweets,
        user: {
          id: 'mock',
          username: 'goodquestion_ai',
          name: 'GoodQuestion.AI',
          profile_image: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
          description: 'AI Development for Hospitality & Home Decor'
        }
      })
    }

    // Get user's tweets
    const tweets = await readOnlyClient.v2.userTimeline(user.data.id, {
      max_results: 10,
      'tweet.fields': ['created_at', 'public_metrics', 'entities'],
      exclude: ['retweets', 'replies']
    })

    const formattedTweets = tweets.data.data?.map(tweet => ({
      id: tweet.id,
      text: tweet.text,
      created_at: tweet.created_at,
      metrics: tweet.public_metrics,
      url: `https://x.com/${process.env.TWITTER_USERNAME}/status/${tweet.id}`
    })) || []

    // If no tweets found, use mock data
    if (formattedTweets.length === 0) {
      console.log('Using mock tweets - No tweets found on account')
      return NextResponse.json({
        tweets: mockTweets,
        user: {
          id: user.data.id,
          username: user.data.username,
          name: user.data.name,
          profile_image: user.data.profile_image_url,
          description: user.data.description
        }
      })
    }

    return NextResponse.json({
      tweets: formattedTweets,
      user: {
        id: user.data.id,
        username: user.data.username,
        name: user.data.name,
        profile_image: user.data.profile_image_url,
        description: user.data.description
      }
    })
  } catch (error: any) {
    console.error('Error fetching tweets:', error.message)

    // If rate limited or any error, return mock data
    console.log('Using mock tweets - API error:', error.message)
    return NextResponse.json({
      tweets: mockTweets,
      user: {
        id: 'mock',
        username: 'goodquestion_ai',
        name: 'GoodQuestion.AI',
        profile_image: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
        description: 'AI Development for Hospitality & Home Decor'
      }
    })
  }
}