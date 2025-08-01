import { Bell, Settings } from "lucide-react";
import { Button } from "../ui/button"; // Assuming standard ShadCN button path
import icon from "/icons/logo_icon.png";
import waveIcon from "/icons/wave_icon.svg";
import { Box } from "../ui/box";

export const NavbarDashboard = () => {
  return (
    <header className="flex items-center justify-between rounded-xl bg-card p-4 shadow-sm bg-white">
      {/* Left side: Welcome message */}
      <div>
        <Box className="flex gap-x-2">
          <h1 className="text-xl font-semibold">Welcome to, Admin Panel</h1>
          <img src={waveIcon} alt="wave-icon" className="w-6" />{" "}
        </Box>
        <p className="text-sm text-muted-foreground">
          willbettelhieim@gmail.com
        </p>
      </div>

      {/* Right side: Action Icons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
          className="bg-web-grey rounded-full p-2"
        >
          <Settings className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="bg-web-grey rounded-full p-2 "
        >
          <Bell className="size-5" />
        </Button>
        <Button
          size="icon"
          aria-label="App"
          className="bg-web-blue p-2 rounded-full"
        >
          <img src={icon} className="" />
        </Button>
      </div>
    </header>
  );
};
