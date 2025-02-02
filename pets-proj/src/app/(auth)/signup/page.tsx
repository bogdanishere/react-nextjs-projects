import H1 from "@/components/H1";
import AuthForm from "../auth-form";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5">Sign Up</H1>
      <AuthForm type="signup" />
      <p className="mt-6 text-sm text-zinc-500">
        Aleady have an account?{" "}
        <Link href="/login" className="font-medium">
          Login
        </Link>
      </p>
    </main>
  );
}
