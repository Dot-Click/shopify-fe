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

const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Users Management",
    url: "/user-management",
    icon: Users,
  },
  {
    title: "Store Management",
    url: "/store-management",
    icon: Store,
  },
];

const secondaryMenuItems = [
  {
    title: "Report & Analytics",
    url: "report-analysis",
    icon: AlertCircle,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar className="bg-[#1E40AF] text-white ">
      {/* Sidebar Header with Logo */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <img src={logo} />
        </div>
      </SidebarHeader>

      {/* Main Content with Menu */}
      <SidebarContent className="flex-1 overflow-auto">
        {/* First Menu Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-normal text-blue-300">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
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
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator - This is an implicit separation by using another group */}

        {/* Second Menu Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-2xl text-blue-300">
            <PiDotsNineBold />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="px-2">
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-blue-800"
                    isActive={pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with Logout Button */}
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="bg-[#F87171] py-5 mb-4 text-white hover:bg-red-500"
            >
              <a href="/logout">
                <IoMdLogOut />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
