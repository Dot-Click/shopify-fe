import { Box } from "../ui/box";
import videoThumbnail from "/images/videothumbnail.png";

export const HowItWorksOverlap = () => {
  return (
    <Box className="pb-6">
      <Box className="container mx-auto px-6">
        <Box className="mx-auto max-w-4xl text-center">
          <h2 className="inline-block rounded-lg p-4 text-4xl font-bold text-gray-800 max-sm:text-2xl">
            See How{" "}
            <span className="bg-blue-600 px-3 py-1 text-white">
              e<span className="font-normal">Com</span>Protect
              <span className="font-normal">Works?</span>
            </span>
          </h2>

          <Box className="group relative mt-8 cursor-pointer z-10 mb-[-160px]">
            <div className="inline-block pb-3">
              <img
                src={videoThumbnail}
                alt="Video thumbnail of team working"
                className="w-full"
              />
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
