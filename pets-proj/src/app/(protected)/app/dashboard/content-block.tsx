import { cn } from "@/lib/utils";

type ContentBlockProps = {
  children: React.ReactNode;
  className?: React.HTMLProps<HTMLElement>["className"];
};

export default function ContentBlock({
  children,
  className,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        "bg-[#f7f8fa] shadow-sm rounded-md overflow-hidden w-full h-full",
        className
      )}
    >
      {children}
    </div>
  );
}
