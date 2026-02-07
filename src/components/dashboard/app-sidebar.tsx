import {
  AlertCircle,
  ChevronDown,
  Globe,
  LayoutGrid,
  Loader2, // New: For loading spinner on logout
  PackagePlus,
  Paperclip,
  Settings,
  Store,
  TrendingUp,
  UserCheck,
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
import React, { useState } from "react"; // New: useState imported

interface MenuItem {
  title: string;
  url: string;
  icon: any;
  subItems?: MenuItem[];
}

interface AppSidebarProps {
  role: "admin" | "user";
}

export function AppSidebar({ role }: AppSidebarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // --- New State for Logout Loading ---
  const [isLoading, setIsLoading] = useState(false);
  // --- New State for Dropdown Control ---
  const [openDropdown, setOpenDropdown] = useState(""); // Stores the title of the currently open dropdown

  const adminMainMenuItems: MenuItem[] = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutGrid },
    {
      title: "Customer Management",
      url: "/admin/customer-management",
      icon: Users,
    },
    { title: "Store Management", url: "/admin/store-management", icon: Store },
  ];

  const adminSecondaryMenuItems: MenuItem[] = [
    {
      title: "Create Store",
      url: "/admin/create-store",
      icon: PackagePlus,
    },
    {
      title: "Report & Analytics",
      url: "/admin/report-analysis",
      icon: AlertCircle,
      subItems: [
        {
          title: "Wide Network Report",
          url: "/admin/wide-network-report",
          icon: Globe, // Icon for Wide Network
        },
        {
          title: "Onboarding Report",
          url: "/admin/onboarding-report",
          icon: UserCheck, // Icon for Onboarding
        },
        {
          title: "System Effectiveness", // Shortened title
          url: "/admin/effectiveness-report",
          icon: TrendingUp, // Icon for System Effectiveness
        },
      ],
    },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  const userMenuItems: MenuItem[] = [
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

  const userSecondaryMenuItems: MenuItem[] = [
    { title: "Report", url: "/user/report", icon: Paperclip },
    { title: "Settings", url: "/user/settings", icon: Settings },
  ];

  const { state } = useSidebar();

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      const hasSubItems = !!item.subItems;
      const isActivePath = pathname === item.url;
      const isSubItemActive = item.subItems?.some(
        (subItem) => pathname === subItem.url
      );
      // Item is active if its path or any sub-item's path matches the current location
      const isParentActive = isActivePath || isSubItemActive;

      // Dropdown open control: Only the one matching the state should be open
      const isDropdownOpen = hasSubItems && openDropdown === item.title;

      const Icon = item.icon;

      // Handle click for dropdown toggle
      const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (hasSubItems && state === "expanded") {
          e.preventDefault(); // Prevent navigating to the parent URL
          // Toggle the dropdown state
          setOpenDropdown(isDropdownOpen ? "" : item.title);
        }
      };

      return (
        <React.Fragment key={item.title}>
          <SidebarMenuItem
            // For Collapsed State: Use relative/group for hover dropdown
            className={`relative ${
              hasSubItems && state !== "expanded" ? "group" : ""
            }`}
          >
            <SidebarMenuButton
              asChild
              isActive={isParentActive}
              className={`hover:bg-gray-300 hover:text-black flex items-center gap-3 
            ${isParentActive ? "bg-white !text-black" : "text-white"}`}
            >
              <Link to={item.url} className="flex gap-3 w-full" onClick={handleItemClick}>
                <Icon className="size-4 shrink-0" />
                <span className="block md:hidden ">{item.title}</span>
                {state === "expanded" && (
                  <>
                    <span className="hidden md:block flex-1 text-left">
                      {item.title}
                    </span>
                    {/* Add Chevron for toggle when expanded and has sub-items */}
                    {hasSubItems && (
                      <ChevronDown
                        className={`size-4 shrink-0 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </Link>
            </SidebarMenuButton>

            {/* Sub-Items for EXPANDED Sidebar (Toggle based on openDropdown state) */}
            {hasSubItems && isDropdownOpen && state === "expanded" && (
              <div className="pl-6 border-l border-blue-600 ml-4 py-1">
                {item.subItems!.map((subItem) => {
                  const isSubActive = pathname === subItem.url;
                  const SubIcon = subItem.icon;
                  return (
                    <SidebarMenuItem key={subItem.title} className="!p-0">
                      <SidebarMenuButton
                        asChild
                        isActive={isSubActive}
                        className={`hover:bg-blue-800 flex items-center gap-3 w-full justify-start !text-sm 
                          ${
                            isSubActive
                              ? "bg-white !text-black"
                              : "text-white"
                          }`}
                      >
                        <Link to={subItem.url} className="flex gap-3 !py-2">
                          <SubIcon className="size-4 shrink-0" />
                          <span className="hidden md:block">
                            {subItem.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </div>
            )}

            {/* Sub-Items for COLLAPSED Sidebar (Appears on hover) */}
            {hasSubItems && state !== "expanded" && (
              <div
                className="absolute left-full top-0 ml-1 py-1 px-2 z-10 
                           bg-[#1E40AF] rounded shadow-lg hidden group-hover:block w-56"
              >
                <div className="text-white font-semibold py-1 px-3 border-b border-blue-600 mb-1">
                  {item.title}
                </div>
                {item.subItems!.map((subItem) => {
                  const isSubActive = pathname === subItem.url;
                  const SubIcon = subItem.icon;
                  return (
                    <SidebarMenuItem key={subItem.title} className="!p-0">
                      <SidebarMenuButton
                        asChild
                        isActive={isSubActive}
                        className={`hover:bg-blue-800 flex items-center gap-3 w-full justify-start !text-sm !py-2 !px-3
                          ${
                            isSubActive
                              ? "bg-white !text-black"
                              : "text-white"
                          }`}
                      >
                        <Link to={subItem.url} className="flex gap-3 w-full">
                          <SubIcon className="size-4 shrink-0" />
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </div>
            )}
          </SidebarMenuItem>
        </React.Fragment>
      );
    });
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Assuming authClient.signOut is async and handles the actual sign out
      await authClient.signOut();

      // Added a small delay to make the loading state noticeable
      await new Promise(resolve => setTimeout(resolve, 500)); 

      if (role === "admin") {
        navigate("/admin-signin");
      } else {
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error logging out:", error);
      setIsLoading(false); // Only set to false on error, as navigation happens on success
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
              className="bg-linear-to-r from-web-dark-red to-web-light-red py-5 cursor-pointer mb-4 text-white hover:bg-red-500 disabled:opacity-50"
              onClick={handleLogout}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <Loader2 className="animate-spin size-4" /> // Show spinner when loading
              ) : (
                <IoMdLogOut />
              )}
              {state === "expanded" && (
                <span>{isLoading ? "Logging out..." : "Logout"}</span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}