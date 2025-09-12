import { Bell, Settings, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Box } from "../ui/box";
import icon from "/icons/logo_icon.png";
import waveIcon from "/icons/wave_icon.svg";
import { authClient } from "../../providers/user.provider";

interface NavbarDashboardProps {
  userType: "admin" | "user";
}

export const NavbarDashboard = ({ userType }: NavbarDashboardProps) => {
  const { data: session } = authClient.useSession();

  const welcomeMessage =
    userType === "admin"
      ? "Welcome to, Admin Panel"
      : "Welcome to the Dashboard";

  return (
    <header className="flex items-center justify-between rounded-xl bg-card p-4 shadow-sm bg-white">
      <div>
        <Box className="flex gap-x-2 items-center">
          <h1 className="text-xl font-semibold">{welcomeMessage}</h1>
          <img src={waveIcon} alt="wave-icon" className="w-6 h-6" />
        </Box>
        <p className="text-sm text-muted-foreground">{session?.user.email}</p>
      </div>

      {/* {userType === "user" && ( */}
      <div className="relative w-full max-w-lg mx-4">
        <Search
          className="absolute text-web-grey left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={20}
        />
        <Input
          placeholder="Search user by ID"
          className="w-full pl-10 py-5 bg-transparent border-web-grey rounded-full  focus:border-blue-500 focus:bg-white"
        />
      </div>
      {/* )} */}

      {/* Right side: Action Icons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
          className="bg-gray-100 rounded-full p-2"
        >
          <Settings className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="bg-gray-100 rounded-full p-2"
        >
          <Bell className="size-5" />
        </Button>
        <Button
          size="icon"
          aria-label="App"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full"
        >
          <img src={icon} alt="Company Logo Icon" className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
};
