import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  //   Eye,
  // MoreVertical,
  Filter as FilterIcon,
} from "lucide-react";

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

// Refunds Badge Component
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


  const filteredCustomers = (customers || []).filter((c) => {
    const id = c.id?.toLowerCase() || "";
    const name = c.name?.toLowerCase() || "";
    const email = c.customerEmail?.toLowerCase() || "";

    return (
      id.includes(search) || name.includes(search) || email.includes(search)
    );
  });

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
    // Actions column with View and Block buttons
    {
      id: "actions",
      header: (info) => <SortedHeader header={info.header} label="Actions" />,
      cell: ({ row }) => (
        <Box className="flex items-center gap-2">
          <ViewOrderModal user={row.original} />
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white py-4.5 px-5w"
            onClick={() => block(row.original.id)}
          >
            Block
            {/* <MoreVertical className="ml-2 h-4 w-4" /> */}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box className="rounded-lg bg-white shadow-sm">
      {/* Page Header */}
      <header className="flex flex-wrap items-center p-6 justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Customer Management
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Showing</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-24 border-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="text-slate-700 border-slate-300">
            <ArrowUpDown className="mr-2 h-4 w-4" /> Sort by
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <FilterIcon className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </header>

      {/* Table Section */}
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
