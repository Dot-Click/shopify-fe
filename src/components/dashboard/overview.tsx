import * as React from "react";
// import { format } from "date-fns";
// import {
//   Calendar as CalendarIcon,
//   // Flag,
//   // HardHat,
//   // Network,
//   // Store,
// } from "lucide-react";

// import { Button } from "../ui/button";
// import { Calendar } from "../ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import IPLogo from "/icons/ip.svg";
import Store from "/icons/retailer.svg";
import Hat from "/icons/hat.svg";
import Flag from "/icons/flag.svg";
import { useEffect, useState } from "react";
import { Box } from "../ui/box";
import { useFetchTotalFlaggedCustomers } from "@/hooks/shopifycustomers/usefetchtotalflagged";
import { authClient } from "@/providers/user.provider";
import { useFetchRiskyIPs } from "@/hooks/shopifycustomers/usefetchriskyip";
import { useFetchRepeatedOffenders } from "@/hooks/shopifycustomers/usefetchrepeatedoffenders";
// import { BiSolidFlagAlt } from "react-icons/bi";
// import { FaHatCowboy } from "react-icons/fa";

type StatCardProps = {
  title: string;
  value: number;
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

      <Box className="flex-shrink-0 rounded-full bg-white p-3 ">
        <img src={Icon as string} className="h-6 w-6" alt={`${title} icon`} />
      </Box>
      <Box className="relative z-10">
        <p className="text-sm font-light">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </Box>
    </div>
  );
}

export function OverviewSection() {
  // const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: TotalFlagged } = useFetchTotalFlaggedCustomers();
  const { data: RiskyIPs } = useFetchRiskyIPs();
  const { data: RepeatedOffenders } = useFetchRepeatedOffenders();
  const [totalStores, setTotalStores] = useState(0);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const { data: store } = await authClient.admin.listUsers({
          query: {
            filterField: "role",
            filterValue: "sub-admin",
            filterOperator: "contains",
          },
        });

        const extractingTotalStore =
          store?.users.filter((c) => c.banned === false).length || 0;
        setTotalStores(extractingTotalStore);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const overviewData: StatCardProps[] = [
    {
      title: "Total Flagged Users",
      value: TotalFlagged ?? 0,
      icon: Flag,
      bgColor: "bg-blue-500",
      iconColor: "text-blue-500",
    },
    {
      title: "Repeat Offenders",
      value: RepeatedOffenders ?? 0,
      icon: Hat,
      bgColor: "bg-red-500",
      iconColor: "text-red-500",
    },
    {
      title: "Top Risk IPs",
      value: RiskyIPs ?? 0,
      icon: IPLogo,
      bgColor: "bg-teal-400",
      iconColor: "text-teal-400",
    },
    {
      title: "Active Retailers",
      value: totalStores,
      icon: Store,
      bgColor: "bg-orange-400",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <Card className="border-0 bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Overview</CardTitle>

        {/* <Popover>
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
        </Popover> */}
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
