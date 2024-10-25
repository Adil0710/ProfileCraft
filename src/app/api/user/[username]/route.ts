import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { username: string } }) {
  await dbConnect();

  try {
    const { username } = params;

    // Fetch the user by username
    const user = await UserModel.findOne({ username, isVerified: true }).select(
      "profilePhoto name username about favoriteQuote gender occupation socialMediaLinks location image"
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User profile fetched successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching user profile",
      },
      { status: 500 }
    );
  }
}
