const desktopNotification = (title: string, options: NotificationOptions & { url?: string; from?: string } = {}) => {
  if (!("Notification" in window)) {
    console.warn("This browser does not support desktop notifications.");
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showNotification(title, options);
      } else {
        console.warn("Notification permission denied.");
      }
    });
  } else {
    showNotification(title, options);
  }
};

const showNotification = (title: string, options: NotificationOptions & { url?: string; from?: string }) => {
  const { url, from, ...rest } = options;

  const notification = new Notification(title, {
    ...rest,
    body: from ? `From: ${from}\n${options.body}` : options.body,
  });

  if (url) {
    notification.onclick = () => {
      window.open(url, "_blank");
    };
  }
};

export default desktopNotification;
