# Implementation Plan - Native Stability Fixes for Startup Crash

The app continues to crash with the "Lens & Light keeps stopping" error. This plan focuses on stabilizing the Android native entry points and ensuring all required libraries for the Splash Screen and UI theme are correctly bundled and initialized.

## Proposed Changes

### [Component: Build Configuration]

#### [MODIFY] [app/build.gradle](file:///Users/admin/Documents/untitled folder/Photograph-Portfolio/mobile/android/app/build.gradle)
- **Add Splash Screen Library**: Explicitly add `implementation "androidx.core:core-splashscreen:1.0.1"`. This library is required for the `Theme.SplashScreen` parent theme used in your manifest.
- **Robust BuildConfig**: Add a manual `DEBUG` field to `buildConfigField` for release builds, as some React Native components check this flag during initialization.

### [Component: Native Entry Points]

#### [MODIFY] [MainActivity.kt](file:///Users/admin/Documents/untitled folder/Photograph-Portfolio/mobile/android/app/src/main/java/com/lensandlight/portfolio/MainActivity.kt)
- **Fix `onCreate`**: Change `super.onCreate(null)` to `super.onCreate(savedInstanceState)`. Using `null` can sometimes interfere with how the new Android Splash Screen API manages the activity transition.

#### [MODIFY] [MainApplication.kt](file:///Users/admin/Documents/untitled folder/Photograph-Portfolio/mobile/android/app/src/main/java/com/lensandlight/portfolio/MainApplication.kt)
- **Safe Initialization**: Ensure `SoLoader.init` and other initialization steps are performed in the correct order.

## Verification Plan

### Manual Verification
1. **Build Release APK**: Generate a new `app-release.apk`.
2. **Device Testing**: Install and run on the device.
3. **Logcat Diagnostic (Final Resort)**: If the crash persists, I will provide a command to extract the exact stack trace from your device.

## User Review Required

> [!IMPORTANT]
> This iteration modifies the core lifecycle of your Android Activity. These are standard "best practice" fixes for React Native apps that crash on startup, especially after an Android Gradle Plugin upgrade.
