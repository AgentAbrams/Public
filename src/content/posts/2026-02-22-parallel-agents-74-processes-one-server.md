---
title: "Parallel Agents: 74 Processes, One Server"
description: "How I run 74 Node.js processes on a single VPS using PM2 -- ecosystem config, monitoring, log rotation, and memory management at scale."
date: 2026-02-22
tags: ["pm2", "node.js", "devops", "tutorial", "infrastructure"]
---

I run 74 Node.js processes on a single VPS. Not as a stress test. Not as a benchmark. In production, every day, serving real traffic. Here's how.

## Why 74 Processes?

I'm building a system where each "agent" is an independent Node.js service with its own Express server, its own port, its own responsibilities. One handles email. One monitors inventory. One tracks prices. One manages schedules. And so on, 74 times over.

Could I combine them into a monolith? Sure. But isolated processes mean isolated failures. If the email agent crashes, the price tracker keeps working. If the price tracker runs out of memory, nothing else is affected. Each process restarts independently.

The tradeoff is resource management. And that's where PM2 earns its keep.

## The Ecosystem Config

PM2's ecosystem file is the control center. Here's a real (sanitized) version of what manages all 74 processes:

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    // === Infrastructure ===
    {
      name: 'master-hub',
      script: './services/master-hub/server.js',
      max_memory_restart: '150M',
      env: { NODE_ENV: 'production', PORT: 9000 },
      error_file: './logs/master-hub-error.log',
      out_file: './logs/master-hub-out.log',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
    },
    {
      name: 'health-monitor',
      script: './services/health-monitor/server.js',
      max_memory_restart: '120M',
      env: { NODE_ENV: 'production', PORT: 9001 },
      error_file: './logs/health-monitor-error.log',
      out_file: './logs/health-monitor-out.log',
      merge_logs: true,
      autorestart: true,
    },
    // === Agents (repeat pattern for each) ===
    {
      name: 'email-agent',
      script: './agents/email/server.js',
      max_memory_restart: '100M',
      env: { NODE_ENV: 'production', PORT: 9010 },
      error_file: './logs/email-agent-error.log',
      out_file: './logs/email-agent-out.log',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
    },
    // ... 71 more entries following the same pattern
  ],
};
```

### Key Configuration Options

**`max_memory_restart`** -- The most important setting. Each process gets a memory ceiling. When it exceeds that, PM2 kills and restarts it. I use 100M for simple agents and 150M for agents with caches or large data sets.

**`max_restarts` + `restart_delay`** -- Prevents restart loops. If an agent crashes 10 times within the delay window, PM2 stops restarting it. Better than an infinite crash-restart cycle eating your CPU.

**`merge_logs`** -- Combines stdout and stderr into single log files per process. With 74 processes, you want as few log files as possible.

**`error_file` / `out_file`** -- Explicit log paths. Without these, PM2 dumps everything into `~/.pm2/logs/` which gets unwieldy fast.

## Memory Math

A bare Express.js server uses about 40-60MB of RAM. With database connections and some business logic, most of my agents sit at 60-80MB. Let's do the math:

```
74 agents x 75MB average = 5,550MB (~5.5GB)
```

My VPS has 16GB RAM. That leaves about 10GB for the OS, PostgreSQL, nginx, and breathing room. Comfortable, but not wasteful.

I monitor this with a simple script:

```javascript
// scripts/monitor-memory.js
const { execFileSync } = require('child_process');

