import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export const UnderReviewComponent = () => (
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
