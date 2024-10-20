import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(user._id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid User ID",
        },
        { status: 400 }
      );
    }

    const userId = new mongoose.Types.ObjectId(user._id);
    const existingUser = await UserModel.findById(userId);

    if (!existingUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const userProfile = {
      
      profilePhoto: existingUser.profilePhoto,
      name: existingUser.name,
      username: existingUser.username,
      email:existingUser.email,
      about: existingUser.about,
      favoriteQuote: existingUser.favoriteQuote,
      gender: existingUser.gender,
      occupation: existingUser.occupation,
      socialMediaLinks: existingUser.socialMediaLinks,
      location: existingUser.location,
      image: existingUser.image,
      // Add any other fields that are necessary
    };

    return Response.json(
      {
        success: true,
        message: "User profile fetched successfully",
        user: userProfile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return Response.json(
      {
        success: false,
        message: "An error occurred while fetching profile",
      },
      { status: 500 }
    );
  }
}
