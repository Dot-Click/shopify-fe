import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Download,
  Filter as FilterIcon,
} from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { TableProvider } from "../providers/table.provider";
import {
  TableComponent,
  SortedHeader,
  checkBoxProps,
} from "../components/common/tablecomponent"; // Adjust path to your table component
import { cn } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import underline from "/images/underline_2.svg";

// --- Chart Component ---

const chartData = [
  { month: "Jan", riskIncidents: 40, affectedStores: 62 },
  { month: "Feb", riskIncidents: 20, affectedStores: 82 },
  { month: "Mar", riskIncidents: 40, affectedStores: 62 },
  { month: "Apr", riskIncidents: 40, affectedStores: 62 },
  { month: "May", riskIncidents: 88, affectedStores: 42 },
  { month: "Jun", riskIncidents: 88, affectedStores: 82 },
  { month: "Jul", riskIncidents: 40, affectedStores: 28 },
  { month: "Aug", riskIncidents: 62, affectedStores: 42 },
  { month: "Sep", riskIncidents: 55, affectedStores: 62 },
  { month: "Oct", riskIncidents: 62, affectedStores: 82 },
  { month: "Nov", riskIncidents: 88, affectedStores: 100 },
  { month: "Dec", riskIncidents: 88, affectedStores: 62 },
];

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

function ReportOverviewChart() {
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

const customerData: CustomerEntry[] = Array(5).fill({
  id: "1001",
  name: "Emma Johnson",
  email: "emma.j@gmail.com",
  riskLevel: 45,
  totalriskReports: 12,
});

const storeData: StoreEntry[] = [
  {
    id: "1001",
    storeName: "Gucci",
    email: "support@guci.com",
    apiKey: "8a9d3b4x",
  },
  {
    id: "1002",
    storeName: "Dior",
    email: "admin@dior.com",
    apiKey: "3f4r2x8s",
  },
  { id: "1003", storeName: "Bata", email: "help@bata.com", apiKey: "z25s3r1t" },
  {
    id: "1004",
    storeName: "Adidas",
    email: "support@adidas.com",
    apiKey: "api-ax98z",
  },
  {
    id: "1005",
    storeName: "Nike",
    email: "admin@nike.com",
    apiKey: "api-nk23s",
  },
];

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

const customerColumns: ColumnDef<CustomerEntry>[] = [
  {
    id: "select",
    header: (info) => <Checkbox {...checkBoxProps(info)} />,
    cell: (info) => <Checkbox {...checkBoxProps(info)} />,
  },
  {
    accessorKey: "id",
    header: (info) => <SortedHeader header={info.header} label="User ID" />,
    meta: {
      mobileHeader: "USer Id",
    },
  },
  {
    accessorKey: "name",
    header: (info) => <SortedHeader header={info.header} label="Name" />,
    meta: {
      mobileHeader: "Name",
    },
  },
  {
    accessorKey: "email",
    header: (info) => <SortedHeader header={info.header} label="Email" />,
    meta: {
      mobileHeader: "Email",
    },
  },
  {
    accessorKey: "riskLevel",
    header: "Risk Level",
    cell: ({ row }) => <RiskLevelIndicator level={row.original.riskLevel} />,
    meta: {
      mobileHeader: "Risk Level",
    },
  },
  {
    accessorKey: "totalriskReports",
    header: (info) => (
      <SortedHeader header={info.header} label="Total risk Reports" />
    ),
    meta: {
      mobileHeader: "Total risk Reports",
    },
  },
  {
    id: "actions",
    cell: () => (
      <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
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
    header: (info) => <SortedHeader header={info.header} label="Store Name" />,
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
        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>
    ),
  },
];

function ReportTable() {
  const [activeTab, setActiveTab] = React.useState("customers");
  const [isLoading] = React.useState(false);

  const isCustomerView = activeTab === "customers";
  return (
    <div className="mt-6">
      <header className="flex flex-wrap items-center justify-between gap-4 px-5 ">
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          <Button
            size="sm"
            onClick={() => setActiveTab("customers")}
            variant={isCustomerView ? "default" : "ghost"}
            className={cn(
              isCustomerView
                ? "bg-white text-slate-700 shadow-sm hover:bg-white"
                : "text-slate-600 hover:bg-slate-200"
            )}
          >
            Flagged Customers
          </Button>
          <Button
            size="sm"
            onClick={() => setActiveTab("stores")}
            variant={!isCustomerView ? "default" : "ghost"}
            className={cn(
              !isCustomerView
                ? "bg-white text-slate-700 shadow-sm hover:bg-white"
                : "text-slate-600 hover:bg-slate-200"
            )}
          >
            Store
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-600">Showing</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-20 border-slate-300 text-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort by
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
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
          {/* Main action button */}
          <Button className="rounded-r-none bg-blue-600 text-white hover:bg-blue-700">
            Export Data
          </Button>

          {/* Dropdown trigger button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="rounded-l-none border-l border-blue-400 bg-[#0A39D4] px-2 text-white hover:bg-[#0932b5]"
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            {/* Dropdown menu content */}
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Chart Section */}
      <ReportOverviewChart />

      {/* Table Section */}
      <ReportTable />
    </Box>
  );
}

export default ReportAnalysis;
