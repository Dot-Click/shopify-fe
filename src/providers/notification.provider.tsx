import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useFetchNotification } from "@/hooks/notifications/usegetnotification";
import { useMarkNotificationAsRead } from "@/hooks/notifications/usemarkread";

interface NotificationBackend {
  id: string;
  storeId: string;
  customerId: string | null;
  customerName: string | null;
  type: string;
  title: string;
  message: string;
  meta: any;
  read: boolean;
  createdAt: string;
  updatedAt: string | null;
}

interface NotificationContextType {
  notifications: NotificationBackend[];
  unreadCount: number;
  markAsSeen: (id: string) => Promise<void>;
  reload: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useFetchNotification();
  const [notifications, setNotifications] = useState<NotificationBackend[]>([]);
  const { mutate } = useMarkNotificationAsRead();

  useEffect(() => {
    if (data) {
      setNotifications(data);
    }
  }, [data]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsSeen = async (id: string) => {
    mutate(id);
  };

  const reload = () => {};

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsSeen, reload }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextType => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return ctx;
};
