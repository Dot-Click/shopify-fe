import { useState, useCallback } from "react";
import { axios, url as apiBase } from "@/configs/axios.config";

export type PushPermissionState = "default" | "granted" | "denied" | "unsupported";

function getInitialPermission(): PushPermissionState {
  if (typeof window === "undefined" || !("Notification" in window))
    return "unsupported";
  return Notification.permission as PushPermissionState;
}

export function usePushNotification() {
  const [permission, setPermission] = useState<PushPermissionState>(getInitialPermission);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkPermission = useCallback(() => {
    const p = getInitialPermission();
    setPermission(p);
    return p;
  }, []);

  const subscribe = useCallback(async (): Promise<boolean> => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      setPermission("unsupported");
      setError("Push notifications are not supported in this browser.");
      return false;
    }

    setIsSubscribing(true);
    setError(null);

    try {
      const reg = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      await reg.update();
      await navigator.serviceWorker.ready;

      let perm = Notification.permission;
      if (perm === "default") {
        perm = await Notification.requestPermission();
      }
      setPermission(perm as PushPermissionState);

      if (perm !== "granted") {
        setError(perm === "denied" ? "Permission denied." : "Permission dismissed.");
        return false;
      }

      const keyRes = await fetch(`${apiBase}/notifications/vapid-public-key`, {
        credentials: "include",
      });
      if (!keyRes.ok) {
        const data = await keyRes.json().catch(() => ({}));
        throw new Error(data.message || "Could not get push key");
      }
      const { vapidPublicKey } = await keyRes.json();
      if (!vapidPublicKey) throw new Error("Missing VAPID public key");

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      const subJson = subscription.toJSON();
      await axios.post("/notifications/push-subscription", {
        endpoint: subJson.endpoint,
        keys: {
          p256dh: subJson.keys?.p256dh,
          auth: subJson.keys?.auth,
        },
      });

      setPermission("granted");
      return true;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to enable push notifications.";
      setError(message);
      return false;
    } finally {
      setIsSubscribing(false);
    }
  }, []);

  return {
    permission,
    checkPermission,
    subscribe,
    isSubscribing,
    error,
    isSupported:
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator,
  };
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    output[i] = rawData.charCodeAt(i);
  }
  return output;
}
