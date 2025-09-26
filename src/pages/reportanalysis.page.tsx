import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { type ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Download } from "lucide-react";

import { Box } from "../components/ui/box";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";
import { TableProvider } from "../providers/table.provider";
import {
  TableComponent,
  SortedHeader,
  checkBoxProps,
} from "../components/common/tablecomponent";
import { cn } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import underline from "/images/underline_2.svg";
import { useFetchReportIncidents } from "@/hooks/shopifycustomers/usefetchreportincidents";
import { eachMonthOfInterval, format } from "date-fns";
import { useFetchFlaggedCustomerAndStore } from "@/hooks/shopifycustomers/usefetchflaggedcustomer";
import {
  generateCustomerReport,
  generateStoreReport,
  generateNetworkOnboardingEffectivenessReport,
} from "@/utils/pdfgenerator";

const chartConfig = {
  riskIncidents: {
    label: "risk Incidents (Users)",
    color: "hsl(221, 83%, 53%)", // Blue
  },
  affectedStores: {
    label: "Affected Stores",
    color: "hsl(142, 71%, 45%)", // Green
  },
} satisfies ChartConfig;

function ReportOverviewChart({
  onExport,
}: {
  onExport: (chartData: any[]) => void;
}) {
  const { data, isLoading, error } = useFetchReportIncidents();

  const allMonths = eachMonthOfInterval({
    start: new Date(new Date().getFullYear(), 0), // Jan
    end: new Date(new Date().getFullYear(), 11), // Dec
  }).map((date) => ({
    month: format(date, "LLL yyyy"),
    riskIncidents: 0,
    affectedStores: 0,
  }));

  const chartData = allMonths.map((m) => {
    const found = data?.find((item) => item.month === m.month);
    return {
      ...m,
      riskIncidents: found ? Number(found.riskIncidents) : 0,
      affectedStores: found ? Number(found.affectedStores) : 0,
    };
  });

  if (isLoading) {
    return <div className="p-6 text-slate-500">Loading chart...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading chart data</div>;
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="w-full">
        <Box className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Overview</CardTitle>
          <div className="flex items-center gap-6">
            {Object.values(chartConfig).map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </Box>
        <img src={underline} className="w-full" />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart
            data={chartData}
            accessibilityLayer
            width={300}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dashed"
                  className="bg-white text-web-dark-grey p-2 rounded-lg border-0 shadow-lg"
                />
              }
            />
            <Bar
              dataKey="riskIncidents"
              fill="var(--color-riskIncidents)"
              radius={4}
            />
            <Bar
              dataKey="affectedStores"
              fill="var(--color-affectedStores)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
        <div className="mt-4 flex justify-end">
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => onExport(chartData)}
          >
            <Download className="mr-2 h-4 w-4" /> Export Chart as PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Types and Data for Tables ---
type CustomerEntry = {
  id: string;
  name: string;
  email: string;
  riskLevel: number;
  totalriskReports: number;
};

type StoreEntry = {
  id: string;
  storeName: string;
  email: string;
  apiKey: string;
};

const getRiskColor = (level: number) => {
  if (level > 75) return "bg-red-500";
  if (level > 40) return "bg-orange-500";
  return "bg-green-500";
};

const RiskLevelIndicator = ({ level }: { level: number }) => (
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

function ReportTable() {
  const [activeTab, setActiveTab] = React.useState("customers");
  const { data, isLoading } = useFetchFlaggedCustomerAndStore();

  const isCustomerView = activeTab === "customers";

  const customerData: CustomerEntry[] =
    data?.flaggedCustomers?.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      riskLevel: c.riskLevel,
      totalriskReports: c.totalRiskReport ?? 0,
    })) ?? [];

  const storeData: StoreEntry[] =
    data?.storesAffected?.map((s) => ({
      id: s.id,
      storeName: s.name,
      email: s.email,
      apiKey: s.shopifyApiKey || "N/A",
    })) ?? [];

  const customerColumns: ColumnDef<CustomerEntry>[] = [
    {
      id: "select",
      header: (info) => <Checkbox {...checkBoxProps(info)} />,
      cell: (info) => <Checkbox {...checkBoxProps(info)} />,
    },
    {
      accessorKey: "id",
      header: (info) => <SortedHeader header={info.header} label="User ID" />,
    },
    {
      accessorKey: "name",
      header: (info) => <SortedHeader header={info.header} label="Name" />,
    },
    {
      accessorKey: "email",
      header: (info) => <SortedHeader header={info.header} label="Email" />,
    },
    {
      accessorKey: "riskLevel",
      header: "Risk Level",
      cell: ({ row }) => <RiskLevelIndicator level={row.original.riskLevel} />,
    },
    {
      accessorKey: "totalriskReports",
      header: (info) => (
        <SortedHeader header={info.header} label="Total risk Reports" />
      ),
    },
    {
      id: "actions",
      cell: () => (
        <Button
          size="sm"
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => generateCustomerReport(customerData)}
        >
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      ),
    },
  ];

  const storeColumns: ColumnDef<StoreEntry>[] = [
    {
      id: "select",
      header: (info) => <Checkbox {...checkBoxProps(info)} />,
      cell: (info) => <Checkbox {...checkBoxProps(info)} />,
    },
    {
      accessorKey: "id",
      header: (info) => <SortedHeader header={info.header} label="ID" />,
    },
    {
      accessorKey: "storeName",
      header: (info) => (
        <SortedHeader header={info.header} label="Store Name" />
      ),
    },
    {
      accessorKey: "email",
      header: (info) => <SortedHeader header={info.header} label="Email" />,
    },
    {
      accessorKey: "apiKey",
      header: (info) => <SortedHeader header={info.header} label="API Key" />,
    },
    {
      id: "actions",
      header: () => <div className="text-right pr-4">Action</div>,
      cell: () => (
        <div className="text-right">
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => generateStoreReport(storeData)}
          >
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-6">
      <header className="flex flex-wrap items-center justify-between gap-4 px-5 ">
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          <Button
            size="sm"
            onClick={() => setActiveTab("customers")}
            variant={activeTab === "customers" ? "default" : "ghost"}
            className={cn(
              activeTab === "customers"
                ? "bg-white text-slate-700 shadow-sm hover:bg-white"
                : "text-slate-600 hover:bg-slate-200"
            )}
          >
            Flagged Customers
          </Button>
          <Button
            size="sm"
            onClick={() => setActiveTab("stores")}
            variant={activeTab === "stores" ? "default" : "ghost"}
            className={cn(
              activeTab === "stores"
                ? "bg-white text-slate-700 shadow-sm hover:bg-white"
                : "text-slate-600 hover:bg-slate-200"
            )}
          >
            Stores
          </Button>
        </div>
      </header>

      <main className="mt-4">
        {isCustomerView ? (
          <TableProvider data={customerData} columns={customerColumns}>
            {() => <TableComponent isLoading={isLoading} />}
          </TableProvider>
        ) : (
          <TableProvider data={storeData} columns={storeColumns}>
            {() => <TableComponent isLoading={isLoading} />}
          </TableProvider>
        )}
      </main>
    </div>
  );
}

