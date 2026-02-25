/**
 * YouTube Thumbnail Generator for Agent Abrams
 * Generates professional cover images styled like top Claude Code YouTube videos
 * Uses sharp + SVG overlays for programmatic image creation
 *
 * Usage: node generate-thumbnails.cjs [--all | --video <name>]
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUTDIR = path.join(__dirname, '..', 'dashboard-captures');
if (!fs.existsSync(OUTDIR)) fs.mkdirSync(OUTDIR, { recursive: true });

const WIDTH = 1280;
const HEIGHT = 720;

// Video thumbnail configs
const THUMBNAILS = {
  'parallel-agents': {
    title: 'PARALLEL AGENTS',
    subtitle: 'AT SCALE',
    stats: ['94K → 118K Records', '6 Agents • 15 Scrapers', '25% Growth in 4 Hours'],
    accentColor: '#FF6B35',
    gradientStart: '#0a0a1a',
    gradientMid: '#1a0a3a',
    gradientEnd: '#0a1a2a',
    icon: 'terminal',
    badge: 'LIVE DEMO'
  },
  'dashboard-walkthrough': {
    title: 'COMMAND CENTER',
    subtitle: 'DASHBOARD TOUR',
    stats: ['95 Vendors Tracked', '118K+ Products', 'Real-time Monitoring'],
    accentColor: '#00D4AA',
    gradientStart: '#0a0a1a',
    gradientMid: '#0a2a2a',
    gradientEnd: '#0a1a1a',
    icon: 'dashboard',
    badge: 'FULL TOUR'
  },
  'remote-control': {
    title: 'AUTONOMOUS',
    subtitle: 'AGENT CONTROL',
    stats: ['105 PM2 Processes', 'Zero Downtime', 'Self-Healing Agents'],
    accentColor: '#7B68EE',
    gradientStart: '#0a0a1a',
    gradientMid: '#1a0a2a',
    gradientEnd: '#0a0a2a',
    icon: 'remote',
    badge: 'AGENTS'
  },
  'blog-tour': {
    title: 'AI BUILDS',
    subtitle: 'ITS OWN BLOG',
    stats: ['Astro 5 + Node.js', 'Auto-publish Pipeline', 'goodquestion.ai'],
    accentColor: '#FFD700',
    gradientStart: '#0a0a1a',
    gradientMid: '#2a1a0a',
    gradientEnd: '#1a1a0a',
    icon: 'blog',
    badge: 'META'
  },
  'tracking-progress': {
    title: 'DATA PIPELINE',
    subtitle: 'FROM ZERO TO 118K',
    stats: ['100 Vendor Tables', '29 Cron Jobs', 'Fully Automated'],
    accentColor: '#00BFFF',
    gradientStart: '#0a0a1a',
    gradientMid: '#0a1a3a',
    gradientEnd: '#0a0a2a',
    icon: 'chart',
    badge: 'DEEP DIVE'
  }
};

function createTerminalIcon(color) {
  return `
    <g transform="translate(80, 80)">
      <rect x="0" y="0" width="200" height="140" rx="12" fill="#1a1a2e" stroke="${color}" stroke-width="2"/>
      <rect x="0" y="0" width="200" height="28" rx="12" fill="${color}" opacity="0.3"/>
      <circle cx="18" cy="14" r="5" fill="#ff5f57"/>
      <circle cx="36" cy="14" r="5" fill="#ffbd2e"/>
      <circle cx="54" cy="14" r="5" fill="#28ca42"/>
      <text x="20" y="55" font-family="monospace" font-size="14" fill="${color}">$ agent deploy</text>
      <text x="20" y="75" font-family="monospace" font-size="14" fill="#666">Running 6 agents...</text>
      <text x="20" y="95" font-family="monospace" font-size="14" fill="#28ca42">✓ 15 scrapers built</text>
      <text x="20" y="115" font-family="monospace" font-size="14" fill="#28ca42">✓ 118,902 records</text>
      <rect x="20" y="122" width="8" height="14" fill="${color}" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.2s" repeatCount="1"/>
      </rect>
    </g>`;
}

function createDashboardIcon(color) {
  return `
    <g transform="translate(80, 80)">
      <rect x="0" y="0" width="200" height="140" rx="12" fill="#1a1a2e" stroke="${color}" stroke-width="2"/>
      <rect x="10" y="10" width="85" height="55" rx="6" fill="${color}" opacity="0.15" stroke="${color}" stroke-width="1"/>
      <text x="52" y="35" font-family="monospace" font-size="11" fill="${color}" text-anchor="middle">VENDORS</text>
      <text x="52" y="55" font-family="monospace" font-size="20" fill="white" text-anchor="middle" font-weight="bold">95</text>
      <rect x="105" y="10" width="85" height="55" rx="6" fill="${color}" opacity="0.15" stroke="${color}" stroke-width="1"/>
      <text x="147" y="35" font-family="monospace" font-size="11" fill="${color}" text-anchor="middle">PRODUCTS</text>
      <text x="147" y="55" font-family="monospace" font-size="18" fill="white" text-anchor="middle" font-weight="bold">118K</text>
      <rect x="10" y="75" width="180" height="55" rx="6" fill="${color}" opacity="0.1"/>
      <rect x="20" y="85" width="30" height="35" fill="${color}" opacity="0.6"/>
      <rect x="55" y="95" width="30" height="25" fill="${color}" opacity="0.4"/>
      <rect x="90" y="80" width="30" height="40" fill="${color}" opacity="0.8"/>
      <rect x="125" y="90" width="30" height="30" fill="${color}" opacity="0.5"/>
      <rect x="160" y="75" width="20" height="45" fill="${color}" opacity="0.7"/>
    </g>`;
}

function createChartIcon(color) {
  return `
    <g transform="translate(80, 80)">
      <rect x="0" y="0" width="200" height="140" rx="12" fill="#1a1a2e" stroke="${color}" stroke-width="2"/>
      <polyline points="20,120 50,100 80,110 110,70 140,50 170,30" fill="none" stroke="${color}" stroke-width="3"/>
      <circle cx="20" cy="120" r="4" fill="${color}"/>
      <circle cx="50" cy="100" r="4" fill="${color}"/>
      <circle cx="80" cy="110" r="4" fill="${color}"/>
      <circle cx="110" cy="70" r="4" fill="${color}"/>
      <circle cx="140" cy="50" r="4" fill="${color}"/>
      <circle cx="170" cy="30" r="4" fill="${color}"/>
      <text x="100" y="25" font-family="monospace" font-size="12" fill="white" text-anchor="middle">94K → 118K</text>
      <line x1="20" y1="130" x2="180" y2="130" stroke="#333" stroke-width="1"/>
      <line x1="15" y1="20" x2="15" y2="130" stroke="#333" stroke-width="1"/>
    </g>`;
}

function getIcon(type, color) {
  switch (type) {
    case 'terminal': return createTerminalIcon(color);
    case 'dashboard': return createDashboardIcon(color);
    case 'chart': return createChartIcon(color);
    default: return createTerminalIcon(color);
  }
}

function generateSVG(config) {
  const { title, subtitle, stats, accentColor, gradientStart, gradientMid, gradientEnd, icon, badge } = config;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Main gradient -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${gradientStart}"/>
      <stop offset="50%" style="stop-color:${gradientMid}"/>
      <stop offset="100%" style="stop-color:${gradientEnd}"/>
    </linearGradient>

    <!-- Glow effect -->
    <radialGradient id="glow" cx="70%" cy="40%">
      <stop offset="0%" style="stop-color:${accentColor};stop-opacity:0.15"/>
      <stop offset="70%" style="stop-color:${accentColor};stop-opacity:0"/>
    </radialGradient>

    <!-- Grid pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${accentColor}" stroke-width="0.3" opacity="0.15"/>
    </pattern>

    <!-- Scanline effect -->
    <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="2" fill="white" opacity="0.02"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#scanlines)"/>

  <!-- Accent line top -->
  <rect x="0" y="0" width="${WIDTH}" height="4" fill="${accentColor}"/>

  <!-- Icon area (left side) -->
  ${getIcon(icon, accentColor)}

  <!-- Badge -->
  <g transform="translate(90, 240)">
    <rect x="0" y="0" width="${badge.length * 14 + 24}" height="30" rx="4" fill="${accentColor}"/>
    <text x="${(badge.length * 14 + 24) / 2}" y="21" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="white" text-anchor="middle" font-weight="bold" letter-spacing="2">${badge}</text>
  </g>

  <!-- Main title (right side) -->
  <text x="380" y="200" font-family="Arial, Helvetica, sans-serif" font-size="72" fill="white" font-weight="bold" letter-spacing="-1">${title}</text>
  <text x="380" y="270" font-family="Arial, Helvetica, sans-serif" font-size="56" fill="${accentColor}" font-weight="bold" letter-spacing="-1">${subtitle}</text>

  <!-- Divider line -->
  <line x1="380" y1="295" x2="1180" y2="295" stroke="${accentColor}" stroke-width="2" opacity="0.5"/>

  <!-- Stats -->
  ${stats.map((stat, i) => `
  <g transform="translate(395, ${340 + i * 55})">
    <rect x="0" y="0" width="6" height="35" rx="3" fill="${accentColor}" opacity="${1 - i * 0.2}"/>
    <text x="22" y="26" font-family="'Courier New', monospace" font-size="22" fill="#cccccc" letter-spacing="0.5">${stat}</text>
  </g>`).join('')}

  <!-- Agent Abrams branding -->
  <g transform="translate(80, 620)">
    <rect x="0" y="0" width="260" height="40" rx="8" fill="white" opacity="0.08"/>
    <text x="20" y="28" font-family="monospace" font-size="18" fill="white" opacity="0.9" font-weight="bold">AGENT ABRAMS</text>
  </g>

  <!-- goodquestion.ai URL -->
  <text x="1180" y="655" font-family="monospace" font-size="16" fill="${accentColor}" opacity="0.7" text-anchor="end">goodquestion.ai</text>

  <!-- Corner accents -->
  <line x1="${WIDTH - 60}" y1="20" x2="${WIDTH - 20}" y2="20" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
  <line x1="${WIDTH - 20}" y1="20" x2="${WIDTH - 20}" y2="60" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
  <line x1="20" y1="${HEIGHT - 20}" x2="60" y2="${HEIGHT - 20}" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
  <line x1="20" y1="${HEIGHT - 60}" x2="20" y2="${HEIGHT - 20}" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>

  <!-- Decorative dots -->
  ${Array.from({length: 8}, (_, i) =>
    `<circle cx="${1100 + (i % 4) * 20}" cy="${50 + Math.floor(i / 4) * 20}" r="3" fill="${accentColor}" opacity="${0.2 + Math.random() * 0.3}"/>`
  ).join('')}
</svg>`;
}

async function generateThumbnail(name, config) {
  const svg = generateSVG(config);
  const svgBuffer = Buffer.from(svg);

  const outPath = path.join(OUTDIR, `thumbnail-${name}.png`);

  await sharp(svgBuffer)
    .resize(WIDTH, HEIGHT)
    .png({ quality: 95 })
    .toFile(outPath);

  const stats = fs.statSync(outPath);
  console.log(`  Generated: ${outPath} (${(stats.size / 1024).toFixed(0)} KB)`);
  return outPath;
}

async function main() {
  const args = process.argv.slice(2);
  const target = args.includes('--video') ? args[args.indexOf('--video') + 1] : null;
  const all = args.includes('--all') || !target;

  console.log('=== YouTube Thumbnail Generator ===\n');

  const targets = all ? Object.keys(THUMBNAILS) : [target];
  const generated = [];

  for (const name of targets) {
    if (!THUMBNAILS[name]) {
      console.error(`  Unknown video: ${name}`);
      continue;
    }
    const outPath = await generateThumbnail(name, THUMBNAILS[name]);
    generated.push(outPath);
  }

  console.log(`\nGenerated ${generated.length} thumbnails in ${OUTDIR}/`);
  console.log('Files:');
  generated.forEach(p => console.log(`  ${path.basename(p)}`));
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
