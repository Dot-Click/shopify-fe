import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Filter as FilterIcon } from "lucide-react";

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
} from "../components/common/tablecomponent"; // Adjust path if needed

export type Store = {
  id: string;
  storeName: string;
  email: string;
  apiKey: string;
};

const stores: Store[] = [
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
  { id: "1003", storeName: "Bata", email: "help@bata.com", apiKey: "zz5e3r1t" },
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
  {
    id: "1006",
    storeName: "Zara",
    email: "help@zara.com",
    apiKey: "api-hm77p",
  },
];

const columns: ColumnDef<Store>[] = [
  // Checkbox column
  {
    id: "select",
    header: (info) => <Checkbox {...checkBoxProps(info)} />,
    cell: (info) => <Checkbox {...checkBoxProps(info)} />,
    enableSorting: false,
  },
  // Data columns
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
];

function StoreManagement() {
  const [isLoading, _setIsLoading] = React.useState(false);

  return (
    <Box className="rounded-xl bg-white shadow-sm">
      {/* Page Header - Title Changed */}
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

      {/* Table Section - Provider now uses 'stores' data and new 'columns' */}
      <main className="mt-6">
        <TableProvider data={stores} columns={columns}>
          {() => <TableComponent isLoading={isLoading} />}
        </TableProvider>
      </main>
    </Box>
  );
}

export default StoreManagement;
