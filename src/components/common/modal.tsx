import { AlertTriangle, X } from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { type Customer } from "@/hooks/shopifycustomers/usefetchdashboardcustomer";
import { cn } from "../../lib/utils";
import { Flex } from "../ui/flex";
import { useFetchRefunds } from "@/hooks/shopifycustomers/usefetchrefunds";
import { useState } from "react";

const getRiskColor = (level: number) => {
  if (level > 75) return "bg-red-500";
  if (level > 40) return "bg-orange-500";
  return "bg-green-500";
};

const RiskLevelIndicator = ({ level }: { level: number }) => (
  <div className="flex w-full items-center gap-2">
    <div className="h-2 w-full flex-1 rounded-full bg-slate-200">
      <div
        className={cn("h-full rounded-full", getRiskColor(level))}
        style={{ width: `${level}%` }}
      />
    </div>
    <span className="text-sm font-semibold text-slate-600">{level}%</span>
  </div>
);

const RefundItem = ({ date }: { date: number }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between">
      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
        {formattedDate}
      </span>
      {/* <span className="text-sm text-slate-600">{reason}</span> */}
    </div>
  );
};

type ReportSummaryModalProps = {
  user: Customer;
};

export function ReportSummaryModal({ user }: ReportSummaryModalProps) {
  const [open, setOpen] = useState(false);

  const { data } = useFetchRefunds(user.id, user.storeId, open);

  return (
    <DialogContent
      className="sm:max-w-md bg-white border-2 border-blue-200"
      onOpenAutoFocus={() => setOpen(true)}
      onCloseAutoFocus={() => setOpen(false)}
    >
      <DialogHeader>
        <DialogTitle className="text-web-dark-grey font-bold ">
          eComProtect Report Summary
        </DialogTitle>
        <DialogClose asChild>
          <button className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4 cursor-pointer" />
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>
      </DialogHeader>

      <div className="space-y-6 py-4">
        <section className="space-y-3">
          <h3 className="font-semibold">Refunded Date:</h3>
          {data?.refunds?.map((item) => (
            <RefundItem key={item.refundId} date={item.refundDate} />
          ))}

          {/* <Flex className="gap-x-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
              19 Aug 2024
            </span>
            Item Not Receive
          </Flex>
          <Flex className="gap-x-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
              12 Mar 2025
            </span>
            Refund Abuse
          </Flex>
          <Flex className="gap-x-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
              04 Jun 2025
            </span>
            Refund Denied
          </Flex> */}
        </section>

        <Separator />

        {/* Account Summary Section */}
        <section className="space-y-4">
          <h3 className="font-semibold">Account Summary:</h3>
          <Flex className="justify-between">
            <div className="flex items-center gap-x-3 justify-between">
              <span className="text-sm text-slate-600 ">Shared Across:</span>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800">
                {user.refundsFromStores}
              </span>
            </div>

            <div className="flex items-center gap-x-3 justify-between">
              <span className="text-sm text-slate-600">Total Flags:</span>
              <span className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-800">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                {user.flaggedStoresCount}
              </span>
            </div>
          </Flex>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 w-32">Risk Level:</span>
            <RiskLevelIndicator level={user.riskLevel} />
          </div>
        </section>
      </div>
    </DialogContent>
  );
}
