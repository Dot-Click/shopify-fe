// layout/sidebar.layout.tsx

import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/dashboard/app-sidebar";
import { NavbarDashboard } from "../components/dashboard/navbardashboard"; // 1. Import the Navbar
import { useLocation } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  // Determine role based on URL. In a real app, this would come from an auth context.
  const role = pathname.startsWith("/admin") ? "admin" : "user";
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      {/* The main content area */}
      <div className="flex flex-1 flex-col p-4 bg-web-grey overflow-x-hidden">
        {/* 2. Add the Navbar here */}
        <header className="flex items-center justify-between">
          <SidebarTrigger />
          {/* You can add breadcrumbs or other elements here if needed */}
        </header>

        <NavbarDashboard />

        {/* 3. The rest of your page content */}
        <main className="mt-4 flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
