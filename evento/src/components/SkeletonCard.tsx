import { cn } from "@/lib/utils";
import Skeleton from "./Skeleton";

export default function SkeletonCard({
  className,
}: {
  className?: React.HTMLProps<HTMLElement>["className"];
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}
