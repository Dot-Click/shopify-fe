import { IncidentsBarChart } from "../components/dashboard/bar-chart";
import { OverviewSection } from "../components/dashboard/overview";
import { FlaggedReasonsChart } from "../components/dashboard/pie-chart";
import { RecentActivitySection } from "../components/dashboard/recentactivity";
import { Box } from "../components/ui/box";

function Dashboard() {
  return (
    <Box>
      <OverviewSection />

      <Box className="mt-6 h-full grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Donut Chart */}
        <Box className="rounded-2xl lg:col-span-1">
          <FlaggedReasonsChart />
        </Box>

        {/* Bar Chart */}
        <Box className="rounded-2xl h-96 bg-white lg:col-span-3">
          <IncidentsBarChart />
        </Box>
      </Box>

      <RecentActivitySection />
    </Box>
  );
}

export default Dashboard;
