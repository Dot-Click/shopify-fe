import { AlertCircle, LayoutGrid, Settings, Store, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";
import logo from "/images/logo_white.png";
import { IoMdLogOut } from "react-icons/io";
import { PiDotsNineBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa";

// --- Menu definitions ---

const adminMainMenuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutGrid },
  { title: "Users Management", url: "/admin/user-management", icon: Users },
  { title: "Store Management", url: "/admin/store-management", icon: Store },
];

const adminSecondaryMenuItems = [
  {
    title: "Report & Analytics",
    url: "/admin/report-analysis",
    icon: AlertCircle,
  },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const userMenuItems = [
  {
    title: "Customer Management",
    url: "/user/customer-management",
    icon: Users,
  },
  { title: "Notification", url: "/user/notification", icon: FaBell },
  { title: "Settings", url: "/user/settings", icon: Settings },
];

// Define the component's props
interface AppSidebarProps {
  role: "admin" | "user";
}

export function AppSidebar({ role }: AppSidebarProps) {
  const { pathname } = useLocation();

  const renderMenuItems = (items: typeof userMenuItems) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.title} className="px-2">
        <SidebarMenuButton
          asChild
          isActive={pathname === item.url}
          className="data-[active=true]:bg-white data-[active=true]:text-blue-800 hover:bg-blue-800"
        >
          <Link to={item.url}>
            <item.icon className="size-4" />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
  };

  return (
    <Sidebar className="bg-[#1E40AF] text-white ">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-4 mt-6">
          <img src={logo} alt="eComProtect Logo" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-auto">
        {/* === Conditional Rendering Based on Role === */}
        {role === "admin" ? (
          <>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-normal text-blue-300">
                Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>{renderMenuItems(adminMainMenuItems)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-2xl text-blue-300">
                <PiDotsNineBold />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {renderMenuItems(adminSecondaryMenuItems)}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 text-xs font-normal text-blue-300">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{renderMenuItems(userMenuItems)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="bg-linear-to-r from-web-dark-red to-web-light-red py-5 mb-4 text-white hover:bg-red-500"
            >
              <Link to="/signin">
                {" "}
                {/* Changed to /signin for a clean logout */}
                <IoMdLogOut />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
