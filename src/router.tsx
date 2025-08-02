import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/signup.page";
import { Signin } from "./pages/signin.page";
import { Home } from "./pages/home.page";
import Dashboard from "./pages/dashboard.page";
import Layout from "./layout/sidebar.layout";
import UserManagement from "./pages/usermanagemeent.page";
import StoreManagement from "./pages/storemanagement.page";
import ReportAnalysis from "./pages/reportanalysis.page";
import { Settings } from "./pages/settings.page";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path="/signin" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Home />} path="/" />

        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<UserManagement />} path="/user-management" />
          <Route element={<StoreManagement />} path="/store-management" />
          <Route element={<ReportAnalysis />} path="/report-analysis" />
          <Route element={<Settings />} path="/settings" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
