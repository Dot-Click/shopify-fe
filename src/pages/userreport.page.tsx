import { LossPreventionDashboard } from "@/components/reports/lossprevention";
import { HighRiskCustomerList } from "@/components/reports/riskycustomer";
import { SuspiciousOrdersReport } from "@/components/reports/suspiciousorder";
import { AdditionalConfiguration } from "@/components/reports/additionalconfiguration";
import { Box } from "@/components/ui/box";
import { Separator } from "@/components/ui/separator";

function UserReport() {
  return (
    <>
      <Box className="bg-white p-8">
        <SuspiciousOrdersReport />

        <Separator className="bg-web-checkbox-grey mb-5" />

        <LossPreventionDashboard />

        <Separator className="bg-web-checkbox-grey mb-5" />

        <HighRiskCustomerList />

        <Separator className="bg-web-checkbox-grey mb-5 mt-8" />

        <AdditionalConfiguration />
      </Box>
    </>
  );
}

export default UserReport;
