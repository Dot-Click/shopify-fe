import { useState, useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Filter as FilterIcon } from "lucide-react";

import { Box } from "../components/ui/box";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
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
} from "../components/common/tablecomponent";
import { cn } from "../lib/utils";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import {
  useFetchDashboardCustomers,
  type Customer,
} from "../hooks/shopifycustomers/usefetchdashboardcustomer";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";
import { useSearchParams } from "react-router-dom";
import { ReportSummaryModal } from "@/components/common/modal";

const getRiskColor = (level: number) => {
  if (level > 75) return "bg-red-400";
  if (level > 40) return "bg-orange-400";
  return "bg-green-400";
};

const RiskLevelIndicator = ({ level }: { level: number }) => (
  <div className="flex items-center gap-2">
    <div className="relative w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
      <div
        className={cn("absolute top-0 left-0 h-full", getRiskColor(level))}
        style={{ width: `${level}%` }}
      />
    </div>
    <span className="text-sm text-slate-600 w-10 text-right">{level}%</span>
  </div>
);

const TruncatedCell = ({ text }: { text: string | null }) => {
  if (!text) {
    return <span className="text-slate-400">N/A</span>;
  }
  const truncatedText =
    text.length > 15
      ? `${text.substring(0, 6)}...${text.substring(text.length - 4)}`
      : text;
  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>
        <span className="cursor-default">{truncatedText}</span>
      </TooltipTrigger>
      <TooltipContent className="bg-white text-slate-700 shadow">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: (info) => <Checkbox {...checkBoxProps(info)} />,
    cell: (info) => <Checkbox {...checkBoxProps(info)} />,
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: (info) => <SortedHeader header={info.header} label="User ID" />,
    cell: ({ row }) => <TruncatedCell text={row.original.id ?? "N/A"} />,
  },
  {
    accessorKey: "displayName",
    header: (info) => <SortedHeader header={info.header} label="Name" />,
  },
  {
    accessorKey: "email",
    header: (info) => <SortedHeader header={info.header} label="Email" />,
  },
  {
    accessorKey: "phone",
    header: "Contact Number",
    cell: ({ row }) => row.original.phone ?? "N/A",
  },
  {
    accessorKey: "lastKnownIp",
    header: "IP Address",
    cell: ({ row }) => (
      <TruncatedCell text={row.original.lastKnownIp ?? "N/A"} />
    ),
  },
  {
    accessorKey: "riskLevel",
    header: "Risk Level",
    cell: ({ row }) => <RiskLevelIndicator level={row.original.riskLevel} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white py-5"
            >
              <Eye className="mr-2 h-4 w-4" /> View Detail
            </Button>
          </DialogTrigger>

          <ReportSummaryModal user={user} />
        </Dialog>
      );
    },
  },
];

function UserManagement() {
  const { data: customers, isLoading, error } = useFetchDashboardCustomers();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  const [sortRisk, setSortRisk] = useState<"asc" | "desc" | null>(null);
  const [showFilterSection, setShowFilterSection] = useState(false);

  const [riskFilter, setRiskFilter] = useState<
    "all" | "high" | "medium" | "low"
  >("all");

  const processedCustomers = useMemo(() => {
    let result = (customers || []).filter((c) => {
      const id = c.id?.toLowerCase() || "";
      const name = c.name?.toLowerCase() || "";
      const email = c.email?.toLowerCase() || "";
      const matchesSearch =
        id.includes(search) || name.includes(search) || email.includes(search);

      // 2. NEW: Risk filter logic
      const matchesRisk =
        riskFilter === "all" ||
        (riskFilter === "high" && c.riskLevel > 75) ||
        (riskFilter === "medium" && c.riskLevel > 40 && c.riskLevel <= 75) ||
        (riskFilter === "low" && c.riskLevel <= 40);

      return matchesSearch && matchesRisk;
    });

    // 3. Sorting logic (unchanged)
    if (sortRisk) {
      result = [...result].sort((a, b) => {
        return sortRisk === "asc"
          ? a.riskLevel - b.riskLevel
          : b.riskLevel - a.riskLevel;
      });
    }

    return result;
  }, [customers, search, sortRisk, riskFilter]);

  if (error) {
    return (
      <Box className="rounded-xl bg-white shadow-sm p-7">
        <h2 className="text-red-600 font-semibold">Failed to load data</h2>
        <p className="text-slate-500 mt-2">{error.message}</p>
      </Box>
    );
  }

  return (
    <Box className="rounded-xl bg-white shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-4 pt-5 px-7">
        <h1 className="text-2xl font-semibold text-slate-800">
          Customer Management
        </h1>
        <div className="flex items-center gap-4">
          {/* ... */}
          <Button
            variant="outline"
            className="text-slate-700 border-slate-300 hover:bg-slate-100"
            onClick={() =>
              setSortRisk((prev) =>
                prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
              )
            }
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {sortRisk === "asc"
              ? "Risk ↑"
              : sortRisk === "desc"
              ? "Risk ↓"
              : "Sort by Risk"}
          </Button>

          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-1.5 text-sm"
            onClick={() => setShowFilterSection(!showFilterSection)}
          >
            <FilterIcon className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </header>

      {showFilterSection && (
        <Box className="p-7 pt-4 border-t border-slate-200 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Filter control for Risk Level */}
            <div>
              <label className="text-sm font-medium text-slate-600 block mb-1">
                Filter by Risk
              </label>
              <Select
                value={riskFilter}
                onValueChange={(val) =>
                  setRiskFilter(val as "all" | "high" | "medium" | "low")
                }
              >
                <SelectTrigger className="w-full border-slate-300 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk (&gt;75%)</SelectItem>
                  <SelectItem value="medium">Medium Risk (41-75%)</SelectItem>
                  <SelectItem value="low">Low Risk (&le;40%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Box>
      )}

      <main className="mt-6">
        <TableProvider data={processedCustomers} columns={columns}>
          {() => <TableComponent isLoading={isLoading} />}
        </TableProvider>
      </main>
    </Box>
  );
}

export default UserManagement;
