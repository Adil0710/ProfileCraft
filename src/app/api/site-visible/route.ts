import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      {
        status: 401,
      }
    );
  }
  const userId = user._id;

  const { siteVisible } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { siteVisible: siteVisible },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update site visible status",
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "site visible status updated successfully",
        updatedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("failed to update site visible status", error);
    return Response.json(
      {
        success: false,
        message: "failed to update site visible status",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      {
        status: 401,
      }
    );
  }
  const userId = user._id;

 try {
     const foundUser = await UserModel.findById(userId);
   
     if (!foundUser) {
       return Response.json(
         {
           success: false,
           message: "user not found",
         },
         {
           status: 404,
         }
       );
     }
   
   
     return Response.json(
       {
         success: true,
         siteVisible: foundUser.siteVisible,
       },
       {
         status: 200,
       }
     );
 } catch (error) {
    console.log("failed to update site visible status", error);
    return Response.json(
      {
        success: false,
        message: "Error in getting site visible status",
      },
      {
        status: 500,
      }
    );
 }
}
