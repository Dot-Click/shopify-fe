import { X, Circle } from "lucide-react";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

// --- Data Structure for the Modal ---
// This should match the data you'll fetch for a user.
export type ReportData = {
  name: string;
  id: string;
  email: string;
  ipAddress: string;
  location: string;
  detectedOn: string;
  riskLevel: number;
  flaggedBehaviors: string[];
  suggestedActions: string[];
};

// --- Helper Components for Clean Code ---

// For the two-column details layout
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-2">
    <dt className="text-sm font-medium text-slate-500">{label}</dt>
    <dd className="text-sm font-semibold text-slate-800">{value}</dd>
  </div>
);

// For the risk level progress bar
const RiskLevelIndicator = ({ level }: { level: number }) => (
  <div className="flex items-center justify-between py-2">
    <dt className="text-sm font-medium text-slate-500">Risk Level</dt>
    <dd className="flex items-center gap-3">
      <div className="relative w-32 h-2 bg-slate-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="text-sm font-bold text-slate-800">{level}%</span>
    </dd>
  </div>
);

// For the bulleted list items
const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 py-1">
    <Circle className="h-2 w-2 mt-1.5 flex-shrink-0 fill-slate-400 text-slate-400" />
    <span className="text-sm text-slate-600">{text}</span>
  </li>
);

// --- The Main Modal Component ---
interface ReportSummaryModalProps {
  user: ReportData;
}

export function ReportSummaryModal({ user }: ReportSummaryModalProps) {
  return (
    <DialogContent className="sm:max-w-lg bg-white p-0 rounded-2xl shadow-lg border-none">
      <DialogHeader className="p-6 bg-web-grey rounded-2xl">
        <DialogTitle className="text-lg font-bold text-slate-800">
          eComProtect Report Summary
        </DialogTitle>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogHeader>

      <div className="p-6 pt-0">
        {/* Customer Details Section */}
        <dl>
          <DetailRow label="Customer Name:" value={user.name} />
          <DetailRow label="ID:" value={user.id} />
          <DetailRow label="Email:" value={user.email} />
          <DetailRow label="IP Address:" value={user.ipAddress} />
          <DetailRow label="Location:" value={user.location} />
          <DetailRow label="Detected on:" value={user.detectedOn} />
          <RiskLevelIndicator level={user.riskLevel} />
        </dl>

        <Separator className="bg-gray-300  my-2 " />

        {/* Flagged Behavior Section */}
        <div className="mt-3">
          <h3 className="text-base font-bold text-slate-800 mb-2">
            Flaggedulent Behavior
          </h3>
          <ul className="space-y-0.3">
            {user.flaggedBehaviors.map((item, index) => (
              <ListItem key={index} text={item} />
            ))}
          </ul>
        </div>

        {/* Suggested Actions Section */}
        <div className="mt-3">
          <h3 className="text-base font-bold text-slate-800 mb-2">
            Suggested Actions
          </h3>
          <ul className="space-y-0.3    ">
            {user.suggestedActions.map((item, index) => (
              <ListItem key={index} text={item} />
            ))}
          </ul>
        </div>
      </div>

      {/* Footer with Action Buttons */}
      <div className="flex justify-end gap-3 p-4 bg-slate-50  rounded-b-2xl">
        <DialogClose asChild>
          <Button
            variant="ghost"
            className="bg-slate-200 hover:bg-slate-300 text-slate-700"
          >
            Close
          </Button>
        </DialogClose>
        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
          Block User
        </Button>
      </div>
    </DialogContent>
  );
}
