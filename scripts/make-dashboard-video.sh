#!/bin/bash
# Create a narrated walkthrough video of the Vendor Command Center dashboard.
# Uses ffmpeg to combine screenshots with text captions.
# Output: dashboard-walkthrough.mp4

set -e
DIR="/root/Projects/goodquestion-ai/dashboard-captures"
OUT="/root/Projects/goodquestion-ai/dashboard-walkthrough.mp4"
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
DURATION=5

# Caption text for each frame (sanitized - no vendor/wallpaper mentions)
CAPTIONS=(
  "Vendor Command Center - Real-time monitoring of 95 autonomous agents"
  "Live stat cards: catalog products, cost coverage, image counts - all updating in real-time"
  "Vendor table with status badges, product counts, and action buttons"
  "Full drill-down: each vendor shows assets, credentials, and update status"
  "Built with Claude Code in a single session - shipped to production"
)

# Create individual captioned segments
for i in 1 2 3 4 5; do
  IDX=$((i-1))
  IMG="${DIR}/0${i}-*.png"
  IMG_FILE=$(ls $IMG 2>/dev/null | head -1)
  if [ -z "$IMG_FILE" ]; then
    echo "Missing image $i, skipping"
    continue
  fi

  echo "Processing frame $i: ${CAPTIONS[$IDX]}"

  ffmpeg -y -loop 1 -i "$IMG_FILE" -t $DURATION \
    -vf "scale=1920:1080,drawtext=fontfile=$FONT:text='${CAPTIONS[$IDX]}':fontcolor=white:fontsize=32:borderw=3:bordercolor=black:x=(w-text_w)/2:y=h-80" \
    -c:v libx264 -pix_fmt yuv420p -preset fast \
    "${DIR}/segment-${i}.mp4" 2>/dev/null
done

# Concatenate all segments
echo "Concatenating segments..."
CONCAT_FILE="${DIR}/concat.txt"
> "$CONCAT_FILE"
for i in 1 2 3 4 5; do
  echo "file 'segment-${i}.mp4'" >> "$CONCAT_FILE"
done

ffmpeg -y -f concat -safe 0 -i "$CONCAT_FILE" \
  -c:v libx264 -pix_fmt yuv420p -preset medium -crf 23 \
  "$OUT" 2>/dev/null

# Cleanup
rm -f "${DIR}/segment-"*.mp4 "${DIR}/concat.txt"

SIZE=$(du -h "$OUT" | cut -f1)
echo ""
echo "=== Video created ==="
echo "  File: $OUT"
echo "  Size: $SIZE"
echo "  Duration: $((DURATION * 5))s"
