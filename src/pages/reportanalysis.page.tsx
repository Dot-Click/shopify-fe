import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useGenerateReportMutation } from "@/hooks/reports/usefetchstoreactivity";
import { StoreGrowthDashboard } from "@/components/reports/dbgrowth";
import { ReportOverviewChart } from "@/components/reports/storeoverview";
import { StoreReportTable } from "@/components/reports/storereporttable";

export default function ReportAnalysis() {
  const { mutate, isPending } = useGenerateReportMutation();

  return (
    <Box className="bg-white pt-10 rounded-xl">
      <header className="flex justify-between px-5 mb-4">
        <h1 className="text-2xl font-bold">Report & Analytics</h1>

        <div className="flex bg-blue-600 hover:bg-blue-700 text-white  rounded-md">
          <Button 
          
          onClick={() => mutate({
            fileName: `Combined_Report_${new Date().toISOString().split("T")[0]}.pdf`,
            url: "/reports/combined-report",
          })}>
            {isPending ? <Spinner /> : "Export Data"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black border border-gray-200">
              <DropdownMenuItem className="border-b border-gray-200 hover:bg-gray-300 cursor-pointer">PDF</DropdownMenuItem>
              <DropdownMenuItem className="border-b border-gray-200 hover:bg-gray-300 cursor-pointer">CSV</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-300 cursor-pointer">Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <StoreGrowthDashboard />

      <ReportOverviewChart />

      <StoreReportTable />
    </Box>
  );
}
