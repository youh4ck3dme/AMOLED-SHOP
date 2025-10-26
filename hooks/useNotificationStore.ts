import { create } from 'zustand';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationState {
  isVisible: boolean;
  message: string;
  type: NotificationType;
  showNotification: (message: string, type?: NotificationType, duration?: number) => void;
  hideNotification: () => void;
}

// Store timeout ID in a closure to manage it across calls
let notificationTimeoutId: number | undefined;

export const useNotificationStore = create<NotificationState>((set) => ({
  isVisible: false,
  message: '',
  type: 'info',
  showNotification: (message, type = 'success', duration = 3000) => {
    // If a notification is already scheduled to be hidden, clear that timeout
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId);
    }

    // Show the new notification
    set({ message, type, isVisible: true });

    // Set a new timeout to hide the notification
    notificationTimeoutId = window.setTimeout(() => {
      set({ isVisible: false });
      notificationTimeoutId = undefined; // Clear the ID after execution
    }, duration);
  },
  hideNotification: () => {
    // Also clear the timeout if the notification is manually hidden
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId);
      notificationTimeoutId = undefined;
    }
    set({ isVisible: false });
  },
}));
