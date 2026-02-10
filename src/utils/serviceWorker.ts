/**
 * Service Worker Registration Utility
 * Registers the service worker early in the app lifecycle
 */

let registration: ServiceWorkerRegistration | null = null;

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    console.warn("Service workers are not supported in this browser.");
    return null;
  }

  try {
    // Check if service worker is already registered
    const existingRegistrations = await navigator.serviceWorker.getRegistrations();
    if (existingRegistrations.length > 0) {
      registration = existingRegistrations[0];
      console.log("Service worker already registered:", registration.scope);
      return registration;
    }

    // Register new service worker
    registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });

    console.log("Service worker registered successfully:", registration.scope);

    // Wait for the service worker to be ready
    await navigator.serviceWorker.ready;
    console.log("Service worker is ready");

    // Listen for updates
    registration.addEventListener("updatefound", () => {
      const newWorker = registration?.installing;
      if (newWorker) {
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            console.log("New service worker available");
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error("Service worker registration failed:", error);
    return null;
  }
}

export function getServiceWorkerRegistration(): ServiceWorkerRegistration | null {
  return registration;
}

export async function unregisterServiceWorker(): Promise<boolean> {
  if (!registration) {
    return false;
  }

  try {
    const unregistered = await registration.unregister();
    if (unregistered) {
      registration = null;
      console.log("Service worker unregistered");
    }
    return unregistered;
  } catch (error) {
    console.error("Failed to unregister service worker:", error);
    return false;
  }
}
