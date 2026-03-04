#!/bin/bash
# =============================================================================
# Make Avatar + Graphics Video — Julian Goldie Style
# Generates narration → graphic slides → composites with avatar PIP
# =============================================================================
set -e

BASEDIR="/root/Projects/goodquestion-ai/dashboard-captures/video-01"
AVATARDIR="/root/Projects/goodquestion-ai/dashboard-captures/avatar"
VOICE="en-US-AndrewNeural"
RATE="-10%"
FPS=30
WIDTH=1920
HEIGHT=1080
AVATAR_SIZE=220
AVATAR_MARGIN=40

mkdir -p "$BASEDIR/narration" "$BASEDIR/slides" "$BASEDIR/segments"

echo "═══════════════════════════════════════════════"
echo "  STEP 1: Generate Narration (edge-tts)"
echo "═══════════════════════════════════════════════"

# Segment 1: Hook
edge-tts --voice "$VOICE" --rate="$RATE" --text \
  "I replaced an entire dev team with AI. No employees. No contractors. Just me and Claude Code. Here's what I built in one weekend." \
  --write-media "$BASEDIR/narration/01-hook.mp3" 2>/dev/null
echo "  01-hook.mp3"

# Segment 2: Trading
edge-tts --voice "$VOICE" --rate="$RATE" --text \
  "First up — a real-time trading analytics dashboard. Live charts. Portfolio performance graphs. Win rate radials. Strategy breakdowns. All from actual market data. Built in six hours." \
  --write-media "$BASEDIR/narration/02-trading.mp3" 2>/dev/null
echo "  02-trading.mp3"

# Segment 3: Civic
edge-tts --voice "$VOICE" --rate="$RATE" --text \
  "Then — a civic engagement platform. AI-powered content generation, network analysis with force-directed graphs, Three.js visualizations, and a full API layer. Twelve tabs. Hundreds of components." \
  --write-media "$BASEDIR/narration/03-civic.mp3" 2>/dev/null
echo "  03-civic.mp3"

# Segment 4: Scale
edge-tts --voice "$VOICE" --rate="$RATE" --text \
  "The secret? Parallel AI agents. I dispatch six at once, each building a different feature. They read the codebase, understand the patterns, and ship working code. Autonomously." \
  --write-media "$BASEDIR/narration/04-scale.mp3" 2>/dev/null
echo "  04-scale.mp3"

# Segment 5: Results
edge-tts --voice "$VOICE" --rate="$RATE" --text \
  "The numbers don't lie. One hundred and five production processes running on one server. Ninety-five vendor integrations. Over a hundred thousand data records. All managed by one person." \
  --write-media "$BASEDIR/narration/05-results.mp3" 2>/dev/null
echo "  05-results.mp3"

# Segment 6: CTA
edge-tts --voice "$VOICE" --rate="$RATE" --text \
  "This isn't science fiction. This is Tuesday. Follow Agent Abrams for more. Link in bio." \
  --write-media "$BASEDIR/narration/06-cta.mp3" 2>/dev/null
echo "  06-cta.mp3"

echo ""
echo "═══════════════════════════════════════════════"
echo "  STEP 2: Create Graphic Slides (ffmpeg)"
echo "═══════════════════════════════════════════════"

# Color scheme matching CrypTrade neon theme
BG="#0E0E10"
CYAN="#00F0FF"
ORANGE="#F7931A"
GREEN="#00C389"
WHITE="#E0E0E0"
DIM="#6B7280"

# Slide 1: Hook — Dark with just "AGENT ABRAMS" glowing
ffmpeg -y -f lavfi -i "color=c=${BG}:s=${WIDTH}x${HEIGHT}:d=1" \
  -vf "drawtext=text='AGENT ABRAMS':fontsize=80:fontcolor=${CYAN}:x=(w-text_w)/2:y=(h-text_h)/2-60:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf,\
drawtext=text='vs. An Entire Dev Team':fontsize=36:fontcolor=${DIM}:x=(w-text_w)/2:y=(h-text_h)/2+40:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf" \
  -frames:v 1 "$BASEDIR/slides/01-hook.png" 2>/dev/null
echo "  01-hook.png"

