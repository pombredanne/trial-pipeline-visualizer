#!/bin/bash

# Starts up the vis using Caffeine, which prevents the system from sleeping
caffeinate -s open "/Applications/Google Chrome.app" --args --kiosk http://localhost:8000/
