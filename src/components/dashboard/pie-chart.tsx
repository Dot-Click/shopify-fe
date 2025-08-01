import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import underline from "/images/underline.svg";

const chartData = [
  { reason: "Duplicate IPs", count: 45, fill: "var(--color-duplicate-ips)" },
  { reason: "Refund Abuse", count: 35, fill: "var(--color-refund-abuse)" },
  { reason: "Address Reuse", count: 25, fill: "var(--color-address-reuse)" },
  { reason: "Other", count: 13, fill: "var(--color-other)" },
  { reason: "Other", count: 16, fill: "var(--color-other)" },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  "refund-abuse": {
    label: "Refund Abuse",
    color: "hsl(var(--chart-1))", // Blue
  },
  "address-reuse": {
    label: "Address Reuse",
    color: "hsl(var(--chart-2))", // Yellow/Orange
  },
  "duplicate-ips": {
    label: "Duplicate IPs",
    color: "hsl(var(--chart-3))", // Green
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-4))", // Red
  },
} satisfies ChartConfig;

export function FlaggedReasonsChart() {
  return (
    <Card className="flex flex-col border-0 bg-white">
      <CardHeader className="items-center">
        <CardTitle className="text-lg pb-2">Top Flagged Reasons</CardTitle>
        <CardDescription>
          <img src={underline} />
        </CardDescription>
      </CardHeader>

      <CardContent className=" pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[140px] flex items-center justify-center"
        >
          <PieChart width={150} height={150}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="reason"
              innerRadius={38}
              outerRadius={70} // ← Increase this to expand the size of the ring
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-4 p-6 text-sm">
        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-2">
          {Object.entries(chartConfig).map(([key, config]) => {
            if (key === "count") return null;
            const typedConfig = config as { label: string; color: string };
            return (
              <div key={key} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: typedConfig.color }}
                />
                <span className="text-muted-foreground">
                  {typedConfig.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
