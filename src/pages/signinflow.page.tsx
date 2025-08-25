import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShieldCheck, BarChart2, Briefcase, Loader2 } from "lucide-react";
import { axios } from "../configs/axios.config";
import { authClient } from "../providers/user.provider";
import underreview from "/images/bg_profile.png";

const PackageSelectionComponent = ({
  onSelectPackage,
}: {
  onSelectPackage: (pkg: {
    name: string;
    price: number;
    currency: string;
    plan: string;
  }) => void;
}) => {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center p-10 space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-gray-600">Loading your packages...</p>
      </div>
    );
  }

  const avgOrders = data?.user?.average_orders_per_month;
  const plan = data?.user?.plan || "";

  const packages = [
    {
      name: "ECP Insight",
      description: "Lost Data Access Only",
      icon: BarChart2,
      price:
        avgOrders === "0-300"
          ? 299
          : avgOrders === "301-2,000"
          ? 699
          : avgOrders === "2,001-5,000"
          ? 1249
          : 299,
      currency: "GBP",
      available: true,
    },
    {
      name: "ECP Vision",
      description: "Lost Data + % Loss Rate",
      icon: ShieldCheck,
      price:
        avgOrders === "0-300"
          ? 399
          : avgOrders === "301-2,000"
          ? 799
          : avgOrders === "2,001-5,000"
          ? 1499
          : 399,
      currency: "GBP",
      available: true,
    },
    {
      name: "ECP Shield",
      description: "Lost Data + % Loss Rate + Waiver Workflow",
      icon: Briefcase,
      price:
        avgOrders === "0-300"
          ? 499
          : avgOrders === "301-2,000"
          ? 899
          : avgOrders === "2,001-5,000"
          ? 1749
          : 499,
      currency: "GBP",
      available: false,
    },
  ];

  return (
    <div className="flex flex-col items-center text-center space-y-8 p-10">
      <h1 className="text-3xl font-bold">Select Your Package</h1>
      <p className="text-gray-600 max-w-md">
        Choose a package to get started. You can always upgrade later.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`rounded-xl border border-web-grey shadow-sm p-6 flex flex-col items-center text-center ${
              !pkg.available ? "bg-gray-50 text-gray-400" : "bg-white"
            }`}
          >
            <pkg.icon
              className={`h-10 w-10 mb-4 ${
                pkg.available ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <h2 className="text-xl font-bold">{pkg.name}</h2>
            {!pkg.available && (
              <p className="text-xs font-semibold text-orange-500 my-1">
                Coming Soon
              </p>
            )}
            <p className="text-sm mt-1 flex-grow">{pkg.description}</p>
            <p className="text-xl flex-grow font-medium">€{pkg.price}</p>
            <Button
              className="w-full mt-6 bg-web-blue text-web-grey"
              onClick={() =>
                onSelectPackage({
                  name: pkg.name,
                  price: pkg.price,
                  currency: pkg.currency,
                  plan: plan,
                })
              }
              disabled={!pkg.available}
            >
              Select Package
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PaymentComponent = () => (
  <div className="flex flex-col items-center text-center space-y-6 p-10">
    <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
    <h1 className="text-3xl font-bold">Redirecting to Payment Setup</h1>
    <p className="text-gray-600">
      Please wait while we securely redirect you to GoCardless.
    </p>
  </div>
);

const EnterpriseReviewComponent = () => {
  const location = useLocation();
  const { userEmail } = location.state || {};

  useEffect(() => {
    const setupEnterpriseUser = async () => {
      if (userEmail) {
        try {
          const updatedUser = await authClient.updateUser({
            plan: "Enterprise",
          });

          console.log("This is the updated user:", updatedUser);

          if (updatedUser.data?.status === true) {
            await authClient.sendVerificationEmail({
              email: userEmail,
            });
          }
        } catch (error) {
          console.error("Failed to update user for enterprise review:", error);
        }
      }
    };

    setupEnterpriseUser();
  }, [userEmail]);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 p-10">
      <img src={underreview} alt="underreview" className="w-1/3" />

      <h1 className="text-3xl font-bold">Thank You for Your Application</h1>
      <p className="text-gray-600 text-lg max-w-lg">
        An eComProtect Account Manager will be in touch within 24 hours.
      </p>
      <Link to="/" className="mt-4">
        <Button variant="outline">Back to Homepage</Button>
      </Link>
    </div>
  );
};

export const PostSignupFlowPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const { flowStep, userId, userName, userEmail } = location.state || {};
  const [currentStep, setCurrentStep] = useState(flowStep);

  useEffect(() => {
    if (!userId) {
      navigate("/signup");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("status") === "success") {
      setCurrentStep("underReview");
    }
  }, [userId, navigate]);

  const handlePackageSelect = async (pkg: {
    name: string;
    price: number;
    currency: string;
    plan: string;
  }) => {
    setIsLoading(true);
    setCurrentStep("payment");

    try {
      const response = await axios.post("/payment/create", {
        userId,
        planName: pkg.name,
        amount: pkg.price * 100,
        currency: pkg.currency,
        userName,
        userEmail,
      });

      if (response.data?.redirect_url) {
        const updatedUser = await authClient.updateUser({
          plan: pkg.plan,
          package: pkg.name,
        });

        if (updatedUser.data?.status === true) {
          await authClient.sendVerificationEmail({
            email: userEmail,
          });
        }
        window.location.href = response.data.redirect_url;
      } else {
        throw new Error("Could not retrieve payment URL.");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setIsLoading(false);
      setCurrentStep("packageSelection");
    }
  };

  const renderStep = () => {
    if (isLoading && currentStep === "payment") {
      return <PaymentComponent />;
    }
    switch (currentStep) {
      case "packageSelection":
        return (
          <PackageSelectionComponent onSelectPackage={handlePackageSelect} />
        );
      case "underReview":
        return <p>Redirecting to under review</p>;
      case "enterpriseReview":
        return <EnterpriseReviewComponent />;
      default:
        return <p>Loading...</p>;
    }
  };

  useEffect(() => {
    if (currentStep === "underReview") {
      navigate("/under-review");
    }
  }, [currentStep, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {renderStep()}
    </div>
  );
};
