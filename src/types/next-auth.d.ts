import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    siteVisible?: boolean;
    username?: string;
    profilePhoto?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      siteVisible?: boolean;
      username?: string;
      profilePhoto?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isVerified?: boolean;
    siteVisible?: boolean;
    profilePhoto?: string;
  }
}

declare module "next-auth" {
  interface Profile {
    id: string; // Add this line to include the id
    name: string;
    email: string;
    picture: string;
    // Add any other properties you expect from the profile
  }
}
