import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import mongoose from "mongoose";

export async function PUT(request: Request) {
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

    const {
      name,
      about,
      favoriteQuote,
      socialMediaLinks,
      profilePhoto,
      gender,
      occupation,
      image,
      location,
    } = await request.json();

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

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          about,
          favoriteQuote,
          profilePhoto,
          gender,
          occupation,
          image,
          location,
          socialMediaLinks,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Update the session with new user data
    const updatedSession = {
      ...session,
      user: {
        ...session.user,
        name: updatedUser.name,
        profilePhoto: updatedUser.profilePhoto,
        about: updatedUser.about,
        favoriteQuote: updatedUser.favoriteQuote,
        gender:updatedUser.gender
        // Include any other fields you want to update
      },
    };

    return Response.json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
        session: updatedSession, // Return the updated session
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return Response.json({
        success: false,
        message: "An error occurred while updating profile",
      },
      { status: 500 }
    );
  }
}
