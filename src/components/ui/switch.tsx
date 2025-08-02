// Your components/ui/switch.tsx file

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/utils"; // Make sure this path is correct

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      // --- THIS IS WHERE THE MAGIC HAPPENS ---
      // When UNCHECKED, the track is light grey
      "data-[state=unchecked]:bg-gray-200",
      // When CHECKED, the track is blue (or your primary color)
      "data-[state=checked]:bg-blue-600",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
        // When UNCHECKED, the thumb is at the start
        "data-[state=unchecked]:translate-x-0",
        // When CHECKED, the thumb slides to the end
        "data-[state=checked]:translate-x-5"
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
