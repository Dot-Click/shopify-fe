import { Box } from "../ui/box";
import bgTexture from "/images/bg_texture.png";
import hourGlass from "/icons/hoursGlass.svg";
import bell from "/icons/bell.svg";
import brain from "/icons/brain.svg";
import tag from "/icons/tags.svg";

// Data for the feature cards to keep the JSX clean
const features = [
  {
    icon: <img src={hourGlass} className="h-14 w-14 text-white mt-12" />,
    title: "Real-Time Detection",
    description:
      "Instantly detect and flag suspicious orders the moment they're placed using cross-client data.",
    bgColor: "bg-[#05C165]",
  },
  {
    icon: <img src={brain} className="h-14 w-14 text-white mt-12" />,
    title: "Shared Risk Intelligence",
    description:
      "Access a growing network of Risk reports shared anonymously across other trusted Shopify merchants.",
    bgColor: "bg-[#F04461]",
  },
  {
    icon: <img src={bell} className="h-14 w-14 text-white mt-12" />,
    title: "Automatic Alerts",
    description:
      "Receive alerts directly in your Shopify admin and via email when a potential Risk attempt occurs.",
    bgColor: "bg-[#5B66F0]",
  },
  {
    icon: <img src={tag} className="h-14 w-14 text-white mt-12" />,
    title: "Smart Order Tagging",
    description:
      "High-risk orders are automatically tagged so your team knows exactly which orders to review or hold.",
    bgColor: "bg-[#6e3eb3]",
  },
];

export const TrustSection = () => {
  return (
    <Box
      className="w-full bg-cover bg-center bg-no-repeat py-24"
      style={{
        backgroundImage: `url(${bgTexture})`,
      }}
    >
      <Box className="container mx-auto px-6">
        {/* Section Header */}
        <Box className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Why Shopify Merchants Trust{" "}
            <span className="text-[#05C165]">eComProtect</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            eComProtect offers a smart, secure, and scalable way to stop
            Riskulent orders before they impact your store. Here's how it keeps
            you protected:
          </p>
        </Box>

        {/* Features Grid */}
        <Box className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Box
              key={index}
              className={`flex flex-col items-center h-96 space-y-7 rounded-2xl p-8 text-white ${feature.bgColor}`}
            >
              {feature.icon}
              <h3 className="text-xl font-medium mt-7">{feature.title}</h3>
              <p className="text-gray-100 text-center text-sm ">
                {feature.description}
              </p>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
