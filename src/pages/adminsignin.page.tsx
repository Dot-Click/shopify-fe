import AdminSiginImage from "/images/admin_sigin_page.png";
import logo from "/images/logo.png";
import { Link } from "react-router-dom";
import { AdminSigninForm } from "../components/authform/adminsigin.form";
import { Box } from "@/components/ui/box";

export const AdminSignin = () => {
  return (
    <Box className="flex h-screen w-full bg-white">
      {/* Left Column: Contains logo, form, and footer */}
      <Box className="flex w-full flex-col p-10 lg:w-4/5">
        <Box>
          <img src={logo} alt="eComProtect Logo" className="h-14" />
        </Box>
        <Box className="flex flex-grow items-center justify-center">
          <Box className="w-full">
            <AdminSigninForm />
          </Box>
        </Box>

        {/* Bottom: Footer */}
        <footer className="w-full">
          <Box className="flex items-center justify-between text-sm text-gray-500">
            <p>© {new Date().getFullYear()} eComProtect. All rights reserved.</p>
            <Box className="space-x-6">
              <Link to="" className="hover:underline">
                Privacy Policy
              </Link>
              <Link to="" className="hover:underline">
                Terms of Service
              </Link>
            </Box>
          </Box>
        </footer>
      </Box>

      <Box className="hidden items-center justify-center bg-white p-2 lg:flex lg:w-2/5">
        <img
          src={AdminSiginImage}
          alt="A seamless way to manage your profile"
          className="h-full w-full "
        />
      </Box>
    </Box>
  );
};
