import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/dashboard/app-sidebar";
import { NavbarDashboard } from "../components/dashboard/navbardashboard";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  const userType = pathname.startsWith("/admin") ? "admin" : "user";

  return (
    <SidebarProvider>
      <AppSidebar role={userType} />
      <div className="flex flex-1 flex-col p-4 bg-web-grey overflow-x-hidden">
        <header className="flex items-center justify-between">
          <SidebarTrigger />
        </header>

        <NavbarDashboard userType={userType} />

        <main className="mt-4 flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
