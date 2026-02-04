import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Download, Search } from "lucide-react";
import { format } from "date-fns";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { TableProvider } from "@/providers/table.provider";
import {
  TableComponent,
  SortedHeader,
} from "@/components/common/tablecomponent";
import { cn } from "@/lib/utils";

import { useFetchHighRiskActivityReport, type HighRiskCustomer } from "@/hooks/reports/usefetchriskycustomer";

/* ------------------- Helper Components ------------------- */

const FlaggedBadge = ({ count }: { count: number }) => {
  // Visual severity based on count
  const colorClass =
    count > 10
      ? "bg-red-100 text-red-700 border-red-200"
      : count > 5
      ? "bg-orange-100 text-orange-700 border-orange-200"
      : "bg-yellow-100 text-yellow-700 border-yellow-200";

  return (
    <Badge variant="outline" className={cn("font-semibold", colorClass)}>
      {count} {count === 1 ? "Attempt" : "Attempts"}
    </Badge>
  );
};

/* ------------------- Main Component ------------------- */

export function HighRiskCustomerList() {
  const { data, isLoading } = useFetchHighRiskActivityReport();
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Filter Data based on Search
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchTerm) return data;

    const lowerTerm = searchTerm.toLowerCase();
    return data.filter((item) =>
      item.email.toLowerCase().includes(lowerTerm)
    );
  }, [data, searchTerm]);

  // 2. CSV Export Logic
  const handleExportCSV = () => {
    if (!filteredData || filteredData.length === 0) return;

    const headers = [
      "Customer ID",
      "Email",
      "City",
      "Zip Code",
      "Country",
      "Flagged Attempts",
      "Last Attempt Date",
    ];

    const rows = filteredData.map((item) => {
      const city = item.latestAddress?.city || "N/A";
      const zip = item.latestAddress?.zip || "N/A";
      const country = item.latestAddress?.country || "N/A";
      const date = item.lastAttemptDate
        ? format(new Date(item.lastAttemptDate), "yyyy-MM-dd HH:mm:ss")
        : "N/A";

      // Escape quotes for CSV safety
      const safeEmail = `"${item.email.replace(/"/g, '""')}"`;

      return [
        item.customerId,
        safeEmail,
        `"${city}"`,
        `"${zip}"`,
        `"${country}"`,
        item.flaggedAttempts,
        date,
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `High_Risk_Report_${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 3. Table Columns Definition
  const columns: ColumnDef<HighRiskCustomer>[] = [
    {
      accessorKey: "email",
      header: (info) => <SortedHeader header={info.header} label="Customer" />,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-700">{row.original.email}</span>
          <span className="text-xs text-slate-400">ID: {row.original.customerId}</span>
        </div>
      ),
    },
    {
      id: "location",
      header: (info) => <SortedHeader header={info.header} label="Last Known Location" />,
      cell: ({ row }) => {
        const addr = row.original.latestAddress;
        if (!addr) return <span className="text-slate-400 italic">N/A</span>;
        return (
          <div className="flex flex-col text-sm">
            <span>
              {[addr.city, addr.zip].filter(Boolean).join(", ")}
            </span>
            <span className="text-xs text-slate-500">{addr.country}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "flaggedAttempts",
      header: (info) => (
        <SortedHeader header={info.header} label="Flagged Activity" />
      ),
      cell: ({ row }) => (
        <FlaggedBadge count={row.original.flaggedAttempts} />
      ),
    },
    {
      accessorKey: "lastAttemptDate",
      header: (info) => (
        <SortedHeader header={info.header} label="Last Attempt" />
      ),
      cell: ({ row }) => {
        const date = row.original.lastAttemptDate;
        return (
          <span className="text-slate-600">
            {date ? format(new Date(date), "MMM dd, yyyy HH:mm") : "N/A"}
          </span>
        );
      },
    },
  ];

  return (
    <Box className="rounded-lg bg-white shadow-sm">
      <header className="flex flex-wrap items-center p-6 justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">
          High-Risk Activity Report
        </h1>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-64 border-slate-300 bg-white"
            />
          </div>

          {/* Export Button */}
          <Button
            variant="outline"
            className="text-slate-700 border-slate-300"
            onClick={handleExportCSV}
            disabled={!data || data.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </header>

      <Box className="mt-2">
        <TableProvider
          data={filteredData}
          columns={columns as ColumnDef<any, any>[]}
        >
          {() => <TableComponent isLoading={isLoading} />}
        </TableProvider>
      </Box>
    </Box>
  );
}