import * as React from "react";
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

  const filteredCustomers = (stores || []).filter((c) => {
    const id = c.id?.toLowerCase() || "";
    const name = c.company_name?.toLowerCase() || "";
    const email = c.email?.toLowerCase() || "";

    return (
      id.includes(search) || name.includes(search) || email.includes(search)
    );
  });

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
          return <span>{new Date(createdAt).toLocaleDateString()}</span>;
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
                {store.emailVerified ? "Approve" : "Pending"}
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
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <FilterIcon className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </header>

      {/* Table Section */}
      <main className="mt-6">
        <TableProvider data={filteredCustomers} columns={columns}>
          {() => <TableComponent isLoading={isLoading} />}
        </TableProvider>
      </main>
    </Box>
  );
}

export default StoreManagement;
