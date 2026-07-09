"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { App as CapApp } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";

export default function NativeShell() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    async function initNative() {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: "#0a0a0a" });
        await SplashScreen.hide();
      } catch {
        // Plugins may be unavailable during web preview
      }
    }

    initNative();

    const backListener = CapApp.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        CapApp.exitApp();
      }
    });

    return () => {
      backListener.then((listener) => listener.remove());
    };
  }, []);

  return null;
}
