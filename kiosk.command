#!/bin/bash

echo "Waiting for webpack dev server to become available (http://localhost:8000/)"

until curl --output /dev/null --silent --head --fail http://localhost:8000/; do
  printf '.'
  sleep 1
done

echo
echo "Opening Chrome in Kiosk mode..."

# Starts up the vis using Caffeine, which prevents the system from sleeping
caffeinate -s open -W "/Applications/Google Chrome.app" --args --kiosk http://localhost:8000/
