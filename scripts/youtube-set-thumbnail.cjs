/**
 * Set YouTube Video Thumbnail
 * Usage: node youtube-set-thumbnail.cjs <video-id> <thumbnail-path>
 */
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI || 'http://localhost:3456/oauth/callback';
const TOKEN_PATH = path.join(__dirname, '..', '.youtube-token.json');

async function setThumbnail() {
  const videoId = process.argv[2];
  const thumbPath = process.argv[3];

  if (!videoId || !thumbPath) {
    console.error('Usage: node youtube-set-thumbnail.cjs <video-id> <thumbnail-path>');
    process.exit(1);
  }

  if (!fs.existsSync(thumbPath)) {
    console.error(`Thumbnail not found: ${thumbPath}`);
    process.exit(1);
  }

  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  oauth2Client.setCredentials(tokens);

  oauth2Client.on('tokens', (newTokens) => {
    const merged = { ...tokens, ...newTokens };
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(merged, null, 2));
  });

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

  console.log(`Setting thumbnail for video ${videoId}...`);
  console.log(`Thumbnail: ${thumbPath}`);

  try {
    const res = await youtube.thumbnails.set({
      videoId,
      media: {
        mimeType: 'image/png',
        body: fs.createReadStream(thumbPath),
      },
    });
    console.log('Thumbnail set successfully!');
    console.log(`URL: ${res.data.items?.[0]?.default?.url || 'Processing...'}`);
  } catch (err) {
    console.error('Failed:', err.message);
    if (err.code === 403) {
      console.error('Note: Custom thumbnails require a verified YouTube account.');
    }
    process.exit(1);
  }
}

setThumbnail();
