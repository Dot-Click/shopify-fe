import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

export interface Plan {
  name: string;
  orderLimit: string;
  price: string;
  features: string[];
  isCurrent?: boolean;
  isEnterprise?: boolean;
}

interface PlanCardProps {
  plan: Plan;
}

export const PlanCard = ({ plan }: PlanCardProps) => {
  const { name, orderLimit, price, features, isCurrent, isEnterprise } = plan;

  const cardClasses = `
    flex flex-col justify-between rounded-2xl p-8 shadow-xl transition-transform duration-300 h-full
    ${
      isEnterprise
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
        : "bg-white text-gray-900"
    }
    ${
      isCurrent
        ? "border-4 border-blue-600 scale-[1.02]"
        : "border border-gray-200 hover:shadow-2xl hover:-translate-y-2"
    }
  `;

  const buttonVariant = isCurrent && !isEnterprise ? "default" : "outline";
  const buttonText = isEnterprise
    ? "Contact Sales"
    : isCurrent
    ? "Your Current Plan"
    : "Upgrade Plan";

  const buttonClasses = isEnterprise
    ? "bg-white text-gray-900 hover:bg-gray-200"
    : isCurrent
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white";

  return (
    <div className={cardClasses}>
      <div>
        {/* Plan Title */}
        <h3 className="text-3xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-gray-400 mb-6">{orderLimit} orders/month</p>

        {/* Price */}
        <p className="text-5xl font-extrabold mb-8">
          {price}
          {!isEnterprise && (
            <span className="text-xl font-medium text-gray-400"> /mo</span>
          )}
        </p>

        {/* Features */}
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
              <span className="text-base">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <div className="mt-10">
        <Button
          className={`w-full py-3 rounded-lg text-base font-semibold transition-all ${buttonClasses}`}
          variant={buttonVariant}
          disabled={isCurrent && !isEnterprise}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
