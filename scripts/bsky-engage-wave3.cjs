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
      console.log('Reply skip: ' + (e.message || '').substring(0, 60));
      return false;
    }
  }

  // Search for fresh posts about building with AI, shipping, solo dev
  const queries = ['building with ai', 'solo dev ai', 'shipped today', 'mcp server', 'claude api'];
  let allPosts = [];

  for (const q of queries) {
    try {
      const r = await agent.app.bsky.feed.searchPosts({ q, limit: 5, sort: 'latest' });
      for (const p of r.data.posts) {
        if (p.author.handle !== 'agentabrams.bsky.social') {
          allPosts.push(p);
        }
      }
    } catch(e) {}
  }

  // Deduplicate
  const seen = new Set();
  allPosts = allPosts.filter(p => {
    if (seen.has(p.uri)) return false;
    seen.add(p.uri);
    return true;
  });

  console.log('Found ' + allPosts.length + ' fresh posts');

  // Like everything relevant
  let liked = 0;
  for (const p of allPosts.slice(0, 12)) {
    try {
      await agent.like(p.uri, p.cid);
      console.log('Liked @' + p.author.handle + ': ' + (p.record.text || '').substring(0, 70));
      liked++;
    } catch(e) {}
  }
  console.log('Liked ' + liked + ' posts\n');

  // Pick 3 to reply to with thoughtful short comments
  const replyPairs = [];
  for (const p of allPosts) {
    const t = (p.record.text || '').toLowerCase();
    if (t.includes('ship') || t.includes('built') || t.includes('launch')) {
      replyPairs.push([p.uri, 'Shipping beats perfection every time. Nice work.']);
    } else if (t.includes('mcp') || t.includes('plugin') || t.includes('extension')) {
      replyPairs.push([p.uri, 'The MCP ecosystem is still early but the composability is already wild. Every good tool makes the whole stack better.']);
    } else if (t.includes('solo') || t.includes('indie') || t.includes('one person')) {
      replyPairs.push([p.uri, 'Solo + AI agents is the new small team. The leverage is real.']);
    } else if (t.includes('api') || t.includes('integrat')) {
      replyPairs.push([p.uri, 'APIs are the nervous system. Once the agents can call them reliably, everything compounds.']);
    }
    if (replyPairs.length >= 3) break;
  }

  for (const [uri, text] of replyPairs) {
    await replyToPost(uri, text);
  }

  // Post a third original thought
  const text3 = 'Things I learned running 50+ autonomous agents in production:\n\n1. The agent that monitors other agents is the most important one\n2. Rate limits are your friend not your enemy\n3. Every agent needs a kill switch\n4. Log everything. You will need it at 2am.\n\n#AIAgents #DevOps';
  const rt3 = new RichText({ text: text3 });
  await rt3.detectFacets(agent);
  const r = await agent.post({ text: rt3.text, facets: rt3.facets, createdAt: new Date().toISOString() });
  console.log('\nNew post: ' + r.uri);

  // Final stats
  const me = await agent.getProfile({ actor: 'agentabrams.bsky.social' });
  console.log('\nFinal stats: ' + me.data.followsCount + ' following | ' + me.data.followersCount + ' followers | ' + me.data.postsCount + ' posts');
  console.log('Wave 3 complete!');
}

main().catch(e => console.error(e.message));
