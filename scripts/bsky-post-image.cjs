#!/usr/bin/env node
/**
 * Post to Bluesky with image + link card
 * Usage: node bsky-post-image.cjs --text "..." --image /path/to/image.png --url "https://..." --alt "alt text"
 */
const fs = require('fs');
const path = require('path');
const { BskyAgent, RichText } = require('@atproto/api');

const BSKY_SERVICE = 'https://bsky.social';
const BSKY_HANDLE = 'agentabrams.bsky.social';
const BSKY_PASSWORD = process.env.BSKY_PASSWORD || '*Blueaccess911*';

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--text' && args[i + 1]) result.text = args[++i];
    if (args[i] === '--image' && args[i + 1]) result.image = args[++i];
    if (args[i] === '--url' && args[i + 1]) result.url = args[++i];
    if (args[i] === '--alt' && args[i + 1]) result.alt = args[++i];
  }
  return result;
}

async function post() {
  const opts = parseArgs();
  if (!opts.text) {
    console.error('Usage: node bsky-post-image.cjs --text "..." --image /path.png --url "https://..."');
    process.exit(1);
  }

  const agent = new BskyAgent({ service: BSKY_SERVICE });
  await agent.login({ identifier: BSKY_HANDLE, password: BSKY_PASSWORD });

  // Build post text with URL
  let fullText = opts.text;
  if (opts.url && !fullText.includes(opts.url)) {
    fullText += '\n\n' + opts.url;
  }

  // Trim to 300 graphemes
  if ([...fullText].length > 300) {
    const chars = [...fullText];
    fullText = chars.slice(0, 297).join('') + '...';
  }

  const rt = new RichText({ text: fullText });
  await rt.detectFacets(agent);

  // Upload image if provided
  let embed = undefined;
  if (opts.image && fs.existsSync(opts.image)) {
    const imgData = fs.readFileSync(opts.image);
    const mimeType = opts.image.endsWith('.jpg') || opts.image.endsWith('.jpeg')
      ? 'image/jpeg' : 'image/png';

    console.log(`Uploading image (${(imgData.length / 1024).toFixed(0)}KB)...`);
    const uploadResp = await agent.uploadBlob(imgData, { encoding: mimeType });

    embed = {
      $type: 'app.bsky.embed.images',
      images: [{
        alt: opts.alt || opts.text.substring(0, 100),
        image: uploadResp.data.blob,
        aspectRatio: { width: 1200, height: 675 },
      }],
    };
  } else if (opts.url) {
    // Fallback to link card if no image
    embed = {
      $type: 'app.bsky.embed.external',
      external: {
        uri: opts.url,
        title: opts.text.substring(0, 60),
        description: 'Read more at goodquestion.ai',
      },
    };
  }

  const result = await agent.post({
    text: rt.text,
    facets: rt.facets,
    embed,
    createdAt: new Date().toISOString(),
  });

  const postId = result.uri.split('/').pop();
  const postUrl = `https://bsky.app/profile/${BSKY_HANDLE}/post/${postId}`;
  console.log('Posted to Bluesky!');
  console.log('URL:', postUrl);
}

post().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