function ReportAnalysis() {
  return (
    <Box className="rounded-xl bg-white pt-10">
      {/* Page Header */}
      <header className="flex items-center justify-between px-5 pb-2">
        <h1 className="text-2xl font-bold text-slate-800">
          Report & Analytics
        </h1>
        <div className="flex">
          <Button className="rounded-r-none bg-blue-600 text-white hover:bg-blue-700">
            Export Data
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="rounded-l-none border-l border-blue-400 bg-[#0A39D4] px-2 text-white hover:bg-[#0932b5]"
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem
                onClick={() =>
                  generateNetworkOnboardingEffectivenessReport({
                    networkChartNode: document.getElementById("networkChart"), // or pass null if none
                    monthlyData: [], // your monthly risk/store data here
                    topDomains: [
                      ["gmail.com", 20],
                      ["yahoo.com", 5],
                    ], // example
                    topPostcodes: [
                      ["12345", 12],
                      ["67890", 8],
                    ], // optional
                    plansStats: [], // [["Basic", 10], ["Pro", 5]]
                    pendingActivations: 0,
                    avgActivationTimeDays: 0,
                    newStores30: 0,
                    systemEffectiveness: {
                      totalFlaggedOrders: 0,
                      preventedLossEstimate: 0,
                      percentRealIssues: 0, // should be number, e.g., 0.25 (25%)
                      percentCancelled: 0, // add if needed
                      monthly: [], // same shape as monthlyData
                    },
                  })
                }
              >
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Chart Section */}
      <ReportOverviewChart
        onExport={() =>
          generateNetworkOnboardingEffectivenessReport({
            networkChartNode: document.getElementById("networkChart"), // or pass null if none
            monthlyData: [], // your monthly risk/store data here
            topDomains: [
              ["gmail.com", 20],
              ["yahoo.com", 5],
            ], // example
            topPostcodes: [
              ["12345", 12],
              ["67890", 8],
            ], // optional
            plansStats: [], // [["Basic", 10], ["Pro", 5]]
            pendingActivations: 0,
            avgActivationTimeDays: 0,
            newStores30: 0,
            systemEffectiveness: {
              totalFlaggedOrders: 0,
              preventedLossEstimate: 0,
              percentRealIssues: 0, // should be number, e.g., 0.25 (25%)
              percentCancelled: 0, // add if needed
              monthly: [], // same shape as monthlyData
            },
          })
        }
      />

      {/* Table Section */}
      <ReportTable />
    </Box>
  );
}

export default ReportAnalysis;
