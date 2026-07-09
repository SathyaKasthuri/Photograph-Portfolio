# Deploy Lens & Light — Step by Step

Follow these steps in order. Each step builds on the previous one.

---

## Part 1 — Push code to GitHub (5 min)

### 1. Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `lens-and-light-portfolio` (or any name)
3. Keep it **Public** or **Private**
4. Do **NOT** add README, .gitignore, or license (you already have them)
5. Click **Create repository**

### 2. Push your code

Open Terminal in your project folder and run:

```bash
cd "/Users/A50062864/My First APP"

git add .
git commit -m "Add photographer portfolio with shop, Razorpay, and Android app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lens-and-light-portfolio.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Part 2 — Deploy to Vercel (5 min)

### 1. Sign up / log in

Go to [vercel.com/signup](https://vercel.com/signup) and sign in with GitHub.

### 2. Import your project

1. Click **Add New → Project**
2. Select your `lens-and-light-portfolio` repo
3. Vercel auto-detects **Next.js** — leave settings as default
4. Expand **Environment Variables** and add:

| Name | Value |
|------|--------|
| `RAZORPAY_KEY_ID` | Your `rzp_test_...` key |
| `RAZORPAY_KEY_SECRET` | Your Razorpay secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Same as Key ID |
| `CONTACT_EMAIL` | `sathya.kiri@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR-APP.vercel.app` (update after first deploy) |

5. Click **Deploy**
6. Wait 2–3 minutes for the build to finish
7. Copy your live URL, e.g. `https://lens-and-light-portfolio.vercel.app`

### 3. Update SITE_URL (important)

1. Vercel Dashboard → your project → **Settings → Environment Variables**
2. Edit `NEXT_PUBLIC_SITE_URL` to your actual Vercel URL
3. Go to **Deployments** → click **⋯** on latest → **Redeploy**

### 4. Test the live site

Open your Vercel URL in a browser. Check:

- [ ] Home page loads
- [ ] Gallery works
- [ ] Shop / cart works
- [ ] Contact form works

---

## Part 3 — Build Android app (10 min)

### 1. Install Android Studio

Download: [developer.android.com/studio](https://developer.android.com/studio)

Install with default options (includes Android SDK and Java).

### 2. Connect app to your live site

```bash
cd "/Users/A50062864/My First APP"
chmod +x scripts/setup-android.sh
./scripts/setup-android.sh https://YOUR-APP.vercel.app
```

Replace with your actual Vercel URL.

### 3. Open in Android Studio

```bash
npm run cap:open
```

Wait for **Gradle sync** to finish (bottom status bar).

### 4. Run on phone or emulator

**Emulator (no phone needed):**
1. **Tools → Device Manager → Create Device**
2. Pick **Pixel 7** → **Next** → download a system image → **Finish**
3. Click the green **Run ▶** button

**Physical phone:**
1. On phone: **Settings → About → tap Build number 7 times** (enables Developer options)
2. **Settings → Developer options → USB debugging** ON
3. Connect phone via USB
4. Click **Run ▶** in Android Studio

The **Lens & Light** app installs on your device.

---

## Part 4 — Build APK to share (5 min)

In Android Studio:

1. **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. When done, click **locate** in the notification
3. Share `app-debug.apk` — anyone can install it on Android

APK path:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Part 5 — Optional: Resend for emails

Contact form and order emails need Resend:

1. Sign up at [resend.com](https://resend.com)
2. Create API key
3. Add to Vercel env vars: `RESEND_API_KEY=re_...`
4. Redeploy

---

## Quick reference

| Task | Command |
|------|---------|
| Sync Android after URL change | `./scripts/setup-android.sh https://your-url.vercel.app` |
| Open Android Studio | `npm run cap:open` |
| Local test (emulator) | `npm run dev` then `npm run android:dev` |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Vercel build fails | Check build logs; run `npm run build` locally first |
| Android blank screen | Re-run `setup-android.sh` with correct Vercel URL |
| Gradle sync failed | Install JDK 17 in Android Studio → Settings → Build Tools |
| Phone not detected | Enable USB debugging; try another cable |
| Razorpay fails on live site | Add all 3 Razorpay env vars on Vercel and redeploy |

---

You're done when:
- ✅ Site live on Vercel
- ✅ Android app opens your Vercel URL
- ✅ APK built and installable on phone
