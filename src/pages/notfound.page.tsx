import { Box } from "../components/ui/box";
import logo from "/images/logo_white.png";

export function NotFoundPage() {
  return (
    <Box className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d47a1] to-[#002b5c] p-8 text-center text-white">
      {/* Background text element */}
      <Box
        aria-hidden="true"
        className="absolute inset-0 select-none text-[30rem] font-bold leading-none text-white/5"
      >
        404
      </Box>

      <Box className="relative z-10 flex flex-col items-center">
        {/* You can use your existing logo component here if you have one */}
        <Box className="mb-8 flex items-center space-x-3">
          <img src={logo} alt="" />
        </Box>

        <h1 className="text-6xl font-extrabold tracking-tight md:text-8xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-lg text-lg text-slate-300">
          Oops! It seems the page you are looking for has been moved or doesn't
          exist. Let's get you back on track.
        </p>
      </Box>
    </Box>
  );
}
