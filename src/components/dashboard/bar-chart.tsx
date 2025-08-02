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
import { format } from "date-fns";
import underline from "/images/underline_2.svg";

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

const incidentsConfig = {
  incidents: {
    label: "Incidents",
    color: "hsl(210, 89%, 60%)",
  },
};

export function IncidentsBarChart() {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
                // initialFocus
              />
            </PopoverContent>
          </Popover>
        </Box>
        <img src={underline} />
      </CardHeader>

      <CardContent className="flex-1 h-[200px] w-full">
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="incidents" fill="var(--color-incidents)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
