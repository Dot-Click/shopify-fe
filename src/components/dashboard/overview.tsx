import * as React from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  // Flag,
  // HardHat,
  // Network,
  // Store,
} from "lucide-react";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import IPLogo from "/icons/ip.svg";
import Store from "/icons/retailer.svg";
import Hat from "/icons/hat.svg";
import Flag from "/icons/flag.svg";
// import { BiSolidFlagAlt } from "react-icons/bi";
// import { FaHatCowboy } from "react-icons/fa";

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ElementType | string;
  bgColor: string;
  iconColor: string;
};

function StatCard({
  title,
  value,
  icon: Icon,
  bgColor,
}: // iconColor,
StatCardProps) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 text-white",
        bgColor
      )}
    >
      <img
        src={Icon as string}
        className="absolute -right-0 -bottom-4 h-16 w-16 text-white/20"
        alt=""
      />

      <div className="flex-shrink-0 rounded-full bg-white p-3">
        <img src={Icon as string} className="h-6 w-6" alt={`${title} icon`} />
      </div>
      <div>
        <p className="text-sm font-light">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export function OverviewSection() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const overviewData: StatCardProps[] = [
    {
      title: "Total Flagged Users",
      value: "1,278",
      icon: Flag,
      bgColor: "bg-blue-500",
      iconColor: "text-blue-500",
    },
    {
      title: "Repeat Offenders",
      value: "412",
      icon: Hat,
      bgColor: "bg-red-500",
      iconColor: "text-red-500",
    },
    {
      title: "Top Risk IPs",
      value: "192",
      icon: IPLogo,
      bgColor: "bg-teal-400",
      iconColor: "text-teal-400",
    },
    {
      title: "Active Retailers",
      value: "87",
      icon: Store,
      bgColor: "bg-orange-400",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <Card className="border-0 bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Overview</CardTitle>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[150px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "LLL dd") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className={"bg-white "}
              // initialFocus
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {overviewData.map((data) => (
            <StatCard key={data.title} {...data} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
