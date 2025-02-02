import Logo from "@/components/Logo";

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-5">
      <Logo />
      {children}
    </div>
  );
}
