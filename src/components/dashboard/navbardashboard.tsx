import { Bell, Settings, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Box } from "../ui/box";
import icon from "/icons/logo_icon.png";
import waveIcon from "/icons/wave_icon.svg";
import { authClient } from "../../providers/user.provider";
import { useNotificationContext } from "@/providers/notification.provider";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";

interface NavbarDashboardProps {
  userType: "admin" | "user";
}

export const NavbarDashboard = ({ userType }: NavbarDashboardProps) => {
  const { data: session } = authClient.useSession();
  const { unreadCount } = useNotificationContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const welcomeMessage =
    userType === "admin"
      ? "Welcome to, Admin Panel"
      : "Welcome to the Dashboard";

  const allowedPaths = [
    "/user/customer-management",
    "/admin/customer-management",
    "/admin/store-management",
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (allowedPaths.includes(location.pathname)) {
        navigate(
          `${location.pathname}?search=${encodeURIComponent(searchValue)}`,
          {
            replace: true,
          }
        );
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue, location.pathname, navigate]);

  return (
    <header className="flex items-center justify-between rounded-xl bg-card p-4 shadow-sm bg-white max-sm:flex-col max-sm:items-start max-sm:space-y-3 ">
      <div>
        <Box className="flex gap-x-2 items-center">
          <h1 className="text-lg font-semibold">{welcomeMessage}</h1>
          <img src={waveIcon} alt="wave-icon" className="w-6 h-6" />
        </Box>
        <p className="text-xs text-muted-foreground">{session?.user.email}</p>
      </div>

      {allowedPaths.includes(location.pathname) && (
        <div className="relative w-full max-w-lg mx-4 max-sm:mx-1">
          <Search
            className="absolute text-web-grey left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 py-5 max-sm:py-3 max-sm:text-xs bg-transparent border-web-grey rounded-full focus:border-blue-500 focus:bg-white "
          />
        </div>
      )}

      {/* Right side: Action Icons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
          className="bg-gray-100 rounded-full p-2 cursor-pointer"
          onClick={() => {
            if (userType === "admin") {
              navigate("/admin/settings");
            } else {
              navigate("/user/settings");
            }
          }}
        >
          <Settings className="size-5" />
        </Button>

        {userType === "user" && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="bg-gray-100 rounded-full p-2 relative"
          >
            <Link to="/user/notification">
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              )}
            </Link>
          </Button>
        )}

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
