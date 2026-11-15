// src/utils/notifications.js
const EVENT = "dreamtrack:notification";

export const showNotification = ({ message, link, label }) => {
  window.dispatchEvent(
    new CustomEvent(EVENT, {
      detail: { message, link, label, id: Date.now() },
    }),
  );
};

export const NOTIFICATION_EVENT = EVENT;
