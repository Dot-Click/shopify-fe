import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Filter as FilterIcon } from "lucide-react";

import { Box } from "../components/ui/box";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
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

import { useFetchAllCustomers } from "../hooks/shopifycustomers/usefetchcustomers";
import { ViewOrderModal } from "../components/modals/vieworder.modal";
import { useSearchParams } from "react-router-dom";
import { useBlockCustomer } from "@/hooks/shopifycustomers/useblockcustomer";
import { useState, useMemo } from "react";

interface Customer {
  id: string;
  name: string;
  createdAt: string;
  customerEmail: string;
  customerPhone: string | null;
  image: {
    url: string;
  };
  riskLevel: number;
  blocked: boolean;
  refundsFromStores: number;
}

const getRiskColor = (level: number) => {
  if (level > 75) return "bg-red-500";
  if (level > 40) return "bg-orange-400";
  return "bg-green-500";
};

const getRiskBadgeClass = (level: number) => {
  if (level > 75) return "bg-red-100 text-red-700 border-red-200";
  if (level > 40) return "bg-orange-100 text-orange-700 border-orange-200";
  return "bg-green-100 text-green-700 border-green-200";
};

const RiskLevelIndicator = ({ level }: { level: number }) => (
  <div className="flex items-center gap-3">
    <div className="relative w-28 h-1.5 bg-slate-200 rounded-full">
      <div
        className={cn(
          "absolute top-0 left-0 h-full rounded-full",
          getRiskColor(level)
        )}
        style={{ width: `${level}%`, maxWidth: "100%" }}
      />
    </div>
    <span className="text-sm font-medium text-slate-600 w-8">{level}%</span>
  </div>
);

const RefundsBadge = ({ level, count }: { level: number; count: number }) => (
  <Badge
    variant="outline"
    className={cn("font-semibold", getRiskBadgeClass(level))}
  >
    {count} {count === 1 ? "Store" : "Stores"}
  </Badge>
);

function CustomerManagement() {
  const { data: customers, isLoading: isLoadingCustomers } =
    useFetchAllCustomers();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";
  const { mutate: block } = useBlockCustomer();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [sortRisk, setSortRisk] = useState<"asc" | "desc" | null>(null);
  const [blockedFilter, setBlockedFilter] = useState<
    "all" | "blocked" | "unblocked"
  >("all");

  // Filtering + Sorting
  const filteredCustomers = useMemo(() => {
    let result = (customers || []).filter((c) => {
      const id = c.id?.toLowerCase() || "";
      const name = c.name?.toLowerCase() || "";
      const email = c.customerEmail?.toLowerCase() || "";

      const matchesSearch =
        id.includes(search) || name.includes(search) || email.includes(search);

      const matchesBlocked =
        blockedFilter === "all" ||
        (blockedFilter === "blocked" && c.blocked) ||
        (blockedFilter === "unblocked" && !c.blocked);

      return matchesSearch && matchesBlocked;
    });

    if (sortRisk) {
      result = [...result].sort((a, b) =>
        sortRisk === "asc"
          ? a.riskLevel - b.riskLevel
          : b.riskLevel - a.riskLevel
      );
    }

    return result;
  }, [customers, search, blockedFilter, sortRisk]);

  const columns: ColumnDef<Customer>[] = [
    {
      id: "select",
      header: (info) => <Checkbox {...checkBoxProps(info)} />,
      cell: (info) => <Checkbox {...checkBoxProps(info)} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: (info) => (
        <SortedHeader header={info.header} label="Customer ID" />
      ),
    },
    {
      accessorKey: "name",
      header: (info) => <SortedHeader header={info.header} label="Name" />,
      cell: ({ row }) => (
        <Box className="flex items-center gap-3">
          <Box className="font-medium">{row.original.name}</Box>
        </Box>
      ),
    },
    {
      accessorKey: "riskLevel",
      header: (info) => (
        <SortedHeader header={info.header} label="Risk Level" />
      ),
      cell: ({ row }) => <RiskLevelIndicator level={row.original.riskLevel} />,
    },
    {
      accessorKey: "totalRefunds",
      header: (info) => <SortedHeader header={info.header} label="Refunds" />,
      cell: ({ row }) => (
        <RefundsBadge
          level={row.original.riskLevel}
          count={row.original.refundsFromStores}
        />
      ),
    },
    {
      id: "actions",
      header: (info) => <SortedHeader header={info.header} label="Actions" />,
      cell: ({ row }) => (
        <Box className="flex items-center gap-2">
          <ViewOrderModal user={row.original} />
          {row.original.blocked ? (
            <Button
              variant="destructive"
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => block(row.original.id)}
            >
              Block
            </Button>
          ) : (
            <Button
              variant="destructive"
              size="sm"
              className="bg-blue-400 hover:bg-blue-700 text-white"
              onClick={() => block(row.original.id)}
            >
              Unblock
            </Button>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box className="rounded-lg bg-white shadow-sm">
      <header className="flex flex-wrap items-center p-6 justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Customer Management
        </h1>
        <div className="flex items-center gap-3">
          {/* Blocked Filter */}
          <Select
            value={blockedFilter}
            onValueChange={(val) =>
              setBlockedFilter(val as "all" | "blocked" | "unblocked")
            }
          >
            <SelectTrigger className="w-32 border-slate-300 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="unblocked">Unblocked</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort by Risk */}
          <Button
            variant="outline"
            className="text-slate-700 border-slate-300"
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
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <FilterIcon className="mr-2 h-4 w-4" /> More Filters
          </Button>
        </div>
      </header>

      {isFilterModalOpen && (
        <Box className="p-6 pt-0 border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Add your other filter components here */}
            <div>
              <label className="text-sm font-medium text-slate-600">
                Filter by Date
              </label>
              <Select /* value={dateFilter} onValueChange={setDateFilter} */>
                <SelectTrigger className="w-full border-slate-300 bg-white mt-1">
                  <SelectValue placeholder="Select Date Range" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Add more filters as needed */}
          </div>
        </Box>
      )}

      <Box className="mt-6">
        <TableProvider
          data={filteredCustomers}
          columns={columns as ColumnDef<any, any>[]}
        >
          {() => <TableComponent isLoading={isLoadingCustomers} />}
        </TableProvider>
      </Box>
    </Box>
  );
}

export default CustomerManagement;
