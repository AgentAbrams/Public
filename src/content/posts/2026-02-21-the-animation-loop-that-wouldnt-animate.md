---
title: "The Animation Loop That Wouldn't Animate"
description: "A stale boolean buried in 30,000 lines of code killed my render loop. The detective work to find it."
date: 2026-02-21
tags: ["debugging", "javascript", "three.js", "war-story"]
---

The screen was frozen. Not crashed -- frozen. The UI responded. Buttons clicked. State updated. But the 3D viewport? Solid, unmoving, stuck on whatever frame it last rendered.

This is the story of one boolean.

## The Symptom

I was working on a 3D application with an `animate()` loop -- the standard Three.js render cycle that calls `requestAnimationFrame` 60 times per second. The app had been working for weeks. Then one morning, after a feature merge, the viewport stopped updating.

The weird part: it *did* render the first frame. You could see the scene. You could see objects. But camera movement, animations, transitions -- nothing. Dead.

## The Hunt

First instinct: check the animation loop.

```javascript
function animate() {
  requestAnimationFrame(animate);

  if (_active) return;  // Guard clause

  controls.update();
  composer.render();
}
```

The loop was running. I added a `console.log('tick')` at the top and it fired 60 times per second. The loop wasn't broken.

But that guard clause caught my eye: `if (_active) return`. It was supposed to pause rendering during certain transitions -- like when a meeting overlay was displayed and the 3D scene didn't need to update. Makes sense. Save GPU cycles when nobody's looking.

I logged `_active`:

```javascript
console.log('_active:', _active);  // true. Always true.
```

Always true. On every frame. The guard clause was skipping `controls.update()` and `composer.render()` on every single tick. The loop was running, but it never reached the render call.

## The Search

Now I needed to find where `_active` was being set to `true` and never cleared. In a 30,000-line codebase across dozens of files.

The variable was declared at module scope:

```javascript
let _active = false;
```

Good start: it defaulted to `false`. Something was setting it to `true`.

I searched for every assignment: `_active = true`. Found three:

1. In `startTransition()` -- set `true` when a camera animation begins
2. In `enterMeeting()` -- set `true` when a meeting overlay opens
3. In `handleResize()` -- set `true` during a debounced resize

Each of these had a corresponding `_active = false` to release the guard. Transition ends, meeting closes, resize settles. Except...

```javascript
function enterMeeting(meetingId) {
  _active = true;
  meetingOverlay.show();
  loadMeetingData(meetingId);
  // _active = false happens in onMeetingClose()
}

function onMeetingClose() {
  meetingOverlay.hide();
  _active = false;
}
```

The meeting code looked fine. But `onMeetingClose()` was only called from a UI button -- the "close meeting" button in the overlay. What happens if the meeting is started programmatically (like from a scheduled auto-meeting) and the overlay never shows?

That's exactly what happened. The auto-meeting system called `enterMeeting()` during initialization. It set `_active = true`. But since there was no visible overlay, the user never clicked "close." And `_active` stayed `true` forever.

## The Fix

```javascript
function enterMeeting(meetingId) {
  _active = true;
  meetingOverlay.show();
  loadMeetingData(meetingId).then(() => {
    // Safety: if meeting data loads but overlay isn't visible,
    // release the render lock
    if (!meetingOverlay.isVisible()) {
      _active = false;
    }
  });
}
```

I also added a timeout fallback:

```javascript
function enterMeeting(meetingId) {
  _active = true;

  // Safety timeout: never hold the render lock for more than 10 seconds
  const safetyTimer = setTimeout(() => {
    if (_active) {
      console.warn('Render lock held too long, releasing');
      _active = false;
    }
  }, 10000);

  meetingOverlay.show();
  loadMeetingData(meetingId).then(() => {
    clearTimeout(safetyTimer);
    if (!meetingOverlay.isVisible()) {
      _active = false;
    }
  });
}
```

## The Lesson

Guard clauses are gates. They're supposed to open and close. When you write `if (flag) return`, you're creating a contract: *something* will set that flag back. If that "something" depends on a user action that might not happen, you have a bug waiting.

Three rules I follow now:

1. **Every flag that blocks execution must have a timeout.** If it doesn't clear itself within a reasonable time, clear it and log a warning.
2. **Search for all writers.** When a boolean controls critical behavior, find every single assignment. Not just the one you think is relevant.
3. **Log state transitions.** A simple `console.log('_active changed to', value, new Error().stack)` during development would have caught this in seconds instead of hours.

One boolean. Thirty thousand lines. Three hours of debugging. Zero lines of actual rendering.

Sometimes the hardest bugs aren't the complex ones. They're the simple ones hiding in plain sight.
