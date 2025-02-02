export default function Button({
  children,
  type = "button",
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | "secondary";
}) {
  return (
    <button
      className={`btn ${type === "secondary" ? "btn-secondary" : ""}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
