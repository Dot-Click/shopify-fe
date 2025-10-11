import { SignupForm } from "../components/authform/signup.form";
import SiginImage from "/images/sigin_page.png";
import logo from "/images/logo.png";
import { Link } from "react-router-dom";
import { Box } from "../components/ui/box";

export const Signup = () => {
  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Column: Contains logo, form, and footer */}
      <Box className="flex w-full flex-col p-8 lg:w-3/5">
        <Box className="mb-5">
          <Link to={"/"}>
            <img src={logo} alt="eComProtect Logo" className="h-10" />
          </Link>
        </Box>

        <div className="flex flex-grow items-center justify-center">
          <div className="w-full">
            <SignupForm />
          </div>
        </div>

        {/* Bottom: Footer */}
        <footer className="w-full mt-1 max-sm:mt-4">
          <div className="flex items-center justify-between text-sm text-gray-500 max-sm:flex-col max-sm:items-start max-sm:text-xs">
            <p>© 2025 eComProtect. All rights reserved.</p>
            <div className="space-x-6 max-sm:space-x-3">
              <Link to="" className="hover:underline">
                Privacy Policy
              </Link>
              <Link to="" className="hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </Box>

      <Box className="hidden items-center justify-center bg-white p-2 lg:flex lg:w-2/5">
        <img
          src={SiginImage}
          alt="A seamless way to manage your profile"
          className="h-full w-full "
        />
      </Box>
    </div>
  );
};
