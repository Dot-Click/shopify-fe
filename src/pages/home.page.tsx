import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/home/navbar";
import { Box } from "../components/ui/box";
import { Button } from "../components/ui/button";
import { FaPlay } from "react-icons/fa";
import { TrustSection } from "../components/home/trustsection";
import { HowItWorksSection } from "../components/home/worksection";

import heroBackgroundImage from "/images/hero_image.png";
import manImage from "/images/character.png";
import { AheadSection } from "../components/home/aheadsection";
import { WhySection } from "../components/home/whysection";
import { TestimonialsSection } from "../components/home/testimonialsection";
import { Footer } from "../components/home/footer";
// import bgSection from "/images/bg_section.png";
// import bgCard from "/images/imageCard.png";

export const Home = () => {
  return (
    <Box className="relative h-screen w-full text-white">
      <Box
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackgroundImage})`,
        }}
      />

      <Navbar />

      <main className="container relative z-10 mx-auto flex h-full items-center px-6">
        <Box className="flex w-full flex-col items-start lg:w-1/2">
          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Stop-Parcel Fraud Before <br /> It Hits Your Bottom Line.
          </h1>

          <p className="mt-6 max-w-lg text-lg text-gray-200">
            <b>eComProtect</b> is a smart fraud detection tool for Shopify that
            flags repeat offenders and helps merchants make safer decisions in
            real time.
          </p>

          <Box className="mt-8 flex flex-wrap items-center gap-4">
            <Button className="rounded-full bg-[#30A46C] px-7 py-6 text-base font-semibold text-white hover:bg-[#298d5c]">
              <Link to="/get-started" className="flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-full cursor-pointer border-2 bg-[#fff] px-1 py-6 text-base font-semibold text-gray-500 hover:bg-white hover:text-blue-700"
            >
              <Box className="rounded-full bg-[#30A46C] text-white p-3 ">
                {" "}
                <FaPlay />{" "}
              </Box>
              <Link to="/tutorial" className="flex items-center pr-5 ">
                Watch Tutorial
              </Link>
            </Button>
          </Box>
        </Box>
      </main>

      <Box className="absolute bottom-0 right-0 z-0 hidden h-5/6 w-1/2 items-end justify-center lg:flex">
        <img
          src={manImage}
          alt="A man in a blue turtleneck"
          className="h-full w-auto object-contain"
        />
      </Box>

      <TrustSection />
      <HowItWorksSection />
      <AheadSection />
      <WhySection />
      <TestimonialsSection />
      <Footer />
    </Box>
  );
};