# Slide 2: Trading Analytics
ffmpeg -y -f lavfi -i "color=c=${BG}:s=${WIDTH}x${HEIGHT}:d=1" \
  -vf "drawtext=text='TRADING ANALYTICS':fontsize=64:fontcolor=${CYAN}:x=(w-text_w)/2:y=120:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf,\
drawtext=text='━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━':fontsize=20:fontcolor=${CYAN}@0.3:x=(w-text_w)/2:y=210:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='▸ 6 Interactive Charts':fontsize=40:fontcolor=${WHITE}:x=300:y=300:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='▸ Live Portfolio Tracking':fontsize=40:fontcolor=${WHITE}:x=300:y=380:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='▸ Strategy Breakdown':fontsize=40:fontcolor=${WHITE}:x=300:y=460:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='⏱ Built in 6 Hours':fontsize=48:fontcolor=${GREEN}:x=(w-text_w)/2:y=600:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" \
  -frames:v 1 "$BASEDIR/slides/02-trading.png" 2>/dev/null
echo "  02-trading.png"

# Slide 3: Civic Platform
ffmpeg -y -f lavfi -i "color=c=${BG}:s=${WIDTH}x${HEIGHT}:d=1" \
  -vf "drawtext=text='CIVIC ENGAGEMENT':fontsize=64:fontcolor=${CYAN}:x=(w-text_w)/2:y=120:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf,\
drawtext=text='━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━':fontsize=20:fontcolor=${CYAN}@0.3:x=(w-text_w)/2:y=210:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='▸ 12 Feature Tabs':fontsize=40:fontcolor=${WHITE}:x=300:y=300:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='▸ AI Content Engine':fontsize=40:fontcolor=${WHITE}:x=300:y=380:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='▸ 3D Network Graphs':fontsize=40:fontcolor=${WHITE}:x=300:y=460:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='▸ Force-Directed Viz':fontsize=40:fontcolor=${WHITE}:x=300:y=540:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf" \
  -frames:v 1 "$BASEDIR/slides/03-civic.png" 2>/dev/null
echo "  03-civic.png"

# Slide 4: Parallel Agents
ffmpeg -y -f lavfi -i "color=c=${BG}:s=${WIDTH}x${HEIGHT}:d=1" \
  -vf "drawtext=text='PARALLEL AGENTS':fontsize=64:fontcolor=${ORANGE}:x=(w-text_w)/2:y=120:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf,\
drawtext=text='━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━':fontsize=20:fontcolor=${ORANGE}@0.3:x=(w-text_w)/2:y=210:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='▸ 6 Agents at Once':fontsize=40:fontcolor=${WHITE}:x=300:y=300:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='▸ Autonomous Coding':fontsize=40:fontcolor=${WHITE}:x=300:y=380:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='▸ Pattern Recognition':fontsize=40:fontcolor=${WHITE}:x=300:y=460:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='▸ Zero Hand-Holding':fontsize=40:fontcolor=${WHITE}:x=300:y=540:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf" \
  -frames:v 1 "$BASEDIR/slides/04-scale.png" 2>/dev/null
echo "  04-scale.png"

# Slide 5: Results
ffmpeg -y -f lavfi -i "color=c=${BG}:s=${WIDTH}x${HEIGHT}:d=1" \
  -vf "drawtext=text='THE RESULTS':fontsize=64:fontcolor=${GREEN}:x=(w-text_w)/2:y=120:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf,\
drawtext=text='━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━':fontsize=20:fontcolor=${GREEN}@0.3:x=(w-text_w)/2:y=210:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='105':fontsize=120:fontcolor=${CYAN}:x=200:y=320:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf,\
drawtext=text='PM2 Processes':fontsize=28:fontcolor=${DIM}:x=200:y=460:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='95':fontsize=120:fontcolor=${ORANGE}:x=650:y=320:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf,\
drawtext=text='Integrations':fontsize=28:fontcolor=${DIM}:x=650:y=460:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='100K+':fontsize=100:fontcolor=${GREEN}:x=1050:y=330:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf,\
drawtext=text='Records':fontsize=28:fontcolor=${DIM}:x=1100:y=460:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='1 PERSON':fontsize=60:fontcolor=${WHITE}:x=(w-text_w)/2:y=580:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" \
  -frames:v 1 "$BASEDIR/slides/05-results.png" 2>/dev/null
echo "  05-results.png"

