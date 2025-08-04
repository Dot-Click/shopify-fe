import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { cn } from "../lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Box } from "../components/ui/box";
import { Button } from "../components/ui/button";

// --- 1. Data Structure and Mock Data ---

type RiskLevel = "High" | "Medium" | "Low";

export type Notification = {
  id: string;
  userName: string;
  userId: string;
  userAvatar: string;
  description: string;
  detectedAt: string;
  riskLevel: RiskLevel;
};

// Mock data using real images and matching the design
const notifications: Notification[] = [
  {
    id: "notif_01",
    userName: "Emma Johnson",
    userId: "C-1001",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    description: "Attempted refund on 3 Shopify stores within 2 weeks.",
    detectedAt: "July 23, 2025 at 13:42",
    riskLevel: "High",
  },
  {
    id: "notif_02",
    userName: "Liam Taylor",
    userId: "C-1002",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    description: "Attempted refund on 3 Shopify stores within 2 weeks.",
    detectedAt: "July 23, 2025 at 13:42",
    riskLevel: "Medium",
  },
  {
    id: "notif_03",
    userName: "Ava Brown",
    userId: "C-1003",
    userAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    description: "Attempted refund on 3 Shopify stores within 2 weeks.",
    detectedAt: "July 23, 2025 at 13:42",
    riskLevel: "Low",
  },
];

// --- 2. Reusable Sub-Components ---

// A dedicated component for the risk badge for cleaner code
const RiskBadge = ({ riskLevel }: { riskLevel: RiskLevel }) => {
  const baseClass = "px-3 py-1 text-xs font-semibold rounded-md border-none";
  const riskStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-orange-100 text-orange-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <Badge className={cn(baseClass, riskStyles[riskLevel])}>
      {riskLevel} Risk
    </Badge>
  );
};

// The main component for a single notification item
const NotificationItem = ({ notification }: { notification: Notification }) => {
  return (
    <Box className="flex items-center justify-between gap-4 p-4 mb-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={notification.userAvatar}
            alt={notification.userName}
          />
          <AvatarFallback>{notification.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">
            <span className="font-bold text-slate-800">
              {notification.userName}
            </span>
            <span className="font-medium text-blue-600">
              {" "}
              (ID: {notification.userId})
            </span>
          </p>
          <p className="mt-1 text-base font-semibold text-slate-900">
            {notification.description}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Detected on: {notification.detectedAt}
          </p>
        </div>
      </div>
      <RiskBadge riskLevel={notification.riskLevel} />
    </Box>
  );
};

// --- 3. The Main Page Component ---

function NotificationsPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Page Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Notifications</h1>
        <Button
          variant="outline"
          className="text-slate-700 bg-white border-slate-300 hover:bg-slate-100"
        >
          <ArrowUpDown className="mr-2 h-4 w-4" /> Sort by
        </Button>
      </header>

      {/* Notifications List */}
      <main>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </main>
    </div>
  );
}

export default NotificationsPage;
