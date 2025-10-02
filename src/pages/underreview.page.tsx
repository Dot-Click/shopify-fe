import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import underreview from "/images/bg_profile.png";

export const UnderReviewComponent = () => (
  <div className="flex flex-col items-center text-center space-y-6 p-10">
    <img src={underreview} alt="underreview" className="w-1/3 max-sm:w-96 " />
    <h1 className="text-3xl font-bold">Your application is under review</h1>
    <p className="text-gray-600 max-w-md max-sm:text-xs ">
      Your Account Manager will be in touch within 48 hours to activate and
      onboard your account.
    </p>
    <Link to="/">
      <Button variant="outline" className="w-full mt-4 cursor-pointer">
        Back to Homepage
      </Button>
    </Link>
  </div>
);
