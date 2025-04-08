import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base transition-colors",
        "placeholder:text-muted-foreground file:text-foreground file:bg-transparent file:text-sm file:font-medium",
        "selection:bg-primary selection:text-primary-foreground",
        "outline-none ring-0 border-none shadow-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        // Allow full control via className
        className
      )}
      {...props}
    />
  );
}

export { Input };
