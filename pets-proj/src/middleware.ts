// app/api/auth/[...nextauth]/route.ts
export { GET, POST } from "@/lib/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
