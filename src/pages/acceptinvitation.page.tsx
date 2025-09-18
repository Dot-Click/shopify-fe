import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { authClient } from "@/providers/user.provider";
import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");

    if (!otp || !email) {
      setStatus("error");
      setErrorMessage("No verification token found. The link may be invalid.");
      return;
    }

    const verifyToken = async () => {
      try {
        // This is the built-in better-auth function to verify the token
        await authClient.emailOtp.verifyEmail({ email, otp });
        setStatus("success");
      } catch (error: any) {
        setStatus("error");
        setErrorMessage(
          error.message || "Verification failed. The link may have expired."
        );
      }
    };

    verifyToken();
  }, [searchParams]);

  return (
    <Box className="h-[100vh]">
      <Box className="p-8 bg-white shadow rounded-md ">
        {status === "verifying" && (
          <>
            <h1>Verifying your email...</h1>
            <Spinner size="xl" color="teal.500" />
            <p>Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="blue.500">Email Verified!</h1>
            <p>Your account is now active.</p>

            <Link to={"/signin"}>Proceed to Login</Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 color="red.500">Verification Failed</h1>
            <p>{errorMessage}</p>
          </>
        )}
      </Box>
    </Box>
  );
};

export default VerifyEmailPage;
