import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Import Google provider
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

// Define the shape of the credentials
interface Credentials {
    identifier: string;
    password: string;
  }
  
  export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          identifier: { label: "Username or Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials: Credentials | undefined) {
          if (!credentials) {
            throw new Error("Credentials not provided");
          }
  
          await dbConnect();
  
          try {
            const user = await UserModel.findOne({
              $or: [
                { email: credentials.identifier },
                { username: credentials.identifier },
              ],
            });
  
            if (!user) {
              throw new Error("No user found with this email or username");
            }
  
            if (!user.isVerified) {
              throw new Error("Please verify your account before login");
            }
  
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
  
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Incorrect password");
            }
          } catch (error) {
            throw new Error((error as Error).message);
          }
        },
      }),
      
      // Add Google login provider
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.siteVisible = user.siteVisible;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.siteVisible = token.siteVisible
        session.user.username = token.username 
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
