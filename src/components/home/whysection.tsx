import { Box } from "../ui/box";
import bgTexture from "/images/bg_texture.png";

// Data for the feature cards
const features = [
  {
    title: "Speed You Can Count On",
    description:
      "Our system reacts in real time, flagging risky orders the moment they happen — no delay, no doubt.",
  },
  {
    title: "Accuracy Across Stores",
    description:
      "We cross-check fraud data from multiple Shopify merchants to give you insights with unmatched accuracy.",
  },
  {
    title: "Full Transparency",
    description:
      "From flagged reasons to suggested actions, you'll always know what's happening and why it matters.",
  },
  {
    title: "Complete Control",
    description:
      "Customize tags, override blocks, and control how fraud alerts behave — right from your dashboard.",
  },
];

export const WhySection = () => {
  return (
    <Box className="relative w-full bg-white">
      {/* 2. Low-opacity background layer */}
      <Box
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${bgTexture})` }}
        aria-hidden="true"
      />

      {/* 3. Content layer: Positioned on top of the background */}
      <Box className="container relative z-10 mx-auto px-6 py-24">
        {/* Section Header */}
        <Box className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Why{" "}
            <span className="bg-blue-600 px-3 py-1 text-white">
              eComProtect
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            eComProtect delivers speed, accuracy, and peace of mind — empowering
            Shopify merchants to fight fraud with total confidence.
          </p>
        </Box>

        {/* Features Grid */}
        <Box className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 px-16">
          {features.map((feature, index) => (
            // Card Container: No fixed height, flex-col for structure
            <Box
              key={index}
              className="flex flex-col h-80 rounded-2xl bg-gradient-to-b from-[#fff] to-[#FFF6FA] shadow-lg"
            >
              {/* This inner div adds padding and controls the content layout */}
              <div className="flex flex-grow flex-col">
                <div className="w-max border-l-8 border-blue-600 bg-[#18181B] p-4 text-white mt-8 ">
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>

                <div className="flex-grow pt-6 px-4">
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
