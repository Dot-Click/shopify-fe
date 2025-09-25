import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/signup.page";
import { Signin } from "./pages/signin.page";
import { Home } from "./pages/home.page";
import { Settings } from "./pages/settings.page";
import { NotFoundPage } from "./pages/notfound.page";
import { AdminSignin } from "./pages/adminsignin.page";
import { PlansPage } from "./pages/plan.page";
import { PostSignupFlowPage } from "./pages/signinflow.page";
import { UnderReviewComponent } from "./pages/underreview.page";
import Dashboard from "./pages/dashboard.page";
import Layout from "./layout/sidebar.layout";
import UserManagement from "./pages/usermanagemeent.page";
import StoreManagement from "./pages/storemanagement.page";
import ReportAnalysis from "./pages/reportanalysis.page";
import CustomerManagement from "./pages/customermanagement.page";
import NotificationsPage from "./pages/notification.page";
import OrderManagement from "./pages/ordermanagement.page";
import RiskSettings from "./pages/risksettings.page";
import CreateStaff from "./pages/staff.page";
import VerifyEmailPage from "./pages/acceptinvitation.page";
import { ForgotPasswordForm } from "./pages/forgotpassword.page";
import ResetPasswordPage from "./pages/reset.page";
import AcceptInvitation from "./pages/acceptinvitation.page";
import CreateStore from "./pages/createstores.page";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin-signin" element={<AdminSignin />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/select-plans" element={<PlansPage />} />
        <Route path="/post-signup" element={<PostSignupFlowPage />} />
        <Route path="/under-review" element={<UnderReviewComponent />} />
        <Route path="/accept-invite" element={<AcceptInvitation />} />

        {/* Protected Routes with Sidebar Layout */}
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route
            path="/admin/customer-management"
            element={<UserManagement />}
          />
          <Route path="/admin/store-management" element={<StoreManagement />} />
          <Route path="/admin/report-analysis" element={<ReportAnalysis />} />
          <Route path="/admin/create-store" element={<CreateStore />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route
            path="/user/customer-management"
            element={<CustomerManagement />}
          />
          <Route path="/user/notification" element={<NotificationsPage />} />
          <Route path="/user/settings" element={<RiskSettings />} />
          <Route path="/user/order-management" element={<OrderManagement />} />
          <Route path="/user/create-staff" element={<CreateStaff />} />
        </Route>

        {/* Top-level Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
