import { Box } from "../ui/box";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  FaShopify,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import footerImage from "/images/footer_image.png";
import logo from "/images/logo_white.png";

export const Footer = () => {
  return (
    <Box className="relative w-full text-white">
      {/* Background Image Layer */}
      <Box
        className="absolute inset-0 z-0 bg-cover   bg-no-repeat"
        style={{ backgroundImage: `url(${footerImage})` }}
        aria-hidden="true"
      />

      {/* Main Footer Content */}
      <Box className="relative z-10 container mx-auto px-22 pt-48">
        {/* CTA Section */}
        <Box className="mx-auto max-w-2xl text-center pb-24">
          <h2 className="text-4xl font-bold">
            <span className="bg-[#141E20] text-[#28A745] px-3 py-1">
              Ready to
            </span>{" "}
            Protect Your Store?
          </h2>
          <p className="mt-4 text-lg text-gray-200">
            Join the growing network of Shopify merchants using{" "}
            <b>eComProtect</b> to fight back against risk in real-time.
          </p>
          <Button className="mt-8 rounded-full bg-[#28A745] px-6 py-6 text-base font-semibold text-white hover:bg-[#298d5c]">
            <Link to="/install" className="flex items-center">
              <FaShopify className="mr-2 h-5 w-5" />
              Install on Shopify
            </Link>
          </Button>
        </Box>

        {/* Footer Links Grid */}
        <Box className="grid grid-cols-1 gap-y-10 gap-x-8 pt-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-x-12">
          <div className="space-y-4 lg:col-span-2">
            <img src={logo} alt="eComProtect Logo" className="h-9" />
            <p className="text-gray-300 pr-22">
              <b>
                e<span className="font-normal">Com</span>Protect
              </b>{" "}
              is a smart risk prevention platform for Shopify merchants,
              designed to flag repeat offenders and protect your store in real
              time.
            </p>
          </div>

          {/* Column 2: Quick Links (takes 1 of 5 columns) */}
          <div className="space-y-4">
            <h3 className="font-bold">Quick links</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link to="/home" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Talk to Our Team (takes 1 of 5 columns) */}
          <div className="space-y-4">
            <h3 className="font-bold">Talk to Our Team</h3>
            <div className="space-y-3 text-gray-300">
              <p>
                Need help? Call us at
                <span className="flex items-center gap-2 text-sm">
                  <FaPhoneAlt /> 855-987-6543
                </span>
              </p>
              <p>We're here to support you — in your preferred language.</p>
            </div>
          </div>

          {/* Column 4: Follow Us (takes 1 of 5 columns) */}
          <div className="space-y-4">
            <h3 className="font-bold">Follow Us:</h3>
            <div className="flex space-x-4">
              <Link to="#" className="hover:text-white">
                <FaFacebookF />
              </Link>
              <Link to="#" className="hover:text-white">
                <FaInstagram />
              </Link>
              <Link to="#" className="hover:text-white">
                <FaLinkedinIn />
              </Link>
              <Link to="#" className="hover:text-white">
                <FaXTwitter />
              </Link>
            </div>
          </div>
        </Box>

        {/* Sub-Footer */}
        <Box className="mt-8 border-t border-gray-300 pt-8 pb-8 text-center text-sm text-white sm:flex sm:justify-between">
          <p>© 2025 eComProtect. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </Box>
      </Box>
    </Box>
  );
};
