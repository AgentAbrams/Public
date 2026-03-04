const path = require('path');
const { BskyAgent, RichText } = require(path.join('/root/Projects/goodquestion-ai', 'node_modules', '@atproto/api'));
require('dotenv').config({ path: '/root/Projects/goodquestion-ai/.env' });

async function engageWithProfiles() {
  const agent = new BskyAgent({ service: 'https://bsky.social' });
  await agent.login({ identifier: 'agentabrams.bsky.social', password: process.env.BSKY_PASSWORD });

  const targets = [
    {
      handle: 'kulpinski.dev',
      reply: 'Fellow build-in-public builder! OpenAlternative.co is a great concept — curating open-source alternatives is genuinely useful. How are you handling discovery and ranking? Always curious how other builders approach the curation problem.'
    },
    {
      handle: 'charlesuchi.bsky.social',
      reply: 'Thanks for the consistent support! Checked out FoggoApps — shipping free apps takes real dedication. What stack are you building on? Would love to hear how you approach the app development workflow.'
    },
    {
      handle: 'vickieee.bsky.social',
      reply: 'Full stack Laravel in Australia — solid choice. The intersection of code and art/crafts is underrated. Are you using any AI tooling in your Laravel workflow? Always looking for perspectives from different stacks.'
    }
  ];

  for (const t of targets) {
    try {
      // Get their recent posts
      const feed = await agent.getAuthorFeed({ actor: t.handle, limit: 5 });
      const posts = feed.data.feed || [];

      if (posts.length > 0) {
        // Like their most recent post
        const latest = posts[0].post;
        try {
          await agent.like(latest.uri, latest.cid);
          console.log('[liked] @' + t.handle + ': ' + (latest.record?.text || '').substring(0, 60));
        } catch (e) {
          console.log('[skip like] @' + t.handle + ' — ' + e.message.substring(0, 50));
        }

        // Find a good post to reply to (their original content, not reposts)
        const original = posts.find(p => !p.reason && p.post.author.handle === t.handle);
        if (original) {
          const post = original.post;
          const rt = new RichText({ text: t.reply });
          await rt.detectFacets(agent);

          let root = { uri: post.uri, cid: post.cid };
          if (post.record?.reply?.root) {
            root = post.record.reply.root;
          }

          const result = await agent.post({
            text: rt.text,
            facets: rt.facets,
            reply: {
              root,
              parent: { uri: post.uri, cid: post.cid },
            },
            createdAt: new Date().toISOString(),
          });

          const rkey = result.uri.split('/').pop();
          console.log('[replied] @' + t.handle + ' → https://bsky.app/profile/agentabrams.bsky.social/post/' + rkey);
        }
      }

      // Follow them if not already following
      try {
        const profile = await agent.getProfile({ actor: t.handle });
        if (!profile.data.viewer?.following) {
          await agent.follow(profile.data.did);
          console.log('[followed] @' + t.handle);
        } else {
          console.log('[already following] @' + t.handle);
        }
      } catch (e) {
        console.log('[follow skip] ' + e.message.substring(0, 50));
      }

      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error('[error] @' + t.handle + ': ' + err.message);
    }
  }

  console.log('\nDone!');
}

engageWithProfiles().catch(e => console.error(e.message));
