import * as React from "react";
import { useState, useMemo } from "react"; // Correctly imported
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Filter as FilterIcon } from "lucide-react";
import { Box } from "../components/ui/box";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
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
import { useFetchAllStores } from "../hooks/users/usefetchstore";
import { useUpdateUserVerification } from "../hooks/users/useupdatestorestatus";
import { useSearchParams } from "react-router-dom";

export type Store = {
  // ... (type is unchanged)
  id: string;
  company_name: string;
  average_orders_per_month: string;
  email: string;
  emailVerified: boolean;
  shopify_api_key: string;
  shopify_url: string;
  createdAt: string;
};

function StoreManagement() {
  const { data: stores, isLoading: isLoadingStores } = useFetchAllStores();
  const { mutate: updateUser, isPending: isUpdating } =
    useUpdateUserVerification();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  // State management is correct and remains the same
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "approved" | "pending"
  >("all");
  const [sortDate, setSortDate] = useState<"asc" | "desc" | null>(null);

  // Data processing logic is correct and remains the same
  const processedStores = useMemo(() => {
    let result = (stores || []).filter((c) => {
      const id = c.id?.toLowerCase() || "";
      const name = c.company_name?.toLowerCase() || "";
      const email = c.email?.toLowerCase() || "";
      const matchesSearch =
        id.includes(search) || name.includes(search) || email.includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "approved" && c.emailVerified) ||
        (statusFilter === "pending" && !c.emailVerified);

      return matchesSearch && matchesStatus;
    });

    if (sortDate) {
      result = [...result].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDate === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    return result;
  }, [stores, search, statusFilter, sortDate]);

  const columns: ColumnDef<Store>[] = React.useMemo(
    () => [
      // Column definitions are unchanged
      {
        id: "select",
        header: (info) => <Checkbox {...checkBoxProps(info)} />,
        cell: (info) => <Checkbox {...checkBoxProps(info)} />,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "id",
        header: (info) => <SortedHeader header={info.header} label="ID" />,
        cell: (info) => (
          <span>{(info.getValue() as string).substring(0, 6)}</span>
        ),
      },
      {
        accessorKey: "company_name",
        header: (info) => (
          <SortedHeader header={info.header} label="Store Name" />
        ),
      },
      {
        accessorKey: "email",
        header: (info) => <SortedHeader header={info.header} label="Email" />,
      },
      {
        accessorKey: "shopify_api_key",
        header: (info) => (
          <SortedHeader header={info.header} label="Shopify API Key" />
        ),
      },
      {
        accessorKey: "shopify_url",
        header: (info) => (
          <SortedHeader header={info.header} label="Shopify URL" />
        ),
      },
      {
        accessorKey: "createdAt",
        header: (info) => (
          <SortedHeader header={info.header} label="Created At" />
        ),
        cell: (info) => {
          const createdAt = info.getValue() as string;
          return (
            <span>
              {(() => {
                const d = new Date(createdAt);
                const dayName = d.toLocaleDateString("en-US", {
                  weekday: "short",
                }); // “Tue”
                const monthName = d.toLocaleDateString("en-US", {
                  month: "short",
                }); // “Oct”
                const dayNum = d.getDate(); // e.g. 6
                const year = d.getFullYear(); // e.g. 2025
                return `${dayName}, ${monthName} ${dayNum}, ${year}`;
              })()}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const store = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`${
                  store.emailVerified ? "bg-green-400" : "bg-red-400"
                } text-[#fff] px-2 py-1 rounded-md`}
              >
                {store.emailVerified ? "Approved" : "Pending"}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-0">
                {store.emailVerified ? (
                  <DropdownMenuItem
                    onClick={() =>
                      updateUser({ userId: store.id, isVerified: false })
                    }
                  >
                    Disapprove
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() =>
                      updateUser({ userId: store.id, isVerified: true })
                    }
                  >
                    Approve
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [updateUser]
  );

  const isLoading = isLoadingStores || isUpdating;

  return (
    <Box className="rounded-xl bg-white shadow-sm">
      {/* Page Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 px-5 pt-7">
        <h1 className="text-2xl font-semibold text-slate-800">
          Store Management
        </h1>
        <div className="flex items-center gap-4">
          {/* Main filter dropdown has been REMOVED from here */}

          <Button
            variant="outline"
            className="text-slate-700 border-slate-300 hover:bg-slate-100"
            onClick={() =>
              setSortDate((prev) =>
                prev === "desc" ? "asc" : prev === "asc" ? null : "desc"
              )
            }
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {sortDate === "desc"
              ? "Newest"
              : sortDate === "asc"
              ? "Oldest"
              : "Sort by Date"}
          </Button>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
          >
            <FilterIcon className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </header>

      {/* Conditionally rendered filter section */}
      {showMoreFilters && (
        <Box className="p-5 border-t border-slate-200 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* The Status Filter dropdown is now MOVED here */}
            <div>
              <label className="text-sm font-medium text-slate-600 block mb-1">
                Filter by Status
              </label>
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter(value as "all" | "approved" | "pending")
                }
              >
                <SelectTrigger className="w-full border-slate-300 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* You can add more filters here in the future */}
          </div>
        </Box>
      )}

      {/* Table Section */}
      <main className="mt-6">
        <TableProvider data={processedStores} columns={columns}>
          {() => <TableComponent isLoading={isLoading} />}
        </TableProvider>
      </main>
    </Box>
  );
}

export default StoreManagement;
