import { Box } from "../ui/box";

const steps = [
  {
    number: 1,
    title: "Order Placed",
    description: "A customer places an order on your Shopify store.",
  },
  {
    number: 2,
    title: "Fraud Detected",
    description:
      "Automatically adds fraud warning tags to orders inside your Shopify admin.",
  },
  {
    number: 3,
    title: "Cross-Check",
    description:
      "The system cross-checks against previous fraud activity across all participating stores.",
  },
  {
    number: 4,
    title: "Alert Issued",
    description: (
      <>
        <b>eComProtect</b> alerts you instantly, tags the order, and suggests
        actions (e.g., hold or deny).
      </>
    ),
  },
];

export const HowItWorksSection = () => {
  return (
    <Box className="w-full bg-white py-24">
      <Box className="container mx-auto grid grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left Column: Text Content */}
        <Box className="flex flex-col justify-center">
          <h2 className="text-5xl font-bold leading-tight text-gray-800">
            <span className="bg-blue-600 px-2 text-white">How</span> eComProtect
            <br />
            Protects Your Store
            <br />
            in Real-Time
          </h2>
          <p className="mt-6 max-w-md text-lg text-gray-600">
            Understand how our detection engine works from order placement to
            fraud alert in four simple steps.
          </p>
        </Box>

        {/* Right Column: Stepper */}
        <Box className="flex justify-center">
          <Box className="space-y-8">
            {steps.map((step, index) => (
              <Box key={step.number} className="relative pl-16">
                {/* THIS IS THE CORRECTED LOGIC */}
                {/* It now only renders the tube after step 1 (index 0) and step 3 (index 2) */}
                {(index === 0 || index === 2) && (
                  <div
                    aria-hidden="true"
                    className="absolute -left-4 top-10 h-[calc(100%_+_2rem)] w-22 rounded-bl-3xl rounded-tl-3xl border-b-[14px] border-l-[14px] border-t-[14px] border-gray-200"
                  />
                )}

                {/* Card Content */}
                <Box className="flex items-center gap-6 rounded-xl relative z-30 border bg-white p-6 shadow-md">
                  {/* Numbered Circle */}
                  <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00A985] text-xl font-bold text-white">
                    {step.number}
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                  </div>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
