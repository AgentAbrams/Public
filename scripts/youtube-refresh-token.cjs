#!/usr/bin/env node
/**
 * YouTube OAuth Token Auto-Refresh
 *
 * Refreshes the YouTube access token using the stored refresh_token.
 * Run via cron every 6 days to prevent token expiry.
 *
 * Cron: 0 6 [every-6-days] node /root/Projects/goodquestion-ai/scripts/youtube-refresh-token.cjs
 *
 * If refresh fails (invalid_grant), sends Slack alert for manual re-auth.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const TOKEN_PATH = path.join(__dirname, '..', '.youtube-token.json');
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;

function log(msg) {
  const ts = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  console.log(`[${ts} PT] ${msg}`);
}

async function sendSlackAlert(message) {
  if (!SLACK_WEBHOOK) {
    log('No SLACK_WEBHOOK_URL configured — skipping alert');
    return;
  }

  return new Promise((resolve) => {
    const payload = JSON.stringify({ text: message });
    const urlObj = new URL(SLACK_WEBHOOK);

    const req = https.request({
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, (res) => {
      res.on('data', () => {});
      res.on('end', resolve);
    });

    req.on('error', () => resolve());
    req.write(payload);
    req.end();
  });
}

async function refreshToken() {
  log('YouTube Token Auto-Refresh starting...');

  // Load current tokens
  let tokens;
  try {
    tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
  } catch (err) {
    log(`ERROR: Cannot read token file: ${err.message}`);
    await sendSlackAlert('🔴 YouTube token file missing or corrupted. Manual re-auth needed: `node scripts/youtube-auth.cjs`');
    process.exit(1);
  }

  if (!tokens.refresh_token) {
    log('ERROR: No refresh_token in token file');
    await sendSlackAlert('🔴 YouTube refresh_token missing. Manual re-auth needed: `node scripts/youtube-auth.cjs`');
    process.exit(1);
  }

  // Check current expiry
  const currentExpiry = tokens.expiry_date ? new Date(tokens.expiry_date) : null;
  const now = new Date();
  log(`Current token expires: ${currentExpiry ? currentExpiry.toISOString() : 'unknown'}`);
  log(`Time until expiry: ${currentExpiry ? Math.round((currentExpiry - now) / 3600000) + 'h' : 'unknown'}`);

  // Use googleapis to refresh
  let google;
  try {
    google = require(path.join(__dirname, '..', 'node_modules', 'googleapis')).google;
  } catch {
    log('ERROR: googleapis not installed');
    process.exit(1);
  }

  const oauth2 = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI || 'http://localhost:3456/oauth/callback'
  );

  oauth2.setCredentials(tokens);

  try {
    const result = await oauth2.refreshAccessToken();
    const newTokens = result.credentials;

    // Save refreshed tokens
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(newTokens, null, 2));

    const newExpiry = new Date(newTokens.expiry_date);
    log(`SUCCESS — Token refreshed!`);
    log(`New expiry: ${newExpiry.toISOString()}`);
    log(`Next refresh due before: ${new Date(Date.now() + 6 * 86400000).toISOString()}`);

    await sendSlackAlert(`✅ YouTube token auto-refreshed. New expiry: ${newExpiry.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT`);

  } catch (err) {
    log(`REFRESH FAILED: ${err.message}`);

    if (err.message.includes('invalid_grant')) {
      log('Refresh token expired — manual re-auth required');
      await sendSlackAlert(
        '🔴 YouTube refresh token EXPIRED. Manual re-auth needed:\n' +
        '```\ncd /root/Projects/goodquestion-ai\n' +
        'node scripts/youtube-auth.cjs\n```\n' +
        'Then open the auth URL in a browser and complete the OAuth flow.'
      );
    } else {
      await sendSlackAlert(`🟡 YouTube token refresh failed: ${err.message}. Will retry next cycle.`);
    }

    process.exit(1);
  }
}

refreshToken().catch(err => {
  log(`FATAL: ${err.message}`);
  process.exit(1);
});
