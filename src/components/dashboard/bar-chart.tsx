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
  // type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import { Box } from "../ui/box";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { eachMonthOfInterval, format } from "date-fns";
import underline from "/images/underline_2.svg";
import { useFetchMonthlyIncidents } from "@/hooks/shopifycustomers/usefetchincidents";

const incidentsConfig = {
  incidents: {
    label: "Incidents",
    color: "hsl(210, 89%, 60%)",
  },
};

export function IncidentsBarChart() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data, isLoading, isError } = useFetchMonthlyIncidents();

  const allMonths = eachMonthOfInterval({
    start: new Date(new Date().getFullYear(), 0),
    end: new Date(new Date().getFullYear(), 11),
  }).map((date) => ({
    month: format(date, "LLL"),
    incidents: 0,
  }));

  // merge API data into base
  const chartData = allMonths.map((m) => {
    const apiMonth = data?.find(
      (item: { month: string; count: number }) =>
        format(new Date(item.month + "-01"), "LLL") === m.month
    );
    return {
      ...m,
      incidents: apiMonth ? apiMonth.count : 0,
    };
  });

  return (
    <Card className="flex h-full flex-col border-0">
      <CardHeader className="w-full">
        <Box className="flex flex-row items-center justify-between">
          <Box className="flex text-xl pb-2 gap-x-2">
            <CardTitle>Analytic</CardTitle>
            <CardDescription>(Flagged Incidents By Months)</CardDescription>
          </Box>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[150px] justify-start text-left font-normal",
                  !date && "text-muted-foreground border-0"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 " />
                {date ? format(date, "LLL dd") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className={"bg-white border-web-grey"}
              />
            </PopoverContent>
          </Popover>
        </Box>
        <img src={underline} />
      </CardHeader>

      <CardContent className="flex-1 h-[200px] w-full">
        {isLoading ? (
          <p className="text-center text-sm text-gray-500">Loading...</p>
        ) : isError ? (
          <p className="text-center text-sm text-red-500">
            Failed to load data
          </p>
        ) : (
          <ChartContainer config={incidentsConfig} className="h-full w-full">
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
                content={
                  <ChartTooltipContent
                    hideLabel
                    className="bg-white text-web-dark-grey p-2 rounded-lg border-0 shadow-lg"
                  />
                }
              />
              <Bar
                dataKey="incidents"
                fill="var(--color-incidents)"
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
