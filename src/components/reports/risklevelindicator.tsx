import { cn } from "@/lib/utils";
import { getRiskColor } from "@/utils/risk";

export const RiskLevelIndicator = ({ level }: { level: number }) => (
  <div className="flex items-center gap-2">
    <div className="h-2 w-full max-w-24 rounded-full bg-slate-200">
      <div
        className={cn("h-full rounded-full", getRiskColor(level))}
        style={{ width: `${level}%` }}
      />
    </div>
    <span className="w-10 text-right text-sm text-slate-600">{level}%</span>
  </div>
);
