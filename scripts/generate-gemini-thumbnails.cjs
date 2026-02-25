/**
 * Gemini AI YouTube Thumbnail Generator
 * Uses the Gemini 2.0 Flash image generation model to create
 * 5 professional YouTube thumbnail images at 1280x720.
 *
 * Model: gemini-2.0-flash-exp-image-generation
 * API: https://generativelanguage.googleapis.com/v1beta/
 *
 * Usage:
 *   node generate-gemini-thumbnails.cjs
 *   node generate-gemini-thumbnails.cjs --name parallel-agents
 *
 * @module generate-gemini-thumbnails
 */

'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const GEMINI_API_KEY = process.env.GEMINI_IMAGE_API_KEY;
const MODEL = 'gemini-2.0-flash-exp-image-generation';
const GEMINI_HOST = 'generativelanguage.googleapis.com';
const GEMINI_PATH = `/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const OUTDIR = path.join(__dirname, '..', 'dashboard-captures');

/** Maximum retry attempts per thumbnail */
const MAX_RETRIES = 3;
/** Delay between retries in milliseconds (exponential back-off base) */
const RETRY_BASE_DELAY_MS = 5000;
/** Per-request timeout in milliseconds */
const REQUEST_TIMEOUT_MS = 120_000;

// ---------------------------------------------------------------------------
// Thumbnail prompt definitions
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ThumbnailDef
 * @property {string} name  - Output filename stem (gemini-thumb-{name}.png)
 * @property {string} prompt - Prompt sent to Gemini image generation
 */

/** @type {ThumbnailDef[]} */
const THUMBNAILS = [
  {
    name: 'parallel-agents',
    prompt:
      'A dark futuristic tech thumbnail for YouTube. Shows 6 glowing AI agent nodes connected by neon orange lines on a dark navy background. Large bold white text "PARALLEL AGENTS" with smaller orange text "AT SCALE". Terminal/code aesthetic. Professional, clean, dark theme. 1280x720.',
  },
  {
    name: 'dashboard-walkthrough',
    prompt:
      'A dark futuristic tech thumbnail for YouTube. Shows a glowing command center dashboard hologram with data visualizations in teal/cyan. Large bold white text "COMMAND CENTER" with smaller teal text "DASHBOARD TOUR". 95 vendor nodes visible. Professional, dark theme. 1280x720.',
  },
  {
    name: 'remote-control',
    prompt:
      'A dark futuristic tech thumbnail for YouTube. Shows a hand controlling multiple floating AI processes/containers glowing purple. Large bold white text "AUTONOMOUS AGENTS" with smaller purple text "105 PROCESSES". Dark background with grid pattern. 1280x720.',
  },
  {
    name: 'blog-tour',
    prompt:
      'A dark futuristic tech thumbnail for YouTube. Shows a blog website emerging from code/terminal with golden glowing text. Large bold white text "AI BUILDS ITS OWN BLOG" with smaller gold text. Astro.js logo aesthetic. Dark theme. 1280x720.',
  },
  {
    name: 'tracking-progress',
    prompt:
      'A dark futuristic tech thumbnail for YouTube. Shows an upward trending chart/graph going from 94K to 118K with glowing cyan data points. Large bold white text "DATA PIPELINE" with smaller cyan text "FROM ZERO TO 118K". Dark navy background. 1280x720.',
  },
];

// ---------------------------------------------------------------------------
// HTTP helper — wraps https.request as a Promise
// ---------------------------------------------------------------------------

/**
 * Sends a JSON POST request via Node's built-in https module.
 *
 * @param {string} host
 * @param {string} urlPath
 * @param {object} body - Request payload (will be JSON-serialised)
 * @param {number} [timeoutMs=REQUEST_TIMEOUT_MS]
 * @returns {Promise<object>} Parsed JSON response body
 */
function httpsPost(host, urlPath, body, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);

    const options = {
      hostname: host,
      path: urlPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch (e) {
          return reject(new Error(`Failed to parse JSON response: ${raw.slice(0, 200)}`));
        }
        if (res.statusCode >= 400) {
          const errMsg = parsed?.error?.message || JSON.stringify(parsed).slice(0, 300);
          return reject(new Error(`HTTP ${res.statusCode}: ${errMsg}`));
        }
        resolve(parsed);
      });
    });

    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error(`Request timed out after ${timeoutMs}ms`));
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Core: call Gemini and extract image bytes
// ---------------------------------------------------------------------------

/**
 * Calls the Gemini image generation API for a single prompt.
 *
 * @param {string} prompt
 * @returns {Promise<Buffer>} PNG/JPEG image data as a Buffer
 */
async function generateImage(prompt) {
  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  };

  const response = await httpsPost(GEMINI_HOST, GEMINI_PATH, requestBody);

  // Walk the response parts looking for image data
  const parts = response?.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part?.inlineData?.mimeType?.startsWith('image/')) {
      const base64Data = part.inlineData.data;
      if (!base64Data) {
        throw new Error('Image part found but data field is empty');
      }
      return Buffer.from(base64Data, 'base64');
    }
  }

  // No image found — log the raw response structure for debugging
  const textParts = parts
    .filter((p) => p?.text)
    .map((p) => p.text)
    .join(' ');
  throw new Error(
    `No image data in response. Text parts: "${textParts.slice(0, 300)}" | ` +
    `Finish reason: ${response?.candidates?.[0]?.finishReason ?? 'unknown'}`
  );
}

// ---------------------------------------------------------------------------
// Retry wrapper with exponential back-off
// ---------------------------------------------------------------------------

/**
 * Calls an async function with retry logic and exponential back-off.
 *
 * @template T
 * @param {() => Promise<T>} fn - Async function to retry
 * @param {number} maxRetries
 * @param {number} baseDelayMs
 * @param {string} label - Human-readable label for log output
 * @returns {Promise<T>}
 */
async function withRetry(fn, maxRetries, baseDelayMs, label) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        const delay = baseDelayMs * Math.pow(2, attempt - 1);
        console.warn(
          `  [${label}] Attempt ${attempt}/${maxRetries} failed: ${err.message}. ` +
          `Retrying in ${delay / 1000}s...`
        );
        await sleep(delay);
      }
    }
  }
  throw lastError;
}

/**
 * Returns a promise that resolves after the given number of milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Resize using sharp (optional, but ensures exact 1280x720 output)
// ---------------------------------------------------------------------------

/**
 * Optionally resizes the image buffer to 1280x720 using sharp.
 * Falls back to writing the raw buffer if sharp is unavailable.
 *
 * @param {Buffer} imageBuffer
 * @param {string} outPath
 * @returns {Promise<void>}
 */
async function saveImage(imageBuffer, outPath) {
  let sharp;
  try {
    sharp = require('/root/Projects/goodquestion-ai/node_modules/sharp');
  } catch (_) {
    // sharp not available — write raw bytes
  }

  if (sharp) {
    await sharp(imageBuffer)
      .resize(1280, 720, { fit: 'cover', position: 'center' })
      .png({ quality: 95 })
      .toFile(outPath);
  } else {
    fs.writeFileSync(outPath, imageBuffer);
  }
}

// ---------------------------------------------------------------------------
// Process a single thumbnail definition
// ---------------------------------------------------------------------------

/**
 * Generates and saves one thumbnail image.
 *
 * @param {ThumbnailDef} def
 * @returns {Promise<{name: string, outPath: string, success: boolean, error?: string}>}
 */
async function processThumbnail(def) {
  const outPath = path.join(OUTDIR, `gemini-thumb-${def.name}.png`);
  console.log(`\n[${def.name}] Starting generation...`);
  console.log(`  Prompt: ${def.prompt.slice(0, 80)}...`);

  try {
    const imageBuffer = await withRetry(
      () => generateImage(def.prompt),
      MAX_RETRIES,
      RETRY_BASE_DELAY_MS,
      def.name
    );

    await saveImage(imageBuffer, outPath);

    const fileSizeKb = (fs.statSync(outPath).size / 1024).toFixed(0);
    console.log(`  [${def.name}] Saved: ${outPath} (${fileSizeKb} KB)`);
    return { name: def.name, outPath, success: true };
  } catch (err) {
    console.error(`  [${def.name}] FAILED after ${MAX_RETRIES} attempts: ${err.message}`);
    return { name: def.name, outPath, success: false, error: err.message };
  }
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

/**
 * Main function — parses CLI args, ensures output directory exists,
 * and runs thumbnail generation sequentially to avoid rate limits.
 *
 * @returns {Promise<void>}
 */
async function main() {
  console.log('=== Gemini Thumbnail Generator ===');
  console.log(`Model: ${MODEL}`);
  console.log(`Output directory: ${OUTDIR}\n`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTDIR)) {
    fs.mkdirSync(OUTDIR, { recursive: true });
  }

  // Parse optional --name filter
  const args = process.argv.slice(2);
  const nameIdx = args.indexOf('--name');
  const filterName = nameIdx !== -1 ? args[nameIdx + 1] : null;

  const targets = filterName
    ? THUMBNAILS.filter((t) => t.name === filterName)
    : THUMBNAILS;

  if (filterName && targets.length === 0) {
    console.error(`Error: No thumbnail defined with name "${filterName}"`);
    console.error(`Valid names: ${THUMBNAILS.map((t) => t.name).join(', ')}`);
    process.exit(1);
  }

  // Run sequentially — Gemini image gen can be slow, and parallel requests
  // risk hitting quota limits
  const results = [];
  for (const def of targets) {
    const result = await processThumbnail(def);
    results.push(result);
    // Brief pause between requests to stay within rate limits
    if (targets.indexOf(def) < targets.length - 1) {
      console.log('  Pausing 3s before next request...');
      await sleep(3000);
    }
  }

  // Summary
  console.log('\n=== Summary ===');
  const succeeded = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  if (succeeded.length > 0) {
    console.log(`\nSucceeded (${succeeded.length}):`);
    succeeded.forEach((r) => console.log(`  gemini-thumb-${r.name}.png`));
  }

  if (failed.length > 0) {
    console.log(`\nFailed (${failed.length}):`);
    failed.forEach((r) => console.log(`  ${r.name}: ${r.error}`));
  }

  console.log(`\nTotal: ${succeeded.length}/${results.length} thumbnails generated successfully.`);

  if (failed.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
