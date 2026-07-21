# Mobile App — Lens & Light (Expo)

Your portfolio runs as a native Android app powered by **Expo** and **React Native WebView**.
The Expo app (`mobile/`) loads your Next.js website in a full-screen WebView — all features (shop, gallery, payments, blog) are included automatically.

## Project Structure

```
mobile/              ← Expo app (self-contained)
  App.tsx            ← WebView loading your Next.js site
  app.json           ← Expo config (name, package, icon, splash)
  eas.json           ← EAS Build profiles
  package.json       ← Expo dependencies
  assets/            ← App icon and splash screen
```

---

## Prerequisites

1. **Node.js 18+**
2. **Expo CLI**: `npm install -g expo-cli` *(optional — can use npx)*
3. **EAS CLI**: `npm install -g eas-cli`
4. **Expo Account** (free): [expo.dev](https://expo.dev) — required for EAS builds
5. **Expo Go app** on your phone: [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779)

---

## Option A — Test instantly with Expo Go (Recommended for dev)

### 1. Start your Next.js server

```bash
# In the project root:
npm run dev -- -H 0.0.0.0
```

### 2. Set your local IP in App.tsx

Edit `mobile/App.tsx` line 20:

```ts
// Physical phone — use your Mac's local IP address
const SITE_URL = "http://192.168.x.x:3000";
```

> Find your IP: run `ipconfig getifaddr en0` in Terminal.

### 3. Start Expo

```bash
cd mobile
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone. ✅

---

## Option B — Cloud APK build with EAS (No Android Studio needed)

### 1. Login to your Expo account

```bash
cd mobile
npx eas-cli login
```

### 2. Link your EAS project (one-time setup)

```bash
npx eas-cli init
```

### 3. Set your production URL in App.tsx

Edit `mobile/App.tsx` line 20:

```ts
const SITE_URL = "https://your-app.vercel.app";
```

### 4. Build the APK

```bash
npx eas-cli build --profile preview --platform android
```

EAS builds in the cloud — no Android Studio required. Download the `.apk` from the link it provides and install directly on your phone.

---

## Option C — Local development on Android emulator

### 1. Start Next.js

```bash
npm run dev
```

### 2. Set emulator URL in App.tsx

Edit `mobile/App.tsx` line 20:

```ts
// Android emulator uses 10.0.2.2 to reach your computer's localhost
const SITE_URL = "http://10.0.2.2:3000";
```

### 3. Start Expo with Android

```bash
cd mobile
npx expo start --android
```

---

## Changing the URL (Development ↔ Production)

Edit `mobile/App.tsx` — look for the `SITE_URL` constant near the top:

```ts
// Development (emulator)
const SITE_URL = "http://10.0.2.2:3000";

// Development (physical phone on Wi-Fi)
const SITE_URL = "http://192.168.1.5:3000";

// Production (Vercel deployment)
const SITE_URL = "https://your-app.vercel.app";
```

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run mobile` | Start Expo dev server |
| `npm run mobile:android` | Start Expo + open Android |
| `npm run mobile:build` | EAS cloud APK build |
| `cd mobile && npx expo start` | Start from mobile folder |
| `cd mobile && npx eas-cli build --profile preview --platform android` | Cloud APK |
| `cd mobile && npx eas-cli build --profile production --platform android` | Play Store AAB |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank white screen | Check `SITE_URL` in `App.tsx`; ensure Next.js is running |
| Can't connect on emulator | Use `http://10.0.2.2:3000`, not `localhost` |
| Can't connect on phone | Use your Mac's local IP; run dev with `-H 0.0.0.0` |
| Razorpay not working | Set `SITE_URL` to your HTTPS Vercel URL |
| EAS build fails | Run `npx eas-cli init` inside `mobile/` first |
| Expo Go shows error | Ensure your Next.js server is running and reachable |

---

## App Details

- **App ID**: `com.lensandlight.portfolio`
- **App name**: **Lens & Light**
- **Build system**: Expo + EAS Build
- **Test tool**: Expo Go (no install required)
