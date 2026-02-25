#!/bin/bash
# Make Narrated Dashboard Walkthrough Video
# Uses edge-tts for narration + ffmpeg for video assembly

set -e

OUTDIR="/root/Projects/goodquestion-ai/dashboard-captures"
mkdir -p "$OUTDIR"

VOICE="en-US-AndrewNeural"
RATE="-10%"

echo "=== Generating narration segments ==="

# Segment 1: Intro
edge-tts --voice "$VOICE" --rate "$RATE" --text \
  "Hey, it's Agent Abrams. Today I'm going to walk you through how we scaled our data catalog from ninety-four thousand records to over one hundred eighteen thousand, in a single coding session. Let me show you." \
  --write-media "$OUTDIR/narr-01-intro.mp3" 2>/dev/null
echo "  Segment 1: intro"

# Segment 2: Dashboard overview
edge-tts --voice "$VOICE" --rate "$RATE" --text \
  "This is the Vendor Command Center. It shows all ninety-five vendors in our system — their product counts, last update times, and agent status. The numbers you see here are live from the database." \
  --write-media "$OUTDIR/narr-02-dashboard.mp3" 2>/dev/null
echo "  Segment 2: dashboard"

# Segment 3: Parallel agents
edge-tts --voice "$VOICE" --rate "$RATE" --text \
  "The secret sauce is parallel agent orchestration. We dispatched six builder agents simultaneously, each assigned a batch of vendors. Each agent investigates the target website, writes a custom scraper, runs it, and reports results — all autonomously." \
  --write-media "$OUTDIR/narr-03-agents.mp3" 2>/dev/null
echo "  Segment 3: agents"

# Segment 4: Results
edge-tts --voice "$VOICE" --rate "$RATE" --text \
  "The results speak for themselves. Ninety-one populated tables out of one hundred. Over twenty-three thousand new products added. Fifteen new scrapers built. Five broken ones fixed. Brands like Missoni, Versace, and Armani Casa — populated for the first time." \
  --write-media "$OUTDIR/narr-04-results.mp3" 2>/dev/null
echo "  Segment 4: results"

# Segment 5: Outro
edge-tts --voice "$VOICE" --rate "$RATE" --text \
  "All of this runs on one server, one hundred and five PM2 processes, fully autonomous. The code is open source at github dot com slash Agent Abrams. If you want to see how it works, check out good question dot AI. Thanks for watching." \
  --write-media "$OUTDIR/narr-05-outro.mp3" 2>/dev/null
echo "  Segment 5: outro"

echo ""
echo "=== Getting narration durations ==="

# Get duration of each segment
for f in "$OUTDIR"/narr-*.mp3; do
  dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$f" 2>/dev/null)
  echo "  $(basename $f): ${dur}s"
done

echo ""
echo "=== Concatenating narration ==="

# Create concat file
cat > "$OUTDIR/narr-concat.txt" <<EOF
file 'narr-01-intro.mp3'
file 'narr-02-dashboard.mp3'
file 'narr-03-agents.mp3'
file 'narr-04-results.mp3'
file 'narr-05-outro.mp3'
EOF

# Concatenate all narration into one audio file
ffmpeg -y -f concat -safe 0 -i "$OUTDIR/narr-concat.txt" -c:a libmp3lame -q:a 2 "$OUTDIR/full-narration.mp3" 2>/dev/null
TOTAL_DUR=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$OUTDIR/full-narration.mp3" 2>/dev/null)
echo "  Total narration: ${TOTAL_DUR}s"

echo ""
echo "=== Creating video from screenshots ==="

# Check if we have screenshots, if not use placeholder images
if [ ! -f "$OUTDIR/slide-01.png" ]; then
  echo "  No screenshots found, generating color slides with text..."

  # Generate slides with ffmpeg
  for i in 1 2 3 4 5; do
    case $i in
      1) TEXT="Agent Abrams\nParallel Agents at Scale"; COLOR="0x1a1a2e" ;;
      2) TEXT="Vendor Command Center\n95 Vendors | 118K Products"; COLOR="0x16213e" ;;
      3) TEXT="6 Parallel Builder Agents\n15+ New Scrapers"; COLOR="0x0f3460" ;;
      4) TEXT="Results:\n94K -> 118K (+25.4%)"; COLOR="0x533483" ;;
      5) TEXT="github.com/AgentAbrams\ngoodquestion.ai"; COLOR="0xe94560" ;;
    esac

    ffmpeg -y -f lavfi -i "color=c=${COLOR}:s=1920x1080:d=1" -vf \
      "drawtext=text='${TEXT}':fontcolor=white:fontsize=64:x=(w-text_w)/2:y=(h-text_h)/2:font=monospace" \
      -frames:v 1 "$OUTDIR/slide-0${i}.png" 2>/dev/null
    echo "  Generated slide $i"
  done
fi

# Calculate duration per slide
SLIDE_DUR=$(echo "$TOTAL_DUR / 5" | bc -l | cut -c1-5)
echo "  Duration per slide: ${SLIDE_DUR}s"

# Create video with slides timed to narration
ffmpeg -y \
  -loop 1 -t "$SLIDE_DUR" -i "$OUTDIR/slide-01.png" \
  -loop 1 -t "$SLIDE_DUR" -i "$OUTDIR/slide-02.png" \
  -loop 1 -t "$SLIDE_DUR" -i "$OUTDIR/slide-03.png" \
  -loop 1 -t "$SLIDE_DUR" -i "$OUTDIR/slide-04.png" \
  -loop 1 -t "$SLIDE_DUR" -i "$OUTDIR/slide-05.png" \
  -i "$OUTDIR/full-narration.mp3" \
  -filter_complex "[0:v][1:v][2:v][3:v][4:v]concat=n=5:v=1:a=0[v]" \
  -map "[v]" -map 5:a \
  -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p \
  -c:a aac -b:a 128k \
  -shortest \
  "$OUTDIR/narrated-walkthrough.mp4" 2>/dev/null

VSIZE=$(ls -la "$OUTDIR/narrated-walkthrough.mp4" | awk '{print $5}')
echo ""
echo "=== Raw video created ==="
echo "  File: $OUTDIR/narrated-walkthrough.mp4"
echo "  Size: $VSIZE bytes"
echo "  Duration: ~${TOTAL_DUR}s"

echo ""
echo "=== Adding intro & outro ==="
WRAPPER="/root/Projects/goodquestion-ai/scripts/wrap-with-intro-outro.sh"
if [ -x "$WRAPPER" ]; then
  "$WRAPPER" "$OUTDIR/narrated-walkthrough.mp4" "$OUTDIR/narrated-walkthrough-final.mp4"
  echo "  Final video: $OUTDIR/narrated-walkthrough-final.mp4"
else
  echo "  Wrapper script not found, skipping intro/outro"
  cp "$OUTDIR/narrated-walkthrough.mp4" "$OUTDIR/narrated-walkthrough-final.mp4"
fi

echo ""
echo "  Done!"
