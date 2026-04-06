import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    fullname?: string;
    role?: string;
    type?: string;
  }

  interface Session {
    user: {
      fullname?: string;
      email?: string | null;
      image?: string | null;
      role?: string;
      type?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fullname?: string;
    email?: string;
    image?: string;
    role?: string;
    type?: string;
  }
}