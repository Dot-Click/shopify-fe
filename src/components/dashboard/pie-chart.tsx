import { Cell, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
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
];

const chartConfig = {
  "refund-abuse": {
    label: "Refund Abuse",
    color: "hsl(210, 89%, 60%)",
  },
  "duplicate-ips": {
    label: "Duplicate IPs",
    color: "hsl(142, 71%, 45%)",
  },
  "address-reuse": {
    label: "Address Reuse",
    color: "hsl(48, 96%, 59%)",
  },
  other: {
    label: "Other",
    color: "hsl(0, 84%, 60%)",
  },
} satisfies ChartConfig;

export function FlaggedReasonsChart() {
  return (
    <Card className="flex flex-col border-0 bg-white">
      <CardHeader className="items-center">
        <CardTitle className="text-lg pb-2">Top Flagged Reasons</CardTitle>
        <CardDescription>
          <img src={underline} alt="underline" />
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-0">
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
              outerRadius={70}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-4 p-6 text-sm">
        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-2">
          {Object.values(chartConfig).map((config) => (
            <div key={config.label} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
