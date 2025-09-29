import { LossPreventionDashboard } from "@/components/reportcharts/lossprevention";
import { SuspiciousOrdersReport } from "@/components/reportcharts/suspiciousorder";
import { Box } from "@/components/ui/box";
import { Separator } from "@/components/ui/separator";

function UserReport() {
  return (
    <>
      <Box className="bg-white p-8">
        <SuspiciousOrdersReport />
        <Separator className="bg-web-checkbox-grey mb-5" />
        <LossPreventionDashboard />
      </Box>
    </>
  );
}

export default UserReport;
