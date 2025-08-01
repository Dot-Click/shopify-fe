import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import { Box } from "../ui/box";
// import underline from "/images/underline.svg";

const chartData = [
  { month: "Jan", incidents: 88 },
  { month: "Feb", incidents: 61 },
  { month: "Mar", incidents: 19 },
  { month: "Apr", incidents: 82 },
  { month: "May", incidents: 50 },
  { month: "Jun", incidents: 62 },
  { month: "Jul", incidents: 96 },
  { month: "Aug", incidents: 40 },
  { month: "Sep", incidents: 61 },
  { month: "Oct", incidents: 82 },
  { month: "Nov", incidents: 61 },
  { month: "Dec", incidents: 40 },
];

const chartConfig = {
  incidents: {
    label: "Incidents",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function IncidentsBarChart() {
  return (
    <Card className="flex h-full flex-col border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <Box className="flex text-xl pb-2 gap-x-2">
          <CardTitle>Analytic</CardTitle>
          <CardDescription>(Flagged Incidents By Months)</CardDescription>
        </Box>
        <Button variant="outline">2024 Year</Button>
        {/* <img src={underline} /> */}
      </CardHeader>

      <CardContent className="flex-1 h-[200px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickCount={6}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="incidents" fill="var(--color-incidents)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
