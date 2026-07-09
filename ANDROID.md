# Android App — Lens & Light

Your portfolio runs as a native Android app using [Capacitor](https://capacitorjs.com). The app is a native shell that loads your Next.js website (shop, gallery, payments, blog — all included).

## Prerequisites

1. **Android Studio** — [developer.android.com/studio](https://developer.android.com/studio)
2. **Java JDK 17+** (installed with Android Studio)
3. **Deployed website** OR local dev server running

> The Android app loads your site from a URL. API routes (Razorpay, contact form, blog) run on your Next.js server — deploy to Vercel for production, or use local dev for testing.

---

## Option A — Production (recommended)

### 1. Deploy your website

Push to GitHub and deploy on [Vercel](https://vercel.com). Note your URL, e.g. `https://lens-and-light.vercel.app`.

Add all env vars on Vercel (`RAZORPAY_*`, `RESEND_API_KEY`, etc.).

### 2. Point the Android app to your site

```bash
CAPACITOR_SERVER_URL=https://your-app.vercel.app npm run cap:sync
```

### 3. Open in Android Studio and run

```bash
npm run cap:open
```

In Android Studio: **Run ▶** on an emulator or connected phone.

---

## Option B — Local development (emulator)

### 1. Start the Next.js server

```bash
npm run dev
```

### 2. Sync Android with emulator URL

The emulator uses `10.0.2.2` to reach your computer's `localhost`:

```bash
npm run android:dev
```

This runs `cap sync` with `http://10.0.2.2:3000` and opens Android Studio.

### 3. Run on emulator

Click **Run ▶** in Android Studio.

---

## Option C — Local development (physical phone)

1. Find your computer's local IP: `ipconfig` (Windows) or `ifconfig` (Mac)
2. Start Next.js: `npm run dev -- -H 0.0.0.0`
3. Sync with your IP:

```bash
CAPACITOR_SERVER_URL=http://192.168.1.5:3000 npm run cap:sync
npm run cap:open
```

4. Phone and computer must be on the **same Wi‑Fi**.

---

## Build APK for sharing

In Android Studio:

1. **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

For Play Store release:

1. **Build → Generate Signed Bundle / APK**
2. Create a keystore (first time only)
3. Upload the `.aab` file to [Google Play Console](https://play.google.com/console)

---

## App icon

Replace placeholder icons:

- `public/icons/icon-192.png`
- `public/icons/icon-512.png`

Then regenerate Android launcher icons using [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html) or Android Studio's **Image Asset** tool.

Run `npm run cap:sync` after updating icons.

---

## Useful commands

| Command | Description |
|---------|-------------|
| `npm run cap:sync` | Copy web assets + config to Android project |
| `npm run cap:open` | Open project in Android Studio |
| `npm run android:dev` | Sync for emulator + open Android Studio |
| `npm run icons:generate` | Regenerate placeholder PWA icons |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank white screen | Set `CAPACITOR_SERVER_URL` and run `npm run cap:sync` |
| Can't connect on emulator | Use `http://10.0.2.2:3000`, not `localhost` |
| Can't connect on phone | Use your PC's IP; run dev with `-H 0.0.0.0` |
| Razorpay not opening | Ensure site uses HTTPS in production |
| Java not found | Install Android Studio + JDK 17 |

---

## Project structure

```
android/                  # Native Android project (Capacitor)
capacitor.config.ts       # App ID, name, server URL
public/mobile/index.html  # Fallback splash while loading
components/native/        # Status bar, back button handling
```

App ID: `com.lensandlight.portfolio`  
App name: **Lens & Light**
