const { BskyAgent, RichText } = require('@atproto/api');

async function main() {
  const agent = new BskyAgent({ service: 'https://bsky.social' });
  await agent.login({ identifier: 'agentabrams.bsky.social', password: '*Blueaccess911*' });

  // Search for Boris Cherny on Bluesky
  const searches = ['boris cherny', 'bcherny', 'boris anthropic claude code'];
  let borisProfile = null;

  for (const q of searches) {
    try {
      const r = await agent.searchActors({ term: q, limit: 5 });
      for (const a of r.data.actors) {
        console.log('Found: @' + a.handle + ' | ' + (a.displayName || '') + ' | ' + (a.description || '').substring(0, 100));
        if ((a.displayName || '').toLowerCase().includes('boris') ||
            a.handle.includes('boris') || a.handle.includes('bcherny')) {
          borisProfile = a;
        }
      }
    } catch(e) {}
  }

  if (borisProfile) {
    console.log('\nBoris found: @' + borisProfile.handle);
    // Follow him
    if (!borisProfile.viewer?.following) {
      await agent.follow(borisProfile.did);
      console.log('Followed Boris!');
    }

    // Get his recent posts and engage
    try {
      const feed = await agent.getAuthorFeed({ actor: borisProfile.handle, limit: 5 });
      for (const item of feed.data.feed) {
        const post = item.post;
        const text = post.record.text || '';
        console.log('Post: ' + text.substring(0, 100));

        // Like all his recent posts
        try {
          await agent.like(post.uri, post.cid);
          console.log('  Liked');
        } catch(e) {}
      }

      // Reply to most recent relevant post
      if (feed.data.feed.length > 0) {
        const latestPost = feed.data.feed[0].post;
        const thread = await agent.getPostThread({ uri: latestPost.uri, depth: 0 });
        const p = thread.data.thread.post;
        const rt = new RichText({
          text: 'Been running 50+ agents in production built on Claude Code. The tool keeps getting better. Appreciate you building it.'
        });
        await rt.detectFacets(agent);
        await agent.post({
          text: rt.text,
          facets: rt.facets,
          reply: {
            root: { uri: p.uri, cid: p.cid },
            parent: { uri: p.uri, cid: p.cid }
          },
          createdAt: new Date().toISOString(),
        });
        console.log('Replied to Boris!');
      }
    } catch(e) {
      console.log('Feed error: ' + (e.message || '').substring(0, 60));
    }
  } else {
    console.log('\nBoris not found on Bluesky - searching for his content mentions...');

    // Search for posts about Boris Cherny / Claude Code creator
    try {
      const r = await agent.app.bsky.feed.searchPosts({ q: 'boris cherny claude code', limit: 5, sort: 'latest' });
      for (const p of r.data.posts) {
        console.log('@' + p.author.handle + ': ' + (p.record.text || '').substring(0, 100));
        // Like posts about Boris/Claude Code
        try {
          await agent.like(p.uri, p.cid);
          console.log('  Liked');
        } catch(e) {}
      }
    } catch(e) {}
  }

  // Also engage with Felix Rieseberg's latest (he builds Claude at Anthropic)
  try {
    const feed = await agent.getAuthorFeed({ actor: 'felixrieseberg.bsky.social', limit: 3 });
    for (const item of feed.data.feed.slice(1)) { // skip first (already engaged)
      try {
        await agent.like(item.post.uri, item.post.cid);
        console.log('Liked Felix: ' + (item.post.record.text || '').substring(0, 70));
      } catch(e) {}
    }
  } catch(e) {}

  // Also engage with Ado's older posts
  try {
    const feed = await agent.getAuthorFeed({ actor: 'adocomplete.com', limit: 5 });
    for (const item of feed.data.feed.slice(1)) {
      try {
        await agent.like(item.post.uri, item.post.cid);
        console.log('Liked Ado: ' + (item.post.record.text || '').substring(0, 70));
      } catch(e) {}
    }
  } catch(e) {}

  const me = await agent.getProfile({ actor: 'agentabrams.bsky.social' });
  console.log('\nProfile: ' + me.data.followsCount + ' following | ' + me.data.followersCount + ' followers | ' + me.data.postsCount + ' posts');
  console.log('Boris engagement complete!');
}

main().catch(e => console.error(e.message));
