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
import { TableProvider } from "../providers/table.provider"; // Adjust path if needed
import {
  TableComponent,
  SortedHeader,
  checkBoxProps,
} from "../components/common/tablecomponent"; // IMPORTANT: Adjust path
import { cn } from "../lib/utils";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import { ReportSummaryModal } from "../components/common/modal";
import {
  useFetchDashboardCustomers,
  type Customer,
} from "../hooks/shopifycustomers/usefetchdashboardcustomer";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";

// --- 1. Data Structure and Mock Data ---

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

  // Truncation logic: show first 6...last 4 for long strings
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
  // Checkbox column using the helper function
  {
    id: "select",
    header: (info) => <Checkbox {...checkBoxProps(info)} />,
    cell: (info) => <Checkbox {...checkBoxProps(info)} />,
    enableSorting: false,
  },
  // Data columns with the SortedHeader component
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
  // Actions column
  {
    id: "actions",
    cell: ({ row }) => (
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
        {/* The DialogContent is our custom modal, receiving the user data for this row */}
        <ReportSummaryModal user={row.original} />
      </Dialog>
    ),
  },
];

function UserManagement() {
  const { data: customers, isLoading, error } = useFetchDashboardCustomers();

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
      {/* Page Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 pt-5 px-7">
        <h1 className="text-2xl font-semibold text-slate-800  ">
          Customer Management
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span>Showing</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-20 border-slate-300 text-slate-700 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            className="text-slate-700 border-slate-300 hover:bg-slate-100"
          >
            <ArrowUpDown className="mr-2 h-4 w-4" /> Sort by
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-1.5 text-sm"
          >
            <FilterIcon className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </header>

      {/* Table Section */}
      <main className="mt-6">
        <TableProvider data={customers ?? []} columns={columns}>
          {() => <TableComponent isLoading={isLoading} />}
        </TableProvider>
      </main>
    </Box>
  );
}

export default UserManagement;
