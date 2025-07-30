import { Box } from "../ui/box";
import bgSection from "/images/bg_section.png";
import imageCard from "/images/image_card.png";

export const AheadSection = () => {
  return (
    <Box
      className="relative w-full bg-contain py-16 text-white"
      style={{
        backgroundImage: `url(${bgSection})`,
      }}
    >
      <Box className="container mx-auto grid grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        {/* Left Column: Text Content */}
        <Box className="flex flex-col items-start">
          <h2 className="text-5xl font-bold leading-tight">
            <span className="bg-gray-900 px-3 py-1">What's</span> Ahead
            <br />
            for eCommerce in 2025?
          </h2>
          <p className="mt-6 max-w-lg text-lg text-gray-200">
            The world of online retail is rapidly shifting — shaped by consumer
            habits, global economics, and evolving fraud tactics. Our latest
            Commerce in 2025 insight report reveals the biggest trends and
            threats facing merchants today.
          </p>
        </Box>

        {/* Right Column: Image */}
        <Box className="flex items-center justify-center">
          <img
            src={imageCard}
            alt="A man looking at his phone"
            className="w-full max-w-lg"
          />
        </Box>
      </Box>
    </Box>
  );
};
