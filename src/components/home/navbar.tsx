import { Link } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Box } from "../../components/ui/box";
import whiteLogo from "/images/logo_white.png";

export const Navbar = () => {
  return (
    // Using Box as the main header element
    <Box className="absolute left-0 top-0 z-50 w-full text-white">
      <Box className="flex items-center justify-center p-6">
        <Box className="container flex items-center justify-between">
          {/* Left Side: Logo */}
          <Link to="/" className="flex items-center">
            <img src={whiteLogo} alt="eComProtect Logo" className="h-14" />
          </Link>

          {/* Middle: Navigation Links */}
          {/* Using Box as the nav element */}
          <Box className="hidden items-center space-x-10 md:flex">
            <Link to="/" className="text-md font-medium hover:text-gray-300">
              Home
            </Link>
            <Link to="/features" className="text-md  hover:text-gray-300">
              Features
            </Link>
            <Link to="/how-it-works" className="text-md  hover:text-gray-300">
              How It Works
            </Link>
          </Box>

          {/* Right Side: Action Buttons */}
          <Box className="hidden items-center space-x-4 md:flex">
            <Button
              variant="outline"
              className="rounded-full border-white bg-[rgba(255,255,255,0.2)] py-5 px-6  text-white hover:text-blue-700"
            >
              {/* This is a single child, so it's correct */}
              <Link to="/signin">Sign In</Link>
            </Button>

            <Button className="rounded-full bg-[#30A46C] text-white hover:bg-[#298d5c] py-5.5">
              {/* The <Link> component is the single child, solving the error */}
              <Link to="/install" className="flex items-center">
                <FaShopify className="mr-2 h-5 w-5" />
                Install on Shopify
              </Link>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
