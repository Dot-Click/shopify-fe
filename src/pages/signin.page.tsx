import SiginImage from "/images/sigin_page.png";
import logo from "/images/logo.png";
import { Link } from "react-router-dom";
import { SigninForm } from "../components/authform/signin.form";

export const Signin = () => {
  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Column: Contains logo, form, and footer */}
      <div className="flex w-full flex-col p-10 lg:w-4/5">
        <div>
          <img src={logo} alt="eComProtect Logo" className="h-14" />
        </div>
        <div className="flex flex-grow items-center justify-center">
          <div className="w-full max-w-md">
            <SigninForm />
          </div>
        </div>

        {/* Bottom: Footer */}
        <footer className="w-full">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>© 2025 eComProtect. All rights reserved.</p>
            <div className="space-x-6">
              <Link to="" className="hover:underline">
                Privacy Policy
              </Link>
              <Link to="" className="hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </div>

      <div className="hidden items-center justify-center bg-white p-2 lg:flex lg:w-2/5">
        <img
          src={SiginImage}
          alt="A seamless way to manage your profile"
          className="h-full w-full "
        />
      </div>
    </div>
  );
};
