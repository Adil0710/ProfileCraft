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
      await dbConnect(); // Ensure database connection

      if (account && account.provider === "google") {
        if (!profile || !profile.email) {
          console.error("Google profile not found or email missing");
          return false; // Prevent sign-in
        }

        // Find existing user by email
        let existingUser = await UserModel.findOne({ email: profile.email });

        if (!existingUser) {
          // Create new user if not found
          const username = profile.email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_");

          const newUser = new UserModel({
            email: profile.email,
            name: profile.name || "User",
            username: username, // Set username for new user
            password: "", // Not needed for OAuth
            verifyCode: generateVerifyCode(),
            verifyCodeExpiry: new Date(Date.now() + 3600000),
            isVerified: true,
            siteVisible: true,
            accountType: "personal",
            oauthProvider: "google",
            oauthProviderId: profile.sub,
            profilePhoto: profile.picture || "",
          });

          await newUser.save();
          await registrationEmail(profile.email, newUser.name);

          existingUser = newUser; // Assign newly created user
        } else {
          // If the user exists, ensure they have a username
          if (!existingUser.username) {
            existingUser.username = profile.email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_");
            await existingUser.save(); // Save username for existing user if missing
          }
        }

        
        // Add user information to the session and token via the jwt callback
        user._id = existingUser._id.toString(); // Make sure the _id is set here
        user.isVerified = existingUser.isVerified;
        user.siteVisible = existingUser.siteVisible;
        user.username = profile.email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_");
        user.profilePhoto = existingUser.profilePhoto;
        
        return true; // Allow sign-in to continue
      }

      // Handle non-Google sign-in
      return true; // Successful sign-in for other providers
    },

    async jwt({ token, user }) {
      // Add user information to the tokena
      if (user) {
        token._id = user._id?.toString(); // Set the _id from the user object
        token.isVerified = user.isVerified;
        token.siteVisible = user.siteVisible;
        token.username = user.username;
        token.profilePhoto = user.profilePhoto;
      }
      
      return token;
    },

    async session({ session, token }) {
      // Set user details from the token into the session
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.siteVisible = token.siteVisible;
        session.user.username = token.username;
        session.user.profilePhoto = token.profilePhoto;
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
