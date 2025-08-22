import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [adminClient(), inferAdditionalFields(
    {
      user: {
        companyName: {
          
          type: "string",
        },
        mobileNumber: {
          type: "string",
        },
        companyRegistrationNumber: {
          type: "string",
        },
        averageOrdersPerMonth: {
          type: "string",
        },
        shopifyApiKey: {
          type: "string",
        },
        shopifyApiSecret: {
          type: "string",
        },
        shopifyUrl: {
          type: "string",
        },
          plan: { type: "string" },
        package: { type: "string" },
        imagePublicId: { type: "string" },
      }
    }
  )],
});
