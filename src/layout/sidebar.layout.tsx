import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/dashboard/app-sidebar";
import { NavbarDashboard } from "../components/dashboard/navbardashboard"; // 1. Import the Navbar
import { useLocation } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  const userType = pathname.startsWith("/admin") ? "admin" : "user";

  const userEmail =
    userType === "admin" ? "admin@example.com" : "user@example.com";

  return (
    <SidebarProvider>
      <AppSidebar role={userType} />
      {/* The main content area */}
      <div className="flex flex-1 flex-col p-4 bg-web-grey overflow-x-hidden">
        {/* 2. Add the Navbar here */}
        <header className="flex items-center justify-between">
          <SidebarTrigger />
          {/* You can add breadcrumbs or other elements here if needed */}
        </header>

        <NavbarDashboard userType={userType} userEmail={userEmail} />

        {/* 3. The rest of your page content */}
        <main className="mt-4 flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
