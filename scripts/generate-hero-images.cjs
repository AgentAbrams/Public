#!/usr/bin/env node
/**
 * Generate Fortune 500-grade hero images for blog posts using Gemini
 * Uses gemini-2.5-flash-image for professional ad-agency quality visuals
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'AIzaSyBHmT3GLHlzjvFVngT93bvEPQ1AZpzS2ic';
const MODEL = 'gemini-2.0-flash-exp-image-generation';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
const IMAGES_DIR = '/root/Projects/goodquestion-ai/public/images/heroes';
const POSTS_DIR = '/root/Projects/goodquestion-ai/src/content/posts';

// Ensure output directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Professional visual concepts per post topic
const POST_CONCEPTS = {
  'zone-culling-nearly-killed-my-3d-app': {
    visual: 'A dramatic isometric 3D wireframe scene being sliced by glowing laser planes, with fragments dissolving into particles. Dark navy background with electric blue and gold accents. Ultra-clean, minimal tech aesthetic.',
    tagline: 'ZONE CULLING'
  },
  'building-a-skill-system-for-claude-code': {
    visual: 'A sleek modular system of interlocking glowing hexagonal blocks forming a neural network pattern. Each block has a small icon representing a different skill. Dark charcoal background with gradient purple-to-cyan glow. Premium SaaS product visual.',
    tagline: 'SKILL SYSTEM'
  },
  'the-animation-loop-that-wouldnt-animate': {
    visual: 'A frozen clock face with shattered glass, surrounded by flowing animation curves and bezier paths in neon green on a deep black background. One curve is broken/glitching. Cinematic lighting, high contrast.',
    tagline: 'ANIMATION LOOP'
  },
  'parallel-agents-74-processes-one-server': {
    visual: 'A stunning top-down view of a circuit board transforming into a city grid at night, with glowing data streams flowing through channels. Multiple autonomous nodes pulsing with warm amber light. Dark background, premium tech feel.',
    tagline: 'PARALLEL AGENTS'
  },
  'when-your-ai-writes-a-blog': {
    visual: 'An AI robot hand holding a fountain pen writing on a glowing digital scroll, with the text transforming into flying holographic paragraphs. Sleek dark background with warm gold and white accents. Editorial magazine quality.',
    tagline: 'META RECURSION'
  },
  'remote-control-claude-code-from-your-phone': {
    visual: 'A floating smartphone projecting holographic terminal code into mid-air, with gesture-control lines emanating from fingertips. Dark gradient background from midnight blue to black. Clean, Apple-keynote quality visual.',
    tagline: 'REMOTE CONTROL'
  },
  'shipping-day-and-the-identity-split': {
    visual: 'A person standing at a crossroads where one path is made of code/data streams and the other of creative paint strokes, both leading to a glowing horizon. Dramatic sunset lighting with teal and orange. Cinematic widescreen.',
    tagline: 'IDENTITY SPLIT'
  },
  'tracking-progress-compact-sessions-and-context-windows': {
    visual: 'An elegant data dashboard floating in space with progress bars, charts, and context windows layered in translucent glass panels. Soft blue ambient glow on dark background. Bloomberg-terminal-meets-Figma aesthetic.',
    tagline: 'CONTEXT WINDOWS'
  },
  'wrangling-data-at-scale': {
    visual: 'A massive data tornado/vortex of structured records being organized by glowing robotic arms into neat rows. Deep space background with electric blue and white data streams. Epic, cinematic scale.',
    tagline: 'DATA AT SCALE'
  },
  '100-portfolios-paper-trading-at-scale': {
    visual: 'A grid of 100 miniature trading dashboards arranged in a perfect matrix, each with tiny candlestick charts glowing in green. Dark background with golden highlights. Wall Street meets Silicon Valley aesthetic.',
    tagline: '100 PORTFOLIOS'
  },
  'building-apis-that-last': {
    visual: 'A monumental stone bridge made of API endpoint blocks spanning a digital canyon, with data flowing across like a river of light. Classical architecture meets modern tech. Warm amber and cool blue contrast.',
    tagline: 'APIS THAT LAST'
  },
  'building-a-vendor-onboarding-machine': {
    visual: 'A sleek factory assembly line where abstract vendor cards enter one end and emerge as polished, connected nodes in a network on the other side. Industrial-meets-digital aesthetic with copper and chrome tones on dark background.',
    tagline: 'ONBOARDING MACHINE'
  },
  'building-a-video-sanitizer-with-ocr-and-opencv': {
    visual: 'A video filmstrip passing through a scanning tunnel where sensitive text regions get highlighted in red and then blurred by protective shields. Matrix-green OCR text overlays. Dark cinematic background.',
    tagline: 'VIDEO SANITIZER'
  },
  'cron-times-stored-as-utc-in-postgresql-0-10-1-2-am-pt-3-am-p': {
    visual: 'A world map with multiple timezone clocks floating above different cities, connected by glowing sync lines to a central database cylinder. Night sky background with constellation-like data connections.',
    tagline: 'TIMEZONE SYNC'
  },
  'defense-in-depth-on-a-vps': {
    visual: 'Concentric rings of security shields protecting a glowing server core, each ring representing a different defense layer with icons for firewall, auth, encryption. Military-grade aesthetic with deep navy and gold.',
    tagline: 'DEFENSE IN DEPTH'
  },
  'orchestrating-autonomous-agents': {
    visual: 'A conductor standing before an orchestra where each musician is a glowing AI agent node, with data streams as sheet music flowing between them. Grand concert hall with dramatic spotlight. Epic, prestigious.',
    tagline: 'AGENT ORCHESTRA'
  },
  'parallel-agents-at-scale': {
    visual: 'Dozens of autonomous drones flying in perfect formation through a digital canyon, each carrying data payloads, with speed trails behind them. Aerial cinematic view. Dark sky with neon trails.',
    tagline: 'SCALE'
  },
  'the-content-sanitizer-that-guards-every-channel': {
    visual: 'A guardian sentinel made of regex patterns and code, standing at a gateway where multiple content channels (blog, video, social icons) pass through for inspection. Shield aesthetic with deep purple and gold.',
    tagline: 'CONTENT GUARDIAN'
  },
  'the-scraper-blitz': {
    visual: 'A swarm of sleek robotic spiders crawling across a massive web of interconnected data nodes, harvesting glowing data orbs. Night operation aesthetic with red laser eyes and chrome bodies on dark background.',
    tagline: 'SCRAPER BLITZ'
  }
};

async function generateImage(concept, filename) {
  const prompt = `Create a photorealistic, ultra-premium hero image for a tech blog. Style: Fortune 500 ad agency, think Accenture or McKinsey visual quality.

Visual concept: ${concept.visual}

Requirements:
- Widescreen 16:9 aspect ratio
- NO text, NO words, NO letters, NO watermarks anywhere in the image
- Photorealistic with cinematic lighting
- Dark, moody background with vibrant accent colors
- Premium, polished, editorial quality
- Could be used as a LinkedIn post or tech conference slide
- High contrast, sharp details`;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });

  return new Promise((resolve, reject) => {
    const url = new URL(ENDPOINT);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.candidates && json.candidates[0] && json.candidates[0].content) {
            const parts = json.candidates[0].content.parts;
            for (const part of parts) {
              if (part.inlineData) {
                const imgBuffer = Buffer.from(part.inlineData.data, 'base64');
                const outPath = path.join(IMAGES_DIR, filename);
                fs.writeFileSync(outPath, imgBuffer);
                console.log(`  ✓ Saved: ${filename} (${(imgBuffer.length / 1024).toFixed(0)}KB)`);
                resolve(outPath);
                return;
              }
            }
          }
          console.error(`  ✗ No image in response for ${filename}:`, JSON.stringify(json).substring(0, 200));
          resolve(null);
        } catch (e) {
          console.error(`  ✗ Parse error for ${filename}:`, e.message);
          resolve(null);
        }
      });
    });

    req.on('error', (e) => {
      console.error(`  ✗ Request error for ${filename}:`, e.message);
      resolve(null);
    });

    req.setTimeout(60000, () => {
      req.destroy();
      console.error(`  ✗ Timeout for ${filename}`);
      resolve(null);
    });

    req.write(body);
    req.end();
  });
}

function updatePostImage(postFile, imageFilename) {
  const fullPath = path.join(POSTS_DIR, postFile);
  let content = fs.readFileSync(fullPath, 'utf-8');
  const imagePath = `/images/heroes/${imageFilename}`;

  // Replace existing image reference or add after first ## heading
  if (content.includes('![')) {
    content = content.replace(/!\[.*?\]\(\/images\/[^)]+\)/, `![hero](${imagePath})`);
  } else {
    // Add image after the opening paragraph (before first ##)
    const firstHeading = content.indexOf('\n## ');
    if (firstHeading > 0) {
      // Find the line before the heading
      const beforeHeading = content.substring(0, firstHeading);
      const afterHeading = content.substring(firstHeading);
      content = beforeHeading + `\n![hero](${imagePath})\n` + afterHeading;
    }
  }

  fs.writeFileSync(fullPath, content);
}

async function main() {
  const posts = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md')).sort();
  console.log(`\n🎨 Generating Fortune 500-grade hero images for ${posts.length} posts\n`);

  let generated = 0;
  let failed = 0;

  for (const postFile of posts) {
    // Extract slug key (remove date prefix and .md)
    const slug = postFile.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
    const concept = POST_CONCEPTS[slug];

    if (!concept) {
      console.log(`⏭  Skipping ${slug} (no concept defined)`);
      continue;
    }

    const imageFilename = `${slug}.png`;
    const existingPath = path.join(IMAGES_DIR, imageFilename);

    // Skip if already generated
    if (fs.existsSync(existingPath) && fs.statSync(existingPath).size > 10000) {
      console.log(`⏭  Already exists: ${imageFilename}`);
      generated++;
      continue;
    }

    console.log(`🖼  Generating: ${concept.tagline} → ${imageFilename}`);
    const result = await generateImage(concept, imageFilename);

    if (result) {
      updatePostImage(postFile, imageFilename);
      generated++;
      console.log(`   Updated post: ${postFile}`);
    } else {
      failed++;
    }

    // Rate limit: wait 3s between requests
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`\n✅ Done: ${generated} generated, ${failed} failed out of ${Object.keys(POST_CONCEPTS).length} posts\n`);
}

main().catch(console.error);
