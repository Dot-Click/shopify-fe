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
import { TableProvider } from "../providers/table.provider";
import {
  TableComponent,
  SortedHeader,
  checkBoxProps,
} from "../components/common/tablecomponent";
import { cn } from "../lib/utils";
import { useFetchAllCustomers } from "../hooks/shopifycustomers/usefetchcustomers";
import type { Customer } from "../hooks/shopifycustomers/usefetchcustomers";

function OrderManagement() {
  // const users: User[] = [
  //   {
  //     id: "1001",
  //     name: "Emma Johnson",
  //     email: "emma.j@gmail.com",
  //     contactNumber: "+1 202 555 0121",
  //     ipAddress: "192.168.1.100",
  //     riskLevel: 45,
  //   },
  //   {
  //     id: "1002",
  //     name: "Daniel Smith",
  //     email: "dan.smith@outlook.com",
  //     contactNumber: "+44 7700 900456",
  //     ipAddress: "192.168.1.100",
  //     riskLevel: 98,
  //   },
  //   {
  //     id: "1003",
  //     name: "William Davis",
  //     email: "willd@gmail.com",
  //     contactNumber: "+44 7700 909888",
  //     ipAddress: "192.168.1.100",
  //     riskLevel: 22,
  //   },
  //   {
  //     id: "1004",
  //     name: "Liam Taylor",
  //     email: "liamtaylor@gmail.com",
  //     contactNumber: "+44 7500 778899",
  //     ipAddress: "192.168.1.100",
  //     riskLevel: 55,
  //   },
  //   {
  //     id: "1005",
  //     name: "Isabella Anderson",
  //     email: "isa.anderson@yahoo.com",
  //     contactNumber: "+1 917 345 6780",
  //     ipAddress: "192.168.1.100",
  //     riskLevel: 80,
  //   },
  //   {
  //     id: "1006",
  //     name: "Benjamin Thomas",
  //     email: "ben.thomas@gmail.com",
  //     contactNumber: "+1 202 555 0121",
  //     ipAddress: "192.168.1.100",
  //     riskLevel: 30,
  //   },
  // ];

  const { data: customers, isLoading: isLoadingCustomers } =
    useFetchAllCustomers();

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
    },
    {
      accessorKey: "displayName",
      header: (info) => <SortedHeader header={info.header} label="Name" />,
    },
    {
      accessorKey: "email",
      header: (info) => <SortedHeader header={info.header} label="Email" />,
    },
    // { accessorKey: "contactN", header: "Contact Number" },
    { accessorKey: "ipAddress", header: "IP Address" },
    {
      accessorKey: "riskLevel",
      header: "Risk Level",
      cell: ({ row }) => <RiskLevelIndicator level={row.original.riskLevel} />,
    },
    // Actions column
    // {
    //   id: "actions",
    //   cell: ({ row }) => (
    //     <Dialog>
    //       <DialogTrigger asChild>
    //         <Button
    //           variant="outline"
    //           size="sm"
    //           className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white py-5"
    //         >
    //           <Eye className="mr-2 h-4 w-4" /> View Detail
    //         </Button>
    //       </DialogTrigger>
    //       {/* The DialogContent is our custom modal, receiving the user data for this row */}
    //       <ReportSummaryModal user={row.original} />
    //     </Dialog>
    //   ),
    // },
  ];

  return (
    <>
      <Box className="rounded-xl bg-white shadow-sm">
        {/* Page Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 pt-5 px-7">
          <h1 className="text-2xl font-semibold text-slate-800  ">
            Order Management
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
          <TableProvider data={customers || []} columns={columns}>
            {() => <TableComponent isLoading={isLoadingCustomers} />}
          </TableProvider>
        </main>
      </Box>
    </>
  );
}

export default OrderManagement;
