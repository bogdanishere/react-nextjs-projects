// lib/auth.ts
import NextAuth, { NextAuthOptions } from "next-auth";
// Importă eventual providerii pe care îi folosești

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // Asigură-te că această variabilă de mediu este setată
  pages: {
    signIn: "/login",
  },
  providers: [
    // Exemplu: GitHubProvider({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! })
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
  },
  callbacks: {
    // Callback-uri, dacă este necesar
  },
};

const handler = NextAuth(authOptions);

// Exportă handler-ele pentru GET și POST
export { handler as GET, handler as POST };
