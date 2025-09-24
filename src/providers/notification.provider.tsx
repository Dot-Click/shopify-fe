// // contexts/NotificationContext.tsx

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// import { useFetchNotification } from "@/hooks/notifications/usegetnotification";
// import { useMarkNotificationAsRead } from "@/hooks/notifications/usemarkread";

// interface NotificationBackend {
//   id: string;
//   storeId: string;
//   customerId: string | null;
//   customerName: string | null;
//   type: string;
//   title: string;
//   message: string;
//   meta: any;
//   read: boolean;
//   createdAt: string;
//   updatedAt: string | null;
// }

// interface NotificationContextType {
//   notifications: NotificationBackend[];
//   unreadCount: number;
//   markAsSeen: (ids?: string[]) => Promise<void>;
//   reload: () => void;
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(
//   undefined
// );

// export const NotificationProvider = ({ children }: { children: ReactNode }) => {
//   const { data, isLoading, isError } = useFetchNotification();
//   const [notifications, setNotifications] = useState<NotificationBackend[]>([]);

//   // Whenever the fetched data changes, update local state
//   useEffect(() => {
//     if (data) {
//       setNotifications(data);
//     }
//   }, [data]);

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const markAsSeen = async (ids?: string[]) => {
//     // Placeholder function to mark notifications as seen
//     const { mutate } = useMarkNotificationAsRead();

//     mutate(ids);
//   };

//   const reload = () => {};

//   return (
//     <NotificationContext.Provider
//       value={{ notifications, unreadCount, markAsSeen, reload }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotificationContext = (): NotificationContextType => {
//   const ctx = useContext(NotificationContext);
//   if (!ctx) {
//     throw new Error(
//       "useNotificationContext must be used within a NotificationProvider"
//     );
//   }
//   return ctx;
// };
