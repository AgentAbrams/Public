const { BskyAgent, RichText } = require('@atproto/api');

async function main() {
  const agent = new BskyAgent({ service: 'https://bsky.social' });
  await agent.login({ identifier: 'agentabrams.bsky.social', password: '*Blueaccess911*' });

  // Search for posts to engage with
  const searches = ['ai agents autonomous', 'vibe coding', 'claude code', 'agentic workflow'];
  let postsToEngage = [];

  for (const q of searches) {
    try {
      const r = await agent.app.bsky.feed.searchPosts({ q, limit: 5, sort: 'latest' });
      for (const p of r.data.posts) {
        if (p.author.handle !== 'agentabrams.bsky.social') {
          postsToEngage.push({
            uri: p.uri,
            cid: p.cid,
            author: p.author.handle,
            name: p.author.displayName,
            text: p.record.text.substring(0, 120),
            likes: p.likeCount || 0
          });
        }
      }
    } catch(e) {}
  }

  // Deduplicate
  const seen = new Set();
  postsToEngage = postsToEngage.filter(p => {
    if (seen.has(p.uri)) return false;
    seen.add(p.uri);
    return true;
  });

  console.log('Found ' + postsToEngage.length + ' posts to engage with');

  // Like the most relevant ones
  let liked = 0;
  for (const p of postsToEngage.slice(0, 15)) {
    try {
      await agent.like(p.uri, p.cid);
      console.log('Liked: @' + p.author + ' | ' + p.text.substring(0, 80));
      liked++;
    } catch(e) {
      console.log('Skip @' + p.author + ': ' + (e.message || '').substring(0, 50));
    }
  }
  console.log('\nLiked ' + liked + ' posts');

  // Reply to engaging posts
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
      console.error('Reply failed:', (e.message || '').substring(0, 80));
      return false;
    }
  }

  // Find good posts to reply to (about agents/autonomous/shipping)
  const engPosts = postsToEngage.filter(p =>
    p.text.toLowerCase().includes('agent') ||
    p.text.toLowerCase().includes('autonom') ||
    p.text.toLowerCase().includes('ship') ||
    p.text.toLowerCase().includes('vibe')
  );

  if (engPosts.length > 0) {
    await replyToPost(engPosts[0].uri,
      'Autonomous agents are the unlock. Once you stop babysitting and let them run, the compounding is wild.'
    );
  }
  if (engPosts.length > 1) {
    await replyToPost(engPosts[1].uri,
      'Building in public with AI agents is the move. Every session ships something real.'
    );
  }

  // Also search for and follow Boris Jabes and other influencers
  console.log('\n--- Searching for influencers ---');
  const people = [
    'boris jabes', 'swyx', 'simon willison', 'karpathy', 'levelsio',
    'deedy', 'pieter levels', 'sahil lavingia'
  ];
  const followTargets = [];
  for (const q of people) {
    try {
      const r = await agent.searchActors({ term: q, limit: 3 });
      for (const a of r.data.actors) {
        if ((a.followersCount || 0) > 100) {
          console.log('@' + a.handle + ' | ' + (a.displayName || '') + ' | followers: ' + a.followersCount);
          followTargets.push(a);
        }
      }
    } catch(e) {}
  }

  // Follow found influencers
  for (const a of followTargets) {
    try {
      if (!a.viewer?.following) {
        await agent.follow(a.did);
        console.log('Followed @' + a.handle);
      }
    } catch(e) {}
  }

  console.log('\nEngagement round complete!');
}

main().catch(e => console.error(e.message));
