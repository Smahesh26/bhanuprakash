import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/instructor-login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const role =
        (account as any)?.role ||
        (profile as any)?.role ||
        (user as any)?.role ||
        "student";

      if (role === "admin") {
        let admin = await prisma.admin.findUnique({
          where: { email: user.email ?? "" },
        });
        if (!admin) {
          admin = await prisma.admin.create({
            data: {
              email: user.email ?? "",
              name: user.name ?? "",
              displayName: user.name ?? "",
              userName: user.email?.split("@")[0] ?? "",
              password: "",
            },
          });
        }
      } else {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email ?? "" },
        });
        if (!dbUser) {
          await prisma.user.create({
            data: {
              email: user.email ?? "",
              name: user.name ?? "",
              password: "",
            },
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.role =
          (account as any)?.role ||
          (profile as any)?.role ||
          (user as any)?.role ||
          "student";
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };