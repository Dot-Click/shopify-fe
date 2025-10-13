import { Flex } from "@/components/ui/flex";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/providers/user.provider";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

type StaffProtectedRouteProps = {
  children: ReactNode;
};

export const AdminProtectedRoute = ({ children }: StaffProtectedRouteProps) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const session = await authClient.getSession();
      const userRole = session?.data?.user?.role;

      console.log("userRole", userRole);
      console.log("SESSION:-", session);

      setHasAccess(userRole === "superadmin");
    };

    checkSession();
  }, []);

  if (hasAccess === null) {
    return (
      <Flex className="w-full h-[100vh] justify-center items-center">
        <Spinner />
      </Flex>
    );
  }

  if (!hasAccess) {
    return <Navigate to="/admin-signin" replace />;
  }

  return <>{children}</>;
};

type PublicAdminRouteProps = {
  children: ReactNode;
};

export const PublicAdminRoute = ({ children }: PublicAdminRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const session = await authClient.getSession();
      const userRole = session?.data?.user?.role;

      setIsAuthenticated(userRole === "user" || userRole === "sub-admin");
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return (
      <Flex className="w-full h-[100vh] justify-center items-center">
        <Spinner />
      </Flex>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
