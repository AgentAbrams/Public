const { BskyAgent, RichText } = require('@atproto/api');

async function main() {
  const agent = new BskyAgent({ service: 'https://bsky.social' });
  await agent.login({ identifier: 'agentabrams.bsky.social', password: '*Blueaccess911*' });

  async function replyToPost(postUri, replyText) {
    try {
      const thread = await agent.getPostThread({ uri: postUri, depth: 0 });
      const post = thread.data.thread.post;
      const rt = new RichText({ text: replyText });
      await rt.detectFacets(agent);
      await agent.post({
        text: rt.text,
        facets: rt.facets,
        reply: {
          root: { uri: post.uri, cid: post.cid },
          parent: { uri: post.uri, cid: post.cid }
        },
        createdAt: new Date().toISOString(),
      });
      console.log('Replied to @' + post.author.handle);
      return true;
    } catch(e) {
      console.error('Reply failed @' + postUri.split('/')[2] + ': ' + (e.message || '').substring(0, 60));
      return false;
    }
  }

  // Engage with Anthropic people's recent posts
  const anthropicPeople = [
    'adocomplete.com',           // Ado Kukic - Community, Claude, Code
    'felixrieseberg.bsky.social', // Felix - Building Claude
    'johnlindquist.com',         // John Lindquist - egghead workshops
  ];

  for (const handle of anthropicPeople) {
    try {
      const feed = await agent.getAuthorFeed({ actor: handle, limit: 3 });
      for (const item of feed.data.feed) {
        const post = item.post;
        const text = post.record.text || '';
        const isRelevant = text.toLowerCase().includes('claude') ||
                          text.toLowerCase().includes('agent') ||
                          text.toLowerCase().includes('code') ||
                          text.toLowerCase().includes('build') ||
                          text.toLowerCase().includes('ship');

        // Like their recent posts
        try {
          await agent.like(post.uri, post.cid);
          console.log('Liked @' + handle + ': ' + text.substring(0, 70));
        } catch(e) {}

        // Reply to the most relevant one
        if (isRelevant && text.length > 30) {
          const replies = [
            'Shipping is the real test. Respect the pace you and the team keep.',
            'The Claude Code ecosystem is growing fast. Good to see the community building on top of it.',
            'This is exactly what makes Claude Code different. The developer experience keeps getting better.',
          ];
          const reply = replies[Math.floor(Math.random() * replies.length)];
          await replyToPost(post.uri, reply);
          break; // Only reply to one post per person
        }
      }
    } catch(e) {
      console.log('Feed error @' + handle + ': ' + (e.message || '').substring(0, 60));
    }
  }

  // Post a second success/thought-leadership post
  const text2 = 'Hot take: The biggest advantage of AI agents isn\'t speed. It\'s that they never skip verification.\n\nI just watched my agent verify 70 vendor links against a live API, remove dead ones, and rebuild a nav menu. A human would have spot-checked maybe 10.\n\n#AIAgents #Automation';
  const rt2 = new RichText({ text: text2 });
  await rt2.detectFacets(agent);
  const post2 = await agent.post({
    text: rt2.text,
    facets: rt2.facets,
    createdAt: new Date().toISOString(),
  });
  console.log('\nNew post: ' + post2.uri);

  // Follow more Claude Code ecosystem people
  const moreFollows = [
    'claudecodechanges.bsky.social',
    'claudaceae.bsky.social',
    'claude.notjack.space',
    'skilltouch.bsky.social',
  ];
  for (const handle of moreFollows) {
    try {
      const profile = await agent.getProfile({ actor: handle });
      if (!profile.data.viewer?.following) {
        await agent.follow(profile.data.did);
        console.log('Followed @' + handle);
      }
    } catch(e) {}
  }

  // Check our updated stats
  const me = await agent.getProfile({ actor: 'agentabrams.bsky.social' });
  console.log('\nProfile stats: ' + me.data.followsCount + ' following | ' + me.data.followersCount + ' followers | ' + me.data.postsCount + ' posts');

  console.log('\nWave 2 complete!');
}

main().catch(e => console.error(e.message));
