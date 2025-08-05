import { PlanCard, type Plan } from "../components/dashboard/plancard";
import { Box } from "../components/ui/box";
import logo from "/images/logo.png";

export const PlansPage = () => {
  const plansData: Omit<Plan, "isCurrent">[] = [
    {
      name: "Starter",
      orderLimit: "0–300",
      price: "$29",
      features: [
        "Basic Dashboard Access",
        "Email Support",
        "Standard Analytics",
      ],
    },
    {
      name: "Growth",
      orderLimit: "301–2,000",
      price: "$99",
      features: ["Everything in Starter", "Advanced Analytics", "API Access"],
    },
    {
      name: "Pro",
      orderLimit: "2,001–5,000",
      price: "$249",
      features: [
        "Everything in Growth",
        "Dedicated Account Manager",
        "Priority Support",
      ],
    },
    {
      name: "Enterprise",
      orderLimit: "5,001+",
      price: "Custom",
      isEnterprise: true,
      features: ["Everything in Pro", "Custom Feature Development"],
    },
  ];

  return (
    <Box className="bg-gradient-to-b from-white to-gray-50 font-sans">
      <header className="bg-white rounded-xl shadow-md p-4 mx-6 mt-6 flex items-center justify-between">
        <img src={logo} className="w-44" />
      </header>

      <main className="container mx-auto px-6 sm:px-8 py-12">
        <Box className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
            Find the Right Plan for You
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Choose a plan that fits your business needs and scale as you grow.
          </p>
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {plansData.map((plan) => (
            <PlanCard key={plan.name} plan={{ ...plan }} />
          ))}
        </Box>
      </main>
    </Box>
  );
};
