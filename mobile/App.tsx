import React, { useRef, useCallback, useState, useEffect } from "react";
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

// ─────────────────────────────────────────────────────────────────────────────
// Production URL — your live Vercel deployment
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = "http://192.168.1.8:3000";

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Android back button: navigate WebView history or exit
  useEffect(() => {
    if (Platform.OS !== "android") return;
    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => handler.remove();
  }, [canGoBack]);

  const onNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      setCanGoBack(navState.canGoBack);
    },
    []
  );

  // Retry button reloads the WebView
  const handleRetry = useCallback(() => {
    setHasError(false);
    setLoading(true);
    webViewRef.current?.reload();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#0a0a0a" translucent={false} />

      {/* Loading spinner — shown while WebView loads */}
      {loading && !hasError && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#c9a96e" />
          <Text style={styles.loadingText}>Loading…</Text>
        </View>
      )}

      {/* Error screen */}
      {hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Connection Error</Text>
          <Text style={styles.errorMessage}>
            Could not load the app.{"\n"}Please check your internet connection.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* WebView — always mounted so it starts loading immediately */}
      <WebView
        ref={webViewRef}
        source={{ uri: SITE_URL }}
        style={[styles.webview, hasError && styles.hidden]}
        onNavigationStateChange={onNavigationStateChange}
        onLoadStart={() => {
          setLoading(true);
          setHasError(false);
        }}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setHasError(true);
        }}
        onHttpError={(e) => {
          if (e.nativeEvent.statusCode >= 500) {
            setLoading(false);
            setHasError(true);
          } else {
            setLoading(false);
          }
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
        mixedContentMode="compatibility"
        startInLoadingState={false}
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
  hidden: {
    opacity: 0,
    height: 0,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  loadingText: {
    color: "#c9a96e",
    marginTop: 16,
    fontSize: 14,
    letterSpacing: 1,
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    zIndex: 10,
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
