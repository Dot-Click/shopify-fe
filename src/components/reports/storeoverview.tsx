import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Box } from "@/components/ui/box";
import underline from "/images/underline_2.svg";
import { StoreReportChart } from "@/components/reports/storereportchart";
import { useFetchReportIncidents } from "@/hooks/shopifycustomers/usefetchreportincidents";
import { eachMonthOfInterval, format } from "date-fns";

export function ReportOverviewChart() {
  const { data, isLoading, error } = useFetchReportIncidents();

  const months = eachMonthOfInterval({
    start: new Date(new Date().getFullYear(), 0),
    end: new Date(new Date().getFullYear(), 11),
  }).map((date) => ({
    month: format(date, "LLL yyyy"),
    riskIncidents: 0,
    affectedStores: 0,
  }));

  const chartData = months.map((m) => {
    const found = data?.find((d) => d.month === m.month);
    return {
      ...m,
      riskIncidents: Number(found?.riskIncidents ?? 0),
      affectedStores: Number(found?.affectedStores ?? 0),
    };
  });

  if (isLoading) return <div className="p-6">Loading chart...</div>;
  if (error) return <div className="p-6 text-red-500">Chart error</div>;

  return (
    <Card className="border-0 shadow-none w-full">
      <CardHeader>
        <Box className="flex justify-between">
          <CardTitle>Overview</CardTitle>
        </Box>
        <img src={underline} className="w-full" />
      </CardHeader>

      <CardContent className="w-full">
        <ChartContainer config={StoreReportChart} className="h-64 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="riskIncidents" fill="var(--color-riskIncidents)" />
            <Bar dataKey="affectedStores" fill="var(--color-affectedStores)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
