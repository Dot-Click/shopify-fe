/* Service worker for Web Push notifications */
self.addEventListener("push", (event) => {
  if (!event.data) return;
  let payload = { title: "eComProtect", body: "", url: "/user/notification" };
  try {
    payload = { ...payload, ...event.data.json() };
  } catch {
    payload.body = event.data.text();
  }
  const options = {
    body: payload.body || payload.message || "New notification",
    icon: "/icons/logo_icon.png",
    badge: "/icons/logo_icon.png",
    data: { url: payload.url || "/user/notification", notificationId: payload.notificationId },
    tag: payload.notificationId || "ecomprotect-notification",
    renotify: true,
  };
  event.waitUntil(
    self.registration.showNotification(payload.title || "eComProtect", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/user/notification";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope) && "focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(self.registration.scope + url.replace(/^\//, ""));
      }
    })
  );
});