# Slide 6: CTA
ffmpeg -y -f lavfi -i "color=c=${BG}:s=${WIDTH}x${HEIGHT}:d=1" \
  -vf "drawtext=text='goodquestion.ai':fontsize=72:fontcolor=${CYAN}:x=(w-text_w)/2:y=(h-text_h)/2-80:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf,\
drawtext=text='@AgentAbrams':fontsize=48:fontcolor=${ORANGE}:x=(w-text_w)/2:y=(h-text_h)/2+20:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf,\
drawtext=text='This is Tuesday.':fontsize=32:fontcolor=${DIM}:x=(w-text_w)/2:y=(h-text_h)/2+120:fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf" \
  -frames:v 1 "$BASEDIR/slides/06-cta.png" 2>/dev/null
echo "  06-cta.png"

echo ""
echo "═══════════════════════════════════════════════"
echo "  STEP 3: Prepare circular avatar"
echo "═══════════════════════════════════════════════"

# Create circular mask for avatar (used for PIP overlay)
# Crop avatar to circle with cyan glow border
for pose in front talking-1 talking-2; do
  ffmpeg -y -i "$AVATARDIR/avatar-${pose}.png" \
    -vf "scale=${AVATAR_SIZE}:${AVATAR_SIZE}:force_original_aspect_ratio=increase,crop=${AVATAR_SIZE}:${AVATAR_SIZE},format=rgba,geq=\
'r=r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='if(lte(pow(X-${AVATAR_SIZE}/2\,2)+pow(Y-${AVATAR_SIZE}/2\,2)\,pow(${AVATAR_SIZE}/2-4\,2))\,255\,0)'" \
    "$BASEDIR/avatar-circle-${pose}.png" 2>/dev/null
  echo "  avatar-circle-${pose}.png"
done

echo ""
echo "═══════════════════════════════════════════════"
echo "  STEP 4: Build per-segment videos"
echo "═══════════════════════════════════════════════"

SEGMENTS=("01-hook" "02-trading" "03-civic" "04-scale" "05-results" "06-cta")
AVATARS=("talking-1" "talking-1" "talking-1" "talking-2" "talking-1" "front")

for i in "${!SEGMENTS[@]}"; do
  seg="${SEGMENTS[$i]}"
  avatar="${AVATARS[$i]}"
  narr="$BASEDIR/narration/${seg}.mp3"
  slide="$BASEDIR/slides/${seg}.png"
  out="$BASEDIR/segments/${seg}.mp4"

  # Get narration duration
  dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$narr" 2>/dev/null)
  dur_ceil=$(python3 -c "import math; print(math.ceil(float('${dur}')))")

  # Alternate between talking and front avatar every 0.4s to simulate mouth movement
  # Use overlay to place circular avatar in bottom-right
  AVATAR_X=$((WIDTH - AVATAR_SIZE - AVATAR_MARGIN))
  AVATAR_Y=$((HEIGHT - AVATAR_SIZE - AVATAR_MARGIN))

  ffmpeg -y \
    -loop 1 -i "$slide" \
    -loop 1 -i "$BASEDIR/avatar-circle-${avatar}.png" \
    -i "$narr" \
    -filter_complex "\
      [0:v]scale=${WIDTH}:${HEIGHT},format=yuv420p[bg];\
      [1:v]format=rgba[av];\
      [bg][av]overlay=${AVATAR_X}:${AVATAR_Y}:format=auto[out]" \
    -map "[out]" -map 2:a \
    -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p \
    -c:a aac -b:a 128k \
    -t "$dur" \
    -r $FPS \
    "$out" 2>/dev/null

  echo "  ${seg}.mp4 (${dur}s)"
done

echo ""
echo "═══════════════════════════════════════════════"
echo "  STEP 5: Concatenate all segments"
echo "═══════════════════════════════════════════════"

# Create concat list
rm -f "$BASEDIR/concat.txt"
for seg in "${SEGMENTS[@]}"; do
  echo "file 'segments/${seg}.mp4'" >> "$BASEDIR/concat.txt"
done

FINAL="$BASEDIR/agent-abrams-v1.mp4"
ffmpeg -y -f concat -safe 0 -i "$BASEDIR/concat.txt" \
  -c:v libx264 -preset medium -crf 22 -pix_fmt yuv420p \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  "$FINAL" 2>/dev/null

FILESIZE=$(du -h "$FINAL" | cut -f1)
DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$FINAL" 2>/dev/null)

echo ""
echo "═══════════════════════════════════════════════"
echo "  DONE!"
echo "═══════════════════════════════════════════════"
echo "  Output: $FINAL"
echo "  Size:   $FILESIZE"
echo "  Duration: ${DURATION}s"
echo ""
