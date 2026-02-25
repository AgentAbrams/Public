#!/usr/bin/env node
/**
 * Post to Bluesky (@agentabrams.bsky.social)
 * Usage: node bsky-post.cjs --text "Post text" [--url "https://..."] [--link-text "Click here"]
 */
const { BskyAgent, RichText } = require('@atproto/api');

const BSKY_SERVICE = 'https://bsky.social';
const BSKY_HANDLE = 'agentabrams.bsky.social';
const BSKY_PASSWORD = process.env.BSKY_PASSWORD || '*Blueaccess911*';

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--text' && args[i + 1]) result.text = args[++i];
    if (args[i] === '--url' && args[i + 1]) result.url = args[++i];
    if (args[i] === '--link-text' && args[i + 1]) result.linkText = args[++i];
  }
  return result;
}

async function post() {
  const opts = parseArgs();
  if (!opts.text) {
    console.error('Usage: node bsky-post.cjs --text "Post text" [--url "https://..."]');
    process.exit(1);
  }

  const agent = new BskyAgent({ service: BSKY_SERVICE });
  console.log('Logging in as', BSKY_HANDLE, '...');
  await agent.login({ identifier: BSKY_HANDLE, password: BSKY_PASSWORD });
  console.log('Logged in successfully.');

  // Build post text with optional URL appended
  let fullText = opts.text;
  if (opts.url && !fullText.includes(opts.url)) {
    fullText += '\n\n' + opts.url;
  }

  // Truncate to 300 chars (Bluesky limit)
  if (fullText.length > 300) {
    fullText = fullText.substring(0, 297) + '...';
  }

  // Use RichText to auto-detect links, mentions, tags
  const rt = new RichText({ text: fullText });
  await rt.detectFacets(agent);

  // Build embed card if URL provided
  let embed = undefined;
  if (opts.url) {
    embed = {
      $type: 'app.bsky.embed.external',
      external: {
        uri: opts.url,
        title: opts.linkText || opts.text.substring(0, 60),
        description: 'Read more at goodquestion.ai',
      },
    };
  }

  const result = await agent.post({
    text: rt.text,
    facets: rt.facets,
    embed: embed,
    createdAt: new Date().toISOString(),
  });

  console.log('Posted to Bluesky!');
  console.log('URI:', result.uri);
  console.log('CID:', result.cid);
  const postId = result.uri.split('/').pop();
  console.log('URL: https://bsky.app/profile/' + BSKY_HANDLE + '/post/' + postId);
}

post().catch(e => {
  console.error('Error posting to Bluesky:', e.message);
  process.exit(1);
});
