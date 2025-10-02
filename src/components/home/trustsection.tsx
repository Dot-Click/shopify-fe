import { Box } from "../ui/box";
import bgTexture from "/images/bg_texture.png";
import hourGlass from "/icons/hoursGlass.svg";
import bell from "/icons/bell.svg";
import brain from "/icons/brain.svg";
import tag from "/icons/tags.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // 👈 Import navigation styles
import { Navigation } from "swiper/modules";

import {
  FaChartArea,
  FaLock,
  FaShieldAlt,
  FaSuperpowers,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

// Data for feature cards
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
      "Access a growing network of risk reports shared anonymously across trusted Shopify merchants.",
    bgColor: "bg-[#F04461]",
  },
  {
    icon: <img src={bell} className="h-14 w-14 text-white mt-12" />,
    title: "Automatic Alerts",
    description:
      "Get notified in real-time via email and dashboard when suspicious orders occur.",
    bgColor: "bg-[#5B66F0]",
  },
  {
    icon: <img src={tag} className="h-14 w-14 text-white mt-12" />,
    title: "Smart Order Tagging",
    description:
      "High-risk orders are auto-tagged so your team knows exactly what to review.",
    bgColor: "bg-[#6E3EB3]",
  },
  {
    icon: <FaShieldAlt className="h-14 w-14 text-white mt-12" />,
    title: "Fraud Prevention",
    description:
      "Block chargebacks before they hit by analyzing hundreds of fraud signals.",
    bgColor: "bg-[#0EA5E9]",
  },
  {
    icon: <FaChartArea className="h-14 w-14 text-white mt-12" />,
    title: "Analytics Dashboard",
    description:
      "Track fraud trends and insights with an easy-to-read analytics dashboard.",
    bgColor: "bg-[#F59E0B]",
  },
  {
    icon: <FaSuperpowers className="h-14 w-14 text-white mt-12" />,
    title: "24/7 Support",
    description:
      "Our risk experts are available around the clock to help your business stay safe.",
    bgColor: "bg-[#10B981]",
  },
  {
    icon: <FaLock className="h-14 w-14 text-white mt-12" />,
    title: "Data Encryption",
    description:
      "All data is encrypted end-to-end ensuring maximum protection for your store.",
    bgColor: "bg-[#EF4444]",
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
            eComProtect offers a smart, secure, and scalable way to stop risky
            orders before they impact your store. Here's how it keeps you safe:
          </p>
        </Box>
      </Box>

      {/* Carousel */}
      <Box className="mt-16 relative">
        {/* Custom arrows */}
        <div className="swiper-button-prev !text-white !bg-black/40 hover:!bg-black/70 !rounded-full !w-12 !h-12 flex items-center justify-center shadow-lg">
          <div>
            <FaArrowLeft />
          </div>
        </div>
        <div className="swiper-button-next !text-white !bg-black/40 hover:!bg-black/70 !rounded-full !w-12 !h-12 flex items-center justify-center shadow-lg">
          <div>
            <FaArrowRight />
          </div>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <Box
                className={`flex flex-col items-center h-96 space-y-7 rounded-2xl p-8 text-white ${feature.bgColor}`}
              >
                {feature.icon}
                <h3 className="text-xl font-medium mt-7">{feature.title}</h3>
                <p className="text-gray-100 text-center text-sm">
                  {feature.description}
                </p>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
