import { ArrowUpDown } from "lucide-react";
import { cn } from "../lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Box } from "../components/ui/box";
import { Button } from "../components/ui/button";
import { Flex } from "../components/ui/flex";
import {
  ReportSummaryModal,
  type ReportData,
} from "../components/common/reportsummarymodal";
import { Dialog, DialogTrigger } from "../components/ui/dialog";

type RiskLevel = "High" | "Medium" | "Low";

export type Notification = {
  id: string;
  userName: string;
  userId: string;
  userAvatar: string;
  description: string;
  detectedAt: string;
  riskLevel: RiskLevel;
  report: ReportData;
};

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
    report: {
      name: "Emma Johnson",
      id: "C-1001",
      email: "emma.johnson@mail.com",
      ipAddress: "192.168.1.54",
      location: "Birmingham, UK",
      detectedOn: "July 23, 2025 at 13:42",
      riskLevel: 98,
      flaggedBehaviors: [
        "Requested 3 refunds from different stores in 24 hours",
        "Same IP used across 4 different identities",
        "Chargeback incident reported on “GadgetStore UK”",
        "Suspicious delivery address reuse across accounts",
      ],
      suggestedActions: [
        "Verify customer’s identity manually",
        "Enable OTP verification for future orders",
        "Block from initiating refunds",
      ],
    },
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
    report: {
      name: "Liam Taylor",
      id: "C-1002",
      email: "liam.taylor@mail.com",
      ipAddress: "10.0.0.12",
      location: "Manchester, UK",
      detectedOn: "July 22, 2025 at 09:15",
      riskLevel: 65,
      flaggedBehaviors: [
        "Unusual purchase pattern noted.",
        "Used previously flagged payment method.",
      ],
      suggestedActions: [
        "Monitor account for 24 hours",
        "Suggest 2-Factor Authentication.",
      ],
    },
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
    report: {
      name: "Ava Brown",
      id: "C-1003",
      email: "ava.brown@mail.com",
      ipAddress: "172.16.0.40",
      location: "London, UK",
      detectedOn: "July 23, 2025 at 13:42",
      riskLevel: 25,
      flaggedBehaviors: ["First-time refund request from a new account."],
      suggestedActions: [
        "Approve refund if item is returned.",
        "No further action needed at this time.",
      ],
    },
  },
];

const RiskBadge = ({ riskLevel }: { riskLevel: RiskLevel }) => {
  const baseClass =
    "min-w-[120px] px-5 py-3 text-xs font-semibold rounded-md border-none";
  const riskStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-orange-100 text-orange-700",
    Low: "bg-[#3C9E0333] text-[#3C9E03]",
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
    <Dialog>
      <DialogTrigger asChild>
        <Box className="flex items-center justify-between gap-4 p-4 mb-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex-1">
            {" "}
            {/* Use flex-1 to allow this section to grow */}
            <Flex className="items-center mb-2">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage
                  src={notification.userAvatar}
                  alt={notification.userName}
                  className="object-cover"
                />
                <AvatarFallback>
                  {notification.userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="font-bold text-slate-800">
                  {notification.userName}
                </span>
                <span className="font-medium text-blue-600">
                  {" "}
                  (ID: {notification.userId})
                </span>
              </div>
            </Flex>
            <Box>
              <p className="text-base font-semibold text-slate-900">
                {notification.description}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Detected on: {notification.detectedAt}
              </p>
            </Box>
          </div>
          <RiskBadge riskLevel={notification.riskLevel} />
        </Box>
      </DialogTrigger>
      {/* The modal is placed here, ready to be shown, populated with correct data */}
      <ReportSummaryModal user={notification.report} />
    </Dialog>
  );
};

// --- 3. The Main Page Component ---

function NotificationsPage() {
  return (
    <Box className="p-6 bg-white min-h-[90%]">
      {/* Page Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-web-dark-grey">Notifications</h1>
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
    </Box>
  );
}

export default NotificationsPage;
