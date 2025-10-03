import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "../../components/ui/button";
import { Box } from "../../components/ui/box";
import whiteLogo from "/images/logo_white.png";
import { motion, AnimatePresence, type Variants } from "framer-motion";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants: Variants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut", // TypeScript now knows this is a valid Easing type
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <Box className="absolute left-0 top-0 z-50 w-full text-white">
      <Box className="flex items-center justify-center p-6">
        <Box className="container relative px-16 max-sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center z-20">
            <img
              src={whiteLogo}
              alt="eComProtect Logo"
              className="h-14 md:h-12 max-sm:h-8"
            />
          </Link>

          <Box className="hidden items-center space-x-10 lg:text-sm md:flex md:text-xs md:space-x-7">
            <Link to="/" className="text-md font-medium hover:text-gray-300">
              Home
            </Link>
            <button
              onClick={() =>
                document.getElementById("how-it-works")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="text-md hover:text-gray-300"
            >
              Features
            </button>
            <button
              onClick={() =>
                document.getElementById("features")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="text-md hover:text-gray-300"
            >
              How It Works
            </button>
          </Box>

          <Box className="hidden items-center space-x-4 md:flex">
            <Button
              variant="outline"
              className="rounded-full border-white bg-[rgba(255,255,255,0.2)] py-5 px-6 text-white hover:text-blue-200"
            >
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button className="rounded-full bg-[#30A46C] text-white hover:bg-[#298d5c] py-5.5">
              <Link to="/install" className="flex items-center">
                <FaShopify className="mr-2 h-5 w-5" />
                Install on Shopify
              </Link>
            </Button>
          </Box>

          <Box className="md:hidden z-20">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </Box>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Backdrop with a fade effect */}
                <motion.div
                  variants={backdropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setIsMenuOpen(false)}
                  className="md:hidden fixed inset-0 bg-black/60 z-40"
                />

                {/* 4. Convert the menu Box to a motion.div and apply variants */}
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="md:hidden fixed top-0 right-0 w-4/5 max-w-sm h-full bg-gray-700/80 text-md backdrop-blur-xs  z-40 flex flex-col pt-12 items-end pr-12 space-y-8"
                >
                  <button>
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-gray-300"
                    >
                      Home
                    </Link>
                  </button>

                  <button
                    onClick={() => {
                      document
                        .getElementById("how-it-works")
                        ?.scrollIntoView({ behavior: "smooth" });
                      setIsMenuOpen(false);
                    }}
                    className="hover:text-gray-300"
                  >
                    Features
                  </button>

                  <button
                    onClick={() => {
                      document
                        .getElementById("features")
                        ?.scrollIntoView({ behavior: "smooth" });
                      setIsMenuOpen(false);
                    }}
                    className="hover:text-gray-300"
                  >
                    How It Works
                  </button>

                  <div className="pt-4 flex flex-col items-end space-y-6">
                    <Link
                      to="/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className="border-2 border-white text-sm rounded-full py-2 px-6"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/install"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center bg-[#30A46C] text-sm rounded-full py-3 px-6"
                    >
                      <FaShopify className="mr-2 h-5 w-5" />
                      Install on Shopify
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};
