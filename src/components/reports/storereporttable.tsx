import { useGenerateReportMutation } from "@/hooks/reports/usefetchstoreactivity";
import { useFetchFlaggedCustomerAndStore } from "@/hooks/shopifycustomers/usefetchflaggedcustomer";
import { cn } from "@/lib/utils";
import { TableProvider } from "@/providers/table.provider";
import type { CustomerEntry, StoreEntry } from "@/types/storereport.t";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { checkBoxProps, SortedHeader, TableComponent } from "../common/tablecomponent";
import { Spinner } from "../ui/spinner";
import { RiskLevelIndicator } from "./risklevelindicator";
import { Checkbox } from "@/components/ui/checkbox";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useFetchStoreActivityReport } from "./storeactivity";


export const StoreReportTable = () => {
  const [activeTab, setActiveTab] = React.useState("customers");
  const { data, isLoading } = useFetchFlaggedCustomerAndStore();
  const { data: storeActivityData } = useFetchStoreActivityReport();

  const isCustomerView = activeTab === "customers";

  const customerData: CustomerEntry[] =
    data?.flaggedCustomers?.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      riskLevel: c.riskLevel,
      totalriskReports: c.totalRiskReport ?? 0,
      createdAt: c.createdAt ?? new Date().toISOString(),
    })) ?? [];

  const storeData: StoreEntry[] =
    storeActivityData?.map((s) => ({

      id: s.storeId,
      storeName: s.storeName,
      email: s.email || "N/A",

      apiKey: s.apiKey || "N/A",

      searchesPerformed: s.searchesPerformed,
      ordersFlagged: s.ordersFlagged,
      ordersReviewed: s.ordersReviewed,
      ordersAutoCancelled: s.ordersAutoCancelled,
      lastLoginDate: s.lastLoginDate,

    })) ?? [];
console.log("storeData", storeData)
  const { mutate: generateReport, isPending } = useGenerateReportMutation();

  const handleDownloadStoreReport = () => {
    generateReport({
      fileName: `Store_Activity_Report_${new Date().toISOString().split("T")[0]
        }.pdf`,
      url: "/reports/store-activity-report",
    });
  };

  const handleDownloadCustomerReport = () => {
    generateReport({
      fileName: `Customer_Report_${new Date().toISOString().split("T")[0]}.pdf`,
      url: "/reports/customer-report",
    });
  };

  const customerColumns: ColumnDef<CustomerEntry>[] = [
    {
      id: "select",
      header: (info) => <Checkbox {...checkBoxProps(info)} />,
      cell: (info) => <Checkbox {...checkBoxProps(info)} />,
    },
    {
      accessorKey: "id",
      header: (info) => <SortedHeader header={info.header} label="User ID" />,
    },
    {
      accessorKey: "name",
      header: (info) => <SortedHeader header={info.header} label="Name" />,
    },
    {
      accessorKey: "email",
      header: (info) => <SortedHeader header={info.header} label="Email" />,
    },
    {
      accessorKey: "riskLevel",
      header: "Risk Level",
      cell: ({ row }) => <RiskLevelIndicator level={row.original.riskLevel} />,
    },
    {
      accessorKey: "totalriskReports",
      header: (info) => (
        <SortedHeader header={info.header} label="Total risk Reports" />
      ),
    },
  ];

  const storeColumns: ColumnDef<StoreEntry>[] = [
    {
      id: "select",
      header: (info) => <Checkbox {...checkBoxProps(info)} />,
      cell: (info) => <Checkbox {...checkBoxProps(info)} />,
    },
    {
      accessorKey: "id",
      header: (info) => <SortedHeader header={info.header} label="Store ID" />,
      cell: ({ row }) => <span>{String(row.original.id).slice(0, 8)}</span>,
      size: 80,
    },
    {
      accessorKey: "storeName",
      header: (info) => (
        <SortedHeader header={info.header} label="Store Name" />
      ),
    },
    {
      accessorKey: "email",
      header: (info) => <SortedHeader header={info.header} label="Email" />,
    },
    {
      accessorKey: "apiKey",
      header: (info) => <SortedHeader header={info.header} label="API Key" />,
    },
    {
      accessorKey: "ordersFlagged", // Key Metric 2 (Part 1)
      header: (info) => (
        <SortedHeader header={info.header} label="Orders Flagged" />
      ),
      size: 100,
    },
    {
      accessorKey: "ordersReviewed", // Key Metric 2 (Part 2)
      header: (info) => (
        <SortedHeader header={info.header} label="Orders Reviewed" />
      ),
      size: 100,
    },

    {
      accessorKey: "lastLoginDate", // Key Metric 3
      header: (info) => (
        <SortedHeader header={info.header} label="Last Login Date" />
      ),
      size: 150,
    },
  ]

  return (
    <Box className="mt-6">
      <Box className="flex flex-wrap items-center justify-between gap-4 px-5 ">
        <Box className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          <Button
            size="sm"
            onClick={() => setActiveTab("customers")}
            variant={activeTab === "customers" ? "default" : "ghost"}
            className={cn(
              activeTab === "customers"
                ? "bg-white text-slate-700 shadow-sm hover:bg-white"
                : "text-slate-600 hover:bg-slate-200"
            )}
          >
            Flagged Customers
          </Button>
          <Button
            size="sm"
            onClick={() => setActiveTab("stores")}
            variant={activeTab === "stores" ? "default" : "ghost"}
            className={cn(
              activeTab === "stores"
                ? "bg-white text-slate-700 shadow-sm hover:bg-white"
                : "text-slate-600 hover:bg-slate-200"
            )}
          >
            Stores
          </Button>
        </Box>
        <Box className="flex items-center gap-2">
          {isCustomerView ? (
            <Button
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleDownloadCustomerReport}
            >
              {isPending ? <Spinner /> : <Download className="mr-2 h-4 w-4" />}{" "}
              Download
            </Button>
          ) : (
            <Button
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleDownloadStoreReport}
            >
              {isPending ? <Spinner /> : <Download className="mr-2 h-4 w-4" />}{" "}
              Download
            </Button>
          )}
        </Box>
      </Box>

      <Box className="mt-4">
        {isCustomerView ? (
          <TableProvider data={customerData} columns={customerColumns}>
            {() => <TableComponent isLoading={isLoading} />}
          </TableProvider>
        ) : (
          <TableProvider data={storeData} columns={storeColumns}>
            {() => <TableComponent isLoading={isLoading} />}
          </TableProvider>
        )}
      </Box>
    </Box>
  );
}
