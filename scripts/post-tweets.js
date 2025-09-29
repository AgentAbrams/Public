const { TwitterApi } = require('twitter-api-v2');

// Initialize Twitter client with API keys
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

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
];

async function postTweets() {
  console.log('Starting to post tweets...\n');

  for (let i = 0; i < tweets.length; i++) {
    try {
      const result = await client.v2.tweet(tweets[i]);
      console.log(`✅ Tweet ${i + 1} posted successfully!`);
      console.log(`   Tweet ID: ${result.data.id}`);
      console.log(`   URL: https://x.com/goodquestion_ai/status/${result.data.id}\n`);

      // Wait 30 seconds between tweets to avoid rate limiting
      if (i < tweets.length - 1) {
        console.log('Waiting 30 seconds before next tweet...\n');
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
    } catch (error) {
      console.error(`❌ Error posting tweet ${i + 1}:`, error.message);
      if (error.data) {
        console.error('   Details:', JSON.stringify(error.data, null, 2));
      }
    }
  }

  console.log('\n✅ All tweets processed!');
}

postTweets().catch(console.error);