function getMemoryStats() {
  const raw = execFileSync('pm2', ['jlist'], { encoding: 'utf8' });
  const pm2List = JSON.parse(raw);

  const stats = pm2List.map(proc => ({
    name: proc.name,
    memory: Math.round(proc.monit.memory / 1024 / 1024),
    cpu: proc.monit.cpu,
    status: proc.pm2_env.status,
    restarts: proc.pm2_env.restart_time,
    uptime: Math.round(
      (Date.now() - proc.pm2_env.pm_uptime) / 1000 / 60
    ),
  }));

  // Sort by memory usage (highest first)
  stats.sort((a, b) => b.memory - a.memory);

  console.log('\n=== PM2 Memory Report ===\n');
  console.log('Total processes: ' + stats.length);
  console.log('Total memory: ' + stats.reduce((s, p) => s + p.memory, 0) + 'MB');
  console.log('Average: ' + Math.round(
    stats.reduce((s, p) => s + p.memory, 0) / stats.length
  ) + 'MB');
  console.log('\nTop 10 memory consumers:');

  stats.slice(0, 10).forEach(p => {
    console.log(
      '  ' + p.name.padEnd(30) + String(p.memory).padStart(5) + 'MB  ' +
      'CPU: ' + String(p.cpu).padStart(3) + '%  ' +
      'Restarts: ' + p.restarts + '  ' +
      'Up: ' + p.uptime + 'min'
    );
  });

  // Alert on high memory
  const overLimit = stats.filter(p => p.memory > 120);
  if (overLimit.length > 0) {
    console.log('\n*** WARNING: ' + overLimit.length + ' process(es) over 120MB ***');
    overLimit.forEach(p => console.log('  ' + p.name + ': ' + p.memory + 'MB'));
  }

  // Alert on crashed processes
  const crashed = stats.filter(p => p.status !== 'online');
  if (crashed.length > 0) {
    console.log('\n*** ALERT: ' + crashed.length + ' process(es) not online ***');
    crashed.forEach(p => console.log('  ' + p.name + ': ' + p.status));
  }
}

getMemoryStats();
```

Run it with `node scripts/monitor-memory.js` or schedule it via cron.

## Log Rotation

74 processes generating logs will eat your disk alive without rotation. I use `pm2-logrotate`:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:dateFormat YYYY-MM-DD
```

This keeps each log file under 10MB, retains 7 rotated copies, and compresses old logs. Without this, I was burning through 2GB of logs per day.

## Auto-Restart Strategies

Not all crashes are equal. Some agents should restart immediately. Some should wait. Some should stay down until manually reviewed.

```javascript
// Critical infrastructure: restart fast
{
  name: 'master-hub',
  autorestart: true,
  max_restarts: 20,
  restart_delay: 1000,
  exp_backoff_restart_delay: 100, // exponential backoff
}

// Standard agents: restart with delay
{
  name: 'email-agent',
  autorestart: true,
  max_restarts: 10,
  restart_delay: 5000,
}

// Experimental/risky agents: limited restarts
{
  name: 'experimental-agent',
  autorestart: true,
  max_restarts: 3,
  restart_delay: 10000,
}
```

## The Watchdog

I run a dedicated process that monitors all the others. Every 60 seconds, it checks PM2's process list, looks for crashed agents, agents with high restart counts (symptom of a crash loop), and agents consuming excessive memory.

```javascript
// Simplified watchdog pattern
setInterval(async () => {
  const raw = execFileSync('pm2', ['jlist'], { encoding: 'utf8' });
  const processes = JSON.parse(raw);

  for (const proc of processes) {
    // Restart crashed processes
    if (proc.pm2_env.status === 'stopped' || proc.pm2_env.status === 'errored') {
      console.log('Restarting ' + proc.name + ' (status: ' + proc.pm2_env.status + ')');
      execFileSync('pm2', ['restart', proc.name]);
    }

    // Alert on crash loops (more than 5 restarts in last hour)
    if (proc.pm2_env.restart_time > 5) {
      console.warn('Crash loop detected: ' + proc.name +
        ' (' + proc.pm2_env.restart_time + ' restarts)');
    }
  }
}, 60000);
```

## What I've Learned

**Isolation beats efficiency.** Yes, 74 separate Express servers use more memory than a single monolith. But when process #47 leaks memory at 3 AM, PM2 restarts it and the other 73 never notice.

**PM2 is production-grade.** I started with PM2 thinking it was just a "keep Node alive" tool. It's actually a complete process manager with monitoring, clustering, log management, and deployment workflows.

**Name everything.** When you're looking at 74 processes in `pm2 list`, good names are the difference between debugging in 30 seconds and debugging in 30 minutes.

**Log rotation is not optional.** Set it up on day one. Not after your disk fills up at 2 AM.

**Memory limits are your friend.** `max_memory_restart` prevents slow leaks from becoming outages. Every process should have one.

74 processes sounds like a lot. It is. But with the right tooling and discipline, it's surprisingly manageable. PM2 does the heavy lifting. I just make sure the config is right and the watchdog is watching.
