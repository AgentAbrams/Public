/**
 * Unlist YouTube videos by ID
 * Usage: node youtube-unlist.cjs <id1> <id2> ...
 */
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const REDIRECT_URI = process.env.YOUTUBE_REDIRECT_URI || 'http://localhost:3456/oauth/callback';
const TOKEN_PATH = path.join(__dirname, '..', '.youtube-token.json');

async function unlistVideos() {
  const videoIds = process.argv.slice(2);
  if (videoIds.length === 0) {
    console.error('Usage: node youtube-unlist.cjs <video-id> [<video-id> ...]');
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
      const res = await youtube.videos.list({ part: ['snippet', 'status'], id: [id] });
      if (!res.data.items || res.data.items.length === 0) {
        console.log(`${id}: NOT FOUND`);
        continue;
      }
      const title = res.data.items[0].snippet.title;
      const currentStatus = res.data.items[0].status.privacyStatus;

      if (currentStatus === 'unlisted') {
        console.log(`${id}: Already unlisted (${title})`);
        continue;
      }

      await youtube.videos.update({
        part: ['status'],
        requestBody: {
          id: id,
          status: { privacyStatus: 'unlisted', selfDeclaredMadeForKids: false }
        }
      });
      console.log(`${id}: UNLISTED (was ${currentStatus}) — ${title}`);
    } catch (err) {
      console.log(`${id}: ERROR — ${err.message}`);
    }
  }
}

unlistVideos();
