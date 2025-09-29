#!/bin/bash
# Script to trigger tweet synchronization via API route

cd /root/WebsitesMisc/goodquestionai

# Call the API endpoint to cache tweets
curl -s http://localhost:9091/api/tweets > /dev/null 2>&1

echo "$(date): Tweets synced successfully" >> /var/log/goodquestion-tweets.log