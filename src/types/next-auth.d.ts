import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string; // 👈 extend this
    };
  }

  interface User {
    id: string;
  }
}
