import React, { useRef, useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
  Platform,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// Change SITE_URL to your deployed Vercel URL for production, e.g.:
//   const SITE_URL = "https://your-app.vercel.app";
//
// For local development testing (emulator only):
//   const SITE_URL = "http://10.0.2.2:3000";   // Android emulator → localhost
//   const SITE_URL = "http://192.168.x.x:3000"; // Physical phone on same Wi-Fi
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = "http://10.0.2.2:3000";

// Keep the splash screen visible until the page is loaded
SplashScreen.preventAutoHideAsync();

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  // Hide splash screen once the WebView has loaded
  const onLoadEnd = useCallback(async () => {
    if (!isAppReady) {
      setIsAppReady(true);
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  // Track navigation state for back button handling
  const onNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  }, []);

  // Android hardware back button → navigate back in web history
  useEffect(() => {
    if (Platform.OS !== "android") return;

    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true; // prevent default (closing app)
      }
      return false; // let default behaviour close the app
    });

    return () => handler.remove();
  }, [canGoBack]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0a0a0a" translucent={false} />

      <WebView
        ref={webViewRef}
        source={{ uri: SITE_URL }}
        style={styles.webview}
        // Page load callbacks
        onLoadEnd={onLoadEnd}
        onNavigationStateChange={onNavigationStateChange}
        // Features
        allowsBackForwardNavigationGestures={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        // Allow mixed content for local dev (http inside https)
        mixedContentMode="compatibility"
        // Loading indicator while page loads
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#c9a96e" />
          </View>
        )}
        // Error fallback
        onError={() => SplashScreen.hideAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  webview: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
  },
});
