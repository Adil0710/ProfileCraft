import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { registrationEmail } from "@/helpers/registrationEmail"; // Import your registrationEmail helper

// Define the shape of the credentials
interface Credentials {
  identifier: string;
  password: string;
}

const generateVerifyCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
};

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

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      if (account && account.provider === "google") {
        if (!profile || !profile.email) {
          throw new Error("Google profile not found or email missing");
        }

        const existingUser = await UserModel.findOne({ email: profile.email });

        if (!existingUser) {
          const newUser = new UserModel({
            email: profile.email,
            name: profile.name || "User", // Use profile.name or fallback to "User"
            username: profile.email, // Use email as username for uniqueness
            password: "", // Not needed for OAuth
            verifyCode: generateVerifyCode(), // Generate a random 6-digit verification code
            verifyCodeExpiry: new Date(Date.now() + 3600000), // Set expiry to 1 hour from now
            isVerified: true, // Auto-verify Google users
            siteVisible: true, // Set as needed
            accountType: "personal", // Or set to "organization" based on your logic
            oauthProvider: "google",
            oauthProviderId: profile.id,
            profilePhoto: profile.picture || "", // Add profile photo URL
          });

          await newUser.save();

          await registrationEmail(profile.email, newUser.name); // Send registration email
        }
      }
      return true; // Successful sign-in
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.siteVisible = user.siteVisible;
        token.username = user.username;
        token.profilePhoto = user.profilePhoto; // Add profile photo to the token
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.siteVisible = token.siteVisible;
        session.user.username = token.username;
        session.user.profilePhoto = token.profilePhoto; // Include profile photo in the session
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
    error: "/auth/error", // Optional error page
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
