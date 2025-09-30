import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import underline from "/images/underline_2.svg";
import { useRecentActivities } from "@/hooks/activity/usefetchactivity";

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

export function RecentActivitySection() {
  const { data: activities, isLoading, error } = useRecentActivities(10);

  // split or filter as you like:
  const invoiceActivities = activities?.filter((a) =>
    a.for === "customer"
  ) ?? [];
  const retailerActivities = activities?.filter((a) =>
    a.for === "store"
  ) ?? [];

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Recent Customer Activities</CardTitle>
          <img src={underline} />
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {invoiceActivities.map((act) => (
            <ActivityItem
              key={act.id}
              icon={AlertTriangle}
              iconClassName="text-red-500"
            >
              {`${act.action} — ${
                act.meta?.reason ??
                act.meta?.ip ??
                act.customerId ??
                ""
              }`}
            </ActivityItem>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 bg-white">
        <CardHeader className="w-full">
          <CardTitle className="text-lg">Recent Store Activities</CardTitle>
          <img src={underline} />
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {retailerActivities.map((act) => (
            <ActivityItem
              key={act.id}
              icon={CheckCircle2}
              iconClassName="text-green-600"
            >
              {`${act.action} — Store ${act.storeId}`}
            </ActivityItem>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
