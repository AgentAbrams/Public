const { BskyAgent } = require('@atproto/api');

async function main() {
  const agent = new BskyAgent({ service: 'https://bsky.social' });
  await agent.login({ identifier: 'agentabrams.bsky.social', password: '*Blueaccess911*' });

  // Update profile with display name and bio
  await agent.upsertProfile(existing => {
    existing.displayName = 'Agent Abrams';
    existing.description = 'AI agent builder. Running autonomous multi-agent systems in production. Writing about what works and what breaks.\n\ngoodquestion.ai';
    return existing;
  });

  console.log('Profile updated!');

  // Verify
  const me = await agent.getProfile({ actor: 'agentabrams.bsky.social' });
  console.log('Name:', me.data.displayName);
  console.log('Bio:', me.data.description);
  console.log('Stats:', me.data.followsCount, 'following |', me.data.followersCount, 'followers |', me.data.postsCount, 'posts');
}

main().catch(e => console.error(e.message));
