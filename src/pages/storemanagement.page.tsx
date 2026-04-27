import * as React from "react";
import { useState, useMemo } from "react"; // Correctly imported
import { type ColumnDef } from "@tanstack/react-table";
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
import { authClient } from "@/providers/user.provider";
import { useFetchAllStores } from "../hooks/users/usefetchstore";
import { useUpdateUserVerification } from "../hooks/users/useupdatestorestatus";
import { useSearchParams } from "react-router-dom";
import { StoreSettingsDialog } from "../components/admin/storesettingsdialog";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Filter as FilterIcon, MoreVertical, ExternalLink, ShieldCheck, ShieldAlert, Settings as SettingsIcon, Key, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../components/ui/tooltip";
import { StoreCredentialsDialog } from "../components/admin/storecredentialsdialog";
import { DeleteStoreDialog } from "../components/admin/deletestoredialog";

export type Store = {
  // ... (type is unchanged)
  id: string;
  company_name: string;
  average_orders_per_month: string;
  email: string;
  emailVerified: boolean;
  role?: string | null;
  shopify_api_key: string;
  shopify_access_token: string;
  shopify_url: string;
  createdAt: string;
};

const TruncatedCell = ({ value, length = 20 }: { value: string; length?: number }) => {
  if (!value) return <span>-</span>;
  const isLong = value.length > length;
  const displayValue = isLong ? `${value.substring(0, length)}...` : value;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help whitespace-nowrap overflow-hidden text-ellipsis block max-w-[150px]">
            {displayValue}
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-900 text-white px-3 py-2 rounded-md shadow-lg border-0 max-w-[300px] break-all">
          {value}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

function StoreManagement() {
  const { data: session } = authClient.useSession();
  const { data: stores, isLoading: isLoadingStores } = useFetchAllStores();
  const { mutate: updateUser, isPending: isUpdating } =
    useUpdateUserVerification();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCredentialsOpen, setIsCredentialsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ... (rest of the processing logic remains the same)
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "approved" | "pending"
  >("all");
  const [sortDate, setSortDate] = useState<"asc" | "desc" | null>(null);

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
      {
        id: "select",
        header: (info) => <Checkbox {...checkBoxProps(info)} />,
        cell: (info) => <Checkbox {...checkBoxProps(info)} />,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "company_name",
        header: (info) => (
          <SortedHeader header={info.header} label="Store Name" />
        ),
        cell: (info) => <TruncatedCell value={info.getValue() as string} length={18} />,
      },
      {
        accessorKey: "email",
        header: (info) => <SortedHeader header={info.header} label="Email" />,
        cell: (info) => <span className="text-slate-600 text-sm">{info.getValue() as string}</span>,
      },
      {
        accessorKey: "shopify_api_key",
        header: (info) => (
          <SortedHeader header={info.header} label="API Key" />
        ),
        cell: (info) => <TruncatedCell value={info.getValue() as string} length={12} />,
      },
      {
        accessorKey: "shopify_url",
        header: (info) => (
          <SortedHeader header={info.header} label="Domain" />
        ),
        cell: (info) => {
          const url = info.getValue() as string;
          return (
            <div className="flex items-center gap-1.5">
              <TruncatedCell value={url} length={20} />
              {url && (
                <a href={url.startsWith('http') ? url : `https://${url}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: (info) => (
          <SortedHeader header={info.header} label="Created At" />
        ),
        cell: (info) => {
          const createdAt = info.getValue() as string;
          return (
            <span className="text-slate-500 text-sm">
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const store = row.original;
          return (
            <div className={cn(
              "inline-flex items-center px-2 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider",
              store.emailVerified ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
            )}>
              {store.emailVerified ? <ShieldCheck className="h-3 w-3 mr-1" /> : <ShieldAlert className="h-3 w-3 mr-1" />}
              {store.emailVerified ? "Approved" : "Pending"}
            </div>
          );
        }
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const store = row.original;
          const canDeleteStore =
            store.role !== "superadmin" && store.id !== session?.user?.id;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full">
                  <MoreVertical className="h-4 w-4 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border border-slate-200 shadow-lg min-w-[160px] p-1">
                {store.emailVerified ? (
                  <DropdownMenuItem
                    className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer rounded-md transition-colors"
                    onClick={() =>
                      updateUser({ userId: store.id, isVerified: false })
                    }
                  >
                    <ShieldAlert className="h-4 w-4 mr-2" />
                    Disapprove Store
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="flex items-center px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 focus:bg-emerald-50 cursor-pointer rounded-md transition-colors"
                    onClick={() =>
                      updateUser({ userId: store.id, isVerified: true })
                    }
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Approve Store
                  </DropdownMenuItem>
                )}
                <div className="h-px bg-slate-100 my-1" />
                <DropdownMenuItem
                  className="flex items-center px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:bg-slate-50 cursor-pointer rounded-md transition-colors"
                  onClick={() => {
                    setSelectedStore(store);
                    setIsSettingsOpen(true);
                  }}
                >
                  <SettingsIcon className="h-4 w-4 mr-2 text-slate-500" />
                  Edit Risk Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:bg-slate-50 cursor-pointer rounded-md transition-colors"
                  onClick={() => {
                    setSelectedStore(store);
                    setIsCredentialsOpen(true);
                  }}
                  >
                    <Key className="h-4 w-4 mr-2 text-blue-500" />
                    Edit Credentials
                  </DropdownMenuItem>
                {canDeleteStore && (
                  <>
                    <div className="h-px bg-slate-100 my-1" />
                    <DropdownMenuItem
                      className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer rounded-md transition-colors"
                      onClick={() => {
                        setSelectedStore(store);
                        setIsDeleteOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Store
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [session?.user?.id, updateUser]
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
      <main className="mt-6 pb-6">
        <TableProvider data={processedStores} columns={columns}>
          {() => <TableComponent isLoading={isLoading} />}
        </TableProvider>
      </main>

      {/* Admin Settings Dialog */}
      <StoreSettingsDialog
        storeId={selectedStore?.id || null}
        storeName={selectedStore?.company_name || null}
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />

      <StoreCredentialsDialog 
        storeId={selectedStore?.id || null}
        storeName={selectedStore?.company_name || null}
        initialApiKey={selectedStore?.shopify_api_key}
        initialAccessToken={selectedStore?.shopify_access_token}
        open={isCredentialsOpen}
        onOpenChange={setIsCredentialsOpen}
      />

      <DeleteStoreDialog
        storeId={selectedStore?.id || null}
        storeName={selectedStore?.company_name || null}
        storeEmail={selectedStore?.email || null}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </Box>
  );
}

export default StoreManagement;
