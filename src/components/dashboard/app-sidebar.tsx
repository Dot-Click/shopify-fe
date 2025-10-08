import {
  AlertCircle,
  LayoutGrid,
  PackagePlus,
  Paperclip,
  Settings,
  Store,
  Users,
} from "lucide-react";
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
  useSidebar,
} from "../../components/ui/sidebar";
import logo from "/images/logo_white.png";
import { IoMdLogOut } from "react-icons/io";
import { PiDotsNineBold } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { authClient } from "../../providers/user.provider";
import { toast } from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa6";
import whiteLogo from "/icons/logo_icon.png";

interface AppSidebarProps {
  role: "admin" | "user";
}

export function AppSidebar({ role }: AppSidebarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const adminMainMenuItems = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutGrid },
    {
      title: "Customer Management",
      url: "/admin/customer-management",
      icon: Users,
    },
    { title: "Store Management", url: "/admin/store-management", icon: Store },
  ];

  const adminSecondaryMenuItems = [
    {
      title: "Create Store",
      url: "/admin/create-store",
      icon: PackagePlus,
    },
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
    {
      title: "Create Staff",
      url: "/user/create-staff",
      icon: FaUserPlus,
    },
    { title: "Notification", url: "/user/notification", icon: FaBell },
  ];

  const userSecondaryMenuItems = [
    { title: "Report", url: "/user/report", icon: Paperclip },
    { title: "Settings", url: "/user/settings", icon: Settings },
  ];

  const { state } = useSidebar();

  const renderMenuItems = (items: typeof userMenuItems) => {
    return items.map((item) => {
      const isActive = pathname === item.url;
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={isActive}
            className={`hover:bg-blue-800 flex items-center gap-3 
            ${isActive ? "bg-white !text-black" : "text-white"}`}
          >
            <Link to={item.url} className="flex gap-3">
              <item.icon className="size-4 shrink-0" />
              <span className="block md:hidden ">{item.title}</span>
              {state === "expanded" && (
                <span className="hidden md:block">{item.title}</span>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      if (role === "admin") {
        navigate("/admin-signin");
      } else {
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error logging out:", error);
    }
  };

  return (
    <Sidebar collapsible="icon" className="bg-[#1E40AF] text-white ">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 mt-6">
          {state === "expanded" ? (
            <img src={logo} alt="eComProtect Logo" className="h-10" />
          ) : (
            <img src={whiteLogo} alt="eComProtect Logo Icon" className="h-4" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-auto">
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
          <>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-normal text-blue-300">
                Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>{renderMenuItems(userMenuItems)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-normal text-blue-300">
                <PiDotsNineBold />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {renderMenuItems(userSecondaryMenuItems)}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="bg-linear-to-r from-web-dark-red to-web-light-red py-5 cursor-pointer mb-4 text-white hover:bg-red-500"
              onClick={handleLogout}
            >
              <IoMdLogOut />
              {state === "expanded" && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
