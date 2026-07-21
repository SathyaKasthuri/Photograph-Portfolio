import React, { useRef, useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION — update this to your deployed URL
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = "https://lens-and-light-portfolio.vercel.app";

// Prevent splash screen from hiding automatically.
// Wrapped in try/catch — on some devices this call can throw if the
// splash screen has already been dismissed by the OS.
(async () => {
  try {
    await SplashScreen.preventAutoHideAsync();
  } catch {
    // Safe to ignore — splash will auto-hide if this fails
  }
})();

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Safety timeout: force-hide splash after 10 seconds in case load never fires
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        await SplashScreen.hideAsync();
      } catch {
        // already hidden
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const hideSplash = useCallback(async () => {
    if (!isAppReady) {
      setIsAppReady(true);
      try {
        await SplashScreen.hideAsync();
      } catch {
        // already hidden
      }
    }
  }, [isAppReady]);

  // Hide splash screen once the WebView has loaded
  const onLoadEnd = useCallback(() => {
    hideSplash();
  }, [hideSplash]);

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

  // Show a retry screen if WebView completely fails to load
  if (hasError) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar style="light" backgroundColor="#0a0a0a" />
        <Text style={styles.errorTitle}>Connection Error</Text>
        <Text style={styles.errorMessage}>
          Could not load the app. Please check your internet connection.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setHasError(false);
            setIsAppReady(false);
          }}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        mixedContentMode="compatibility"
        // Loading indicator while page loads
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#c9a96e" />
          </View>
        )}
        // Error handlers — hide splash and show retry screen
        onError={() => {
          hideSplash();
          setHasError(true);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          // Only show error for serious HTTP failures (5xx)
          if (nativeEvent.statusCode >= 500) {
            hideSplash();
            setHasError(true);
          } else {
            hideSplash();
          }
        }}
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
  errorContainer: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  errorTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  errorMessage: {
    color: "#888888",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: "#c9a96e",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
  },
  retryText: {
    color: "#0a0a0a",
    fontSize: 16,
    fontWeight: "700",
  },
});
