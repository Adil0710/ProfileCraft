import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import sizeOf from "image-size";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload file to Cloudinary
function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string,
  publicId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformations: Record<string, any> = {} // Accept transformations as an argument
) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        overwrite: true,
        ...transformations, // Apply transformations if provided
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
}

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

    const formData = await request.formData();
    const username = formData.get("username") as string;
    const name = formData.get("name") as string;
    const about = formData.get("about") as string;
    const favoriteQuote = formData.get("favoriteQuote") as string;
    const gender = formData.get("gender") as string;
    const occupation = formData.get("occupation") as string;
    const location = formData.get("location") as string;
    const socialLinks = JSON.parse(
      (formData.get("socialLinks") as string) || "[]"
    );
    const profilePhoto = formData.get("profilePhoto") as File | string | null;
    const image = formData.get("image") as File | null;

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

    // Upload profile photo to Cloudinary if provided
    let uploadedProfilePhotoUrl = existingUser.profilePhoto;
    if (profilePhoto) {
      if (profilePhoto instanceof File) {
        // If profilePhoto is a File, upload it to Cloudinary
        const buffer = Buffer.from(await profilePhoto.arrayBuffer());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uploadResult: any = await uploadToCloudinary(
          buffer,
          "ProfileCraft_user_profiles",
          `${userId}_profilePhoto`,
          {
            transformation: [
              {
                width: 1000,
                crop: "fill",
                aspect_ratio: "1:1",
                gravity: "auto",
              },
              { radius: "max" },
              { background: "#262c35" },
            ],
          }
        );
        uploadedProfilePhotoUrl = uploadResult.secure_url;
      } else if (typeof profilePhoto === "string") {
        // If profilePhoto is a string, just use it as the URL
        uploadedProfilePhotoUrl = profilePhoto;
      }
    }

    // Upload image to Cloudinary if provided
    let uploadedImageUrl = existingUser.image;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());

      // Determine image dimensions using image-size
      const dimensions = sizeOf(buffer);
      const width = dimensions.width ?? 0;
      const height = dimensions.height ?? 0;

      const transformations =
        width > height
          ? [{ width: 1000, crop: "fill", gravity: "auto" }]
          : [
              {
                width: 1000,
                crop: "fill",
                aspect_ratio: "10:10",
                gravity: "auto",
              },
            ];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uploadResult: any = await uploadToCloudinary(
        buffer,
        "ProfileCraft_user_images",
        `${userId}_image`,
        {
          transformation: transformations,
        }
      );
      uploadedImageUrl = uploadResult.secure_url;
    }

    // Update user in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: username || existingUser.username,
          name: name || existingUser.name,
          about: about || existingUser.about,
          favoriteQuote: favoriteQuote || existingUser.favoriteQuote,
          profilePhoto: uploadedProfilePhotoUrl || existingUser.profilePhoto,
          gender: gender || existingUser.gender,
          occupation: occupation || existingUser.occupation,
          image: uploadedImageUrl || existingUser.image,
          location: location || existingUser.location,
          socialMediaLinks: socialLinks || existingUser.socialMediaLinks,
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
        username: updatedUser.username,
        name: updatedUser.name,
        profilePhoto: updatedUser.profilePhoto,
        about: updatedUser.about,
        favoriteQuote: updatedUser.favoriteQuote,
        gender: updatedUser.gender,
        image: updatedUser.image,
      },
    };

    return Response.json(
      {
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
        session: updatedSession,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return Response.json(
      {
        success: false,
        message: "An error occurred while updating profile",
      },
      { status: 500 }
    );
  }
}
