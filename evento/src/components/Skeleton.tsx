import { cn } from "@/lib/utils";

export default function Skeleton({
  className,
}: {
  className?: React.HTMLProps<HTMLElement>["className"];
}) {
  return (
    <div
      className={cn(
        "h-4 w-[550px] rounded-md bg-white/5 animate-pulse",
        className
      )}
    />
  );
}
