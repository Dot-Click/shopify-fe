import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  ShieldCheck,
  BarChart2,
  Briefcase,
  Loader2,
  Clock,
  CheckCircle,
} from "lucide-react";

// --- CHILD COMPONENTS FOR EACH STEP (UNCHANGED) ---

const PackageSelectionComponent = ({
  onSelectPackage,
}: {
  onSelectPackage: (pkg: string) => void;
}) => {
  const packages = [
    {
      name: "ECP Insight",
      description: "Lost Data Access Only",
      icon: BarChart2,
      available: true,
    },
    {
      name: "ECP Vision",
      description: "Lost Data + % Loss Rate",
      icon: ShieldCheck,
      available: true,
    },
    {
      name: "ECP Shield",
      description: "Lost Data + % Loss Rate + Waiver Workflow",
      icon: Briefcase,
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
            <Button
              className="w-full mt-6 bg-web-blue text-web-grey"
              onClick={() => onSelectPackage(pkg.name)}
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

const PaymentComponent = ({
  onPaymentComplete,
}: {
  onPaymentComplete: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onPaymentComplete, 3000);
    return () => clearTimeout(timer);
  }, [onPaymentComplete]);

  return (
    <div className="flex flex-col items-center text-center space-y-6 p-10">
      <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
      <h1 className="text-3xl font-bold">Redirecting to Payment Setup</h1>
      <p className="text-gray-600">
        Please wait while we securely redirect you to GoCardless.
      </p>
    </div>
  );
};

const UnderReviewComponent = () => (
  <div className="flex flex-col items-center text-center space-y-6 p-10">
    <Clock className="h-16 w-16 text-blue-600" />
    <h1 className="text-3xl font-bold">Your application is under review</h1>
    <p className="text-gray-600 max-w-md">
      Your Account Manager will be in touch within 48 hours to activate and
      onboard your account.
    </p>
    <Link to="/">
      <Button variant="outline" className="w-full mt-4">
        Back to Homepage
      </Button>
    </Link>
  </div>
);

// --- UPDATED ENTERPRISE COMPONENT ---
// This component now shows the new, direct message for Enterprise customers.
const EnterpriseReviewComponent = () => (
  <div className="flex flex-col items-center justify-center text-center space-y-6 p-10">
    <CheckCircle className="h-16 w-16 text-green-500" />
    <h1 className="text-3xl font-bold">Thank You for Your Application</h1>
    <p className="text-gray-600 text-lg max-w-lg">
      An eComProtect Account Manager will be in touch within 24 hours.
    </p>
    <Link to="/" className="mt-4">
      <Button variant="outline">Back to Homepage</Button>
    </Link>
  </div>
);

// --- MAIN PAGE COMPONENT (UNCHANGED) ---

export const PostSignupFlowPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(location.state?.flowStep);

  useEffect(() => {
    if (!location.state?.flowStep) {
      navigate("/signup");
    }
  }, [location.state, navigate]);

  const handlePackageSelect = (packageName: string) => {
    console.log(
      "Package selected:",
      packageName,
      "for user:",
      location.state?.formData?.email
    );
    setCurrentStep("payment");
  };

  const handlePaymentComplete = () => {
    console.log("Payment complete for user:", location.state?.formData?.email);
    setCurrentStep("underReview");
  };

  const renderStep = () => {
    switch (currentStep) {
      case "packageSelection":
        return (
          <PackageSelectionComponent onSelectPackage={handlePackageSelect} />
        );
      case "payment":
        return <PaymentComponent onPaymentComplete={handlePaymentComplete} />;
      case "underReview":
        return <UnderReviewComponent />;
      case "enterpriseReview":
        return <EnterpriseReviewComponent />;
      default:
        return <p>Loading...</p>;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {renderStep()}
    </div>
  );
};
