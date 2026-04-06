import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={cn(
      "inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors",
      className
    )}
    ref={ref}
    {...props}
  />
));

Button.displayName = "Button";

export { Button };
