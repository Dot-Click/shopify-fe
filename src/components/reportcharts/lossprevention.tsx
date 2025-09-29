import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useFetchLossPrevention } from "@/hooks/reports/usefetchlossprevention";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// chart config
const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(142, 71%, 45%)",
  },
} as const;

/* ---------------- Parent Container ---------------- */
export function LossPreventionDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div className="space-y-6">
      {/* Date Range Picker (shared for both) */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="border-0 shadow-md">
            {dateRange?.from && dateRange?.to
              ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(
                  dateRange.to,
                  "MMM d, yyyy"
                )}`
              : "Select Date Range"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <LossPreventionKPIs dateRange={dateRange} />
      <LossPreventionChart dateRange={dateRange} />
    </div>
  );
}

/* ---------------- KPI Component ---------------- */
function LossPreventionKPIs({ dateRange }: { dateRange?: DateRange }) {
  const { data, isLoading } = useFetchLossPrevention(
    dateRange?.from && dateRange?.to
      ? {
          startDate: dateRange.from.toISOString(),
          endDate: dateRange.to.toISOString(),
        }
      : undefined
  );

  if (isLoading)
    return <div className="p-6 text-slate-500">Loading KPIs...</div>;

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Orders Prevented/Flagged</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          {data?.numPreventedOrFlagged ?? 0}
        </CardContent>
      </Card>
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Revenue Saved (£)</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          {data?.revenueSaved ?? 0}
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- Chart Component ---------------- */
function LossPreventionChart({ dateRange }: { dateRange?: DateRange }) {
  const { data, isLoading, error } = useFetchLossPrevention(
    dateRange?.from && dateRange?.to
      ? {
          startDate: dateRange.from.toISOString(),
          endDate: dateRange.to.toISOString(),
        }
      : undefined
  );

  if (isLoading)
    return <div className="p-6 text-slate-500">Loading chart...</div>;
  if (error)
    return <div className="p-6 text-red-500">Error loading chart data</div>;

  const chartData =
    data?.chartData?.map((d: any) => ({
      label: d.date, // Use 'date' for the label
      value: d.orders, // Use 'orders' for the value
    })) ?? [];

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg">Flagged Orders by Date</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="value" fill="var(--color-orders)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
