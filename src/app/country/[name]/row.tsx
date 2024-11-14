import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Row({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-y p-4 flex justify-between items-center",
        className
      )}
    >
      {children}
    </div>
  );
}

export function RowLabel({ children }: { children: string }) {
  return <div className="text-muted-foreground">{children}</div>;
}

export function RowValue({
  values,
  children,
}:
  | { children: string; values?: never }
  | { children?: never; values: string[] }) {
  const content = children ?? values.join(", ");
  return <div>{content}</div>;
}
