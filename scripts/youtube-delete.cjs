/**
 * Delete YouTube videos by ID (PERMANENT - cannot be undone)
 * Usage: node youtube-delete.cjs <id1> <id2> ...
 */
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI || 'http://localhost:3456/oauth/callback';
const TOKEN_PATH = path.join(__dirname, '..', '.youtube-token.json');

async function deleteVideos() {
  const videoIds = process.argv.slice(2);
  if (videoIds.length === 0) {
    console.error('Usage: node youtube-delete.cjs <video-id> [<video-id> ...]');
    process.exit(1);
  }

  const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  oauth2Client.setCredentials(tokens);
  oauth2Client.on('tokens', (newTokens) => {
    fs.writeFileSync(TOKEN_PATH, JSON.stringify({ ...tokens, ...newTokens }, null, 2));
  });

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

  for (const id of videoIds) {
    try {
      // First get info for logging
      const res = await youtube.videos.list({ part: ['snippet'], id: [id] });
      const title = res.data.items?.[0]?.snippet?.title || 'Unknown';

      await youtube.videos.delete({ id });
      console.log(`DELETED: ${id} — ${title}`);
    } catch (err) {
      console.log(`ERROR ${id}: ${err.message}`);
    }
  }
}

deleteVideos();
