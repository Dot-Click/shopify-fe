import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import underline from "/images/underline.svg";

type ActivityItemProps = {
  icon: React.ElementType;
  iconClassName: string;
  children: React.ReactNode;
};

function ActivityItem({
  icon: Icon,
  iconClassName,
  children,
}: ActivityItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4">
      <Icon className={cn("h-5 w-5 flex-shrink-0", iconClassName)} />
      <p className="text-sm text-slate-700">{children}</p>
    </div>
  );
}

const invoiceActivities = [
  { text: "John Doe — IP flagged in 3 stores" },
  { text: "jane@mail.com — Refund flagged 2 times" },
  { text: "192.168.1.21 — Used across 4 shops" },
];

const retailerActivities = [
  { text: "Dior synced 4 flagged users" },
  { text: "Gucci exported report" },
  { text: "Zara updated flagged tag settings" },
];

export function RecentActivitySection() {
  return (
    // Use a grid to create the two-column layout
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* 1. Most Recent Invoice Activities Card */}
      <Card className="border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-lg">
            Most Recent Invoice Activities
          </CardTitle>
          <img src={underline} />
        </CardHeader>
        <CardContent className="space-y-3">
          {invoiceActivities.map((activity) => (
            <ActivityItem
              key={activity.text}
              icon={AlertTriangle}
              iconClassName="text-red-500"
            >
              {activity.text}
            </ActivityItem>
          ))}
        </CardContent>
      </Card>

      {/* 2. Recent Retailer Activity Card */}
      <Card className="border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Recent Retailer Activity</CardTitle>
          <img src={underline} />
        </CardHeader>
        <CardContent className="space-y-3">
          {retailerActivities.map((activity) => (
            <ActivityItem
              key={activity.text}
              icon={CheckCircle2}
              iconClassName="text-green-600"
            >
              {activity.text}
            </ActivityItem>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
