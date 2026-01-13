# Render Free Tier - Keep Alive Setup

## Problem
Render's free tier spins down after 15 minutes of inactivity, causing slow first loads (30-60 seconds).

## Solution: Multiple Options

### Option 1: UptimeRobot (Recommended - Free & Simple)

1. Go to [UptimeRobot.com](https://uptimerobot.com)
2. Sign up for free account
3. Create a new monitor:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** Bhanuprakash Health Check
   - **URL:** `https://your-app.onrender.com/api/health`
   - **Monitoring Interval:** 5 minutes (free tier limit)
4. Save monitor

✅ **Done!** Your app will stay awake 24/7.

### Option 2: Cron-Job.org (Alternative - Free)

1. Go to [cron-job.org](https://cron-job.org)
2. Sign up for free account
3. Create a new cron job:
   - **Title:** Bhanuprakash Keep Alive
   - **URL:** `https://your-app.onrender.com/api/health`
   - **Schedule:** Every 10 minutes
4. Save and enable

✅ **Done!** Your app will be pinged regularly.

### Option 3: Run Node Script (Self-Hosted)

If you have a server or computer that's always on:

```bash
# Set your app URL
export APP_URL=https://your-app.onrender.com

# Run the keep-alive script
node scripts/keep-alive.js
```

**Or with PM2 for auto-restart:**
```bash
npm install -g pm2
pm2 start scripts/keep-alive.js --name "bhanuprakash-keepalive"
pm2 save
pm2 startup
```

### Option 4: GitHub Actions (Free with GitHub)

Create `.github/workflows/keep-alive.yml`:

```yaml
name: Keep Alive

on:
  schedule:
    # Runs every 10 minutes
    - cron: '*/10 * * * *'
  workflow_dispatch:

jobs:
  keep-alive:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Health Endpoint
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" https://your-app.onrender.com/api/health)
          if [ $response -eq 200 ]; then
            echo "✅ App is healthy (HTTP $response)"
          else
            echo "⚠️ App returned HTTP $response"
          fi
```

### Option 5: Upgrade to Paid Plan ($7/month)

Render's Starter plan removes cold starts entirely:
- No spin down
- Always instant response
- More resources (512MB → 2GB RAM)

## Verification

Check if your keep-alive is working:

1. Visit: `https://your-app.onrender.com/api/health`
2. You should see:
   ```json
   {
     "status": "healthy",
     "timestamp": "...",
     "database": "connected",
     "uptime": 12345.67
   }
   ```

3. Monitor Render dashboard - you should see consistent traffic

## Cost Comparison

| Option | Cost | Reliability | Effort |
|--------|------|-------------|--------|
| UptimeRobot | Free | ⭐⭐⭐⭐⭐ | Low |
| Cron-Job.org | Free | ⭐⭐⭐⭐⭐ | Low |
| GitHub Actions | Free | ⭐⭐⭐⭐ | Medium |
| Self-Hosted Script | Free* | ⭐⭐⭐ | High |
| Render Paid Plan | $7/mo | ⭐⭐⭐⭐⭐ | None |

*Requires always-on server

## Recommendation

For Bhanuprakash, I recommend:

1. **Short-term:** Use UptimeRobot (free, 5 min)
2. **Long-term:** Upgrade to Render Starter plan once you have users

The $7/month paid plan is worth it for:
- No cold starts
- Better user experience
- 4x more memory
- Better for SEO (faster response times)
