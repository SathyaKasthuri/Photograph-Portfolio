#!/bin/bash
# Run after deploying to Vercel. Usage:
#   ./scripts/setup-android.sh https://your-app.vercel.app

set -e

if [ -z "$1" ]; then
  echo "Usage: ./scripts/setup-android.sh https://your-app.vercel.app"
  echo ""
  echo "Example:"
  echo "  ./scripts/setup-android.sh https://lens-and-light.vercel.app"
  exit 1
fi

SITE_URL="$1"
echo "→ Syncing Android app to load: $SITE_URL"

export CAPACITOR_SERVER_URL="$SITE_URL"
npx cap sync android

echo ""
echo "✓ Android project synced!"
echo ""
echo "Next steps:"
echo "  1. npm run cap:open"
echo "  2. In Android Studio, wait for Gradle sync"
echo "  3. Click Run ▶ on emulator or connected phone"
echo ""
echo "To build APK:"
echo "  Build → Build Bundle(s) / APK(s) → Build APK(s)"
echo "  APK: android/app/build/outputs/apk/debug/app-debug.apk"
