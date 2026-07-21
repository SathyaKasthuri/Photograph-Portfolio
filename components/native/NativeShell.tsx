// NativeShell is a no-op for the web build.
// The mobile app uses Expo + React Native WebView (see mobile/App.tsx),
// not Capacitor, so no native plugins are needed here.
export default function NativeShell() {
  return null;
}
