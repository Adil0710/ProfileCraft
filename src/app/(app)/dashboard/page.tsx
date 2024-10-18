"use client";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultdp from "@/assets/male.png"

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const user = session?.user;


  return (
    <>
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-[1.9fr,2.5fr] sm:px-0 bg-red-300">
        {/* Left Side */}

        <div className="flex flex-col justify-between pt-24 pb-5 pl-10 bg-yellow-200">
          <div className=" bg-red-300">
            <div className=" w-40 h-40 rounded-full bg-white border-[0.15rem] border-black overflow-hidden">
              {user?.image ? ( // Use user.image instead of user.profilePhoto
                <Image
                  src={user.image}
                  alt="Profile"
                  width={160}
                  height={160}
                />
              ) : (
                <Image
                  src={defaultdp}
                  alt="Default Profile"
                  width={160}
                  height={160}
                />
              )}
            </div>
            <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          </div>
          <div className="absolute bg-blue-400 left-10 bottom-5">
            <h1>adil</h1>
          </div>
        </div>

        {/* Right Side */}

        <div className="flex flex-col justify-between pt-24 pb-5 pl-10 bg-purple-200">
          <h1>rightside</h1>
        </div>
      </div>
    </>
  );
}
