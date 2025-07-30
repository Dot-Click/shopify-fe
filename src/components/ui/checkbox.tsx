// In src/components/ui/checkbox.tsx

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      color: {
        default:
          "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        // --- THIS IS THE NEW BLUE VARIANT ---
        blue: "border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white focus-visible:ring-blue-500",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    // --- THIS IS THE KEY CHANGE ---
    // We are hardcoding the 'blue' variant here.
    className={cn(checkboxVariants({ color: "blue" }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
