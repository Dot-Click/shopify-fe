import { useEffect, useState } from "react";
import { IncidentsBarChart } from "../components/dashboard/bar-chart";
import { OverviewSection } from "../components/dashboard/overview";
import { FlaggedReasonsChart } from "../components/dashboard/pie-chart";
import { RecentActivitySection } from "../components/dashboard/recentactivity";
import { Box } from "../components/ui/box";
import { WelcomeModal } from "../components/common/initialmodal";

const WELCOME_MODAL_SEEN_KEY = "eComProtect_welcome_modal_seen";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 2. Check localStorage when the component mounts
    const hasSeenModal = localStorage.getItem(WELCOME_MODAL_SEEN_KEY);

    // If the key doesn't exist in localStorage, show the modal
    if (!hasSeenModal) {
      setIsModalOpen(true);
    }
  }, []); // The empty array ensures this effect runs only once

  // 3. Create a handler that sets the flag in localStorage before closing the modal
  const handleCloseModal = () => {
    localStorage.setItem(WELCOME_MODAL_SEEN_KEY, "true");
    setIsModalOpen(false);
  };

  return (
    <Box>
      <WelcomeModal isOpen={isModalOpen} onClose={handleCloseModal} />

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
