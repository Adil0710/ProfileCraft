"use client";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import female from "@/assets/female.png";
import male from "@/assets/male.png";
import { Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import React from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const user = session?.user;
  console.log(session);

  const [selectedGender, setSelectedGender] = React.useState<
    "male" | "female" | null
  >(null);

  const profileImage = React.useMemo(() => {
    if (user?.image) return user.image; // Show the user's uploaded image if it exists
    if (selectedGender === "male") return male.src; // Show male avatar if male is selected
    if (selectedGender === "female") return female.src; // Show female avatar if female is selected
    return null; // No image when nothing is selected
  }, [user?.image, selectedGender]);

  return (
    <>
      <div className="relative w-full h-screen">
        {/* Background styling */}
        <div className="main">
          <div className="content"></div>
        </div>

        {/* Content container */}
        <div className="relative z-10 w-full lg:grid lg:min-h-screen lg:grid-cols-[1.9fr,2.5fr] sm:px-0">
          {/* Left Side */}
          <div className="flex flex-col justify-between pt-28 pb-5 pl-10">
            <div className=" ">
              <div className="relative w-32 h-32 rounded-full bg-slate-300 dark:bg-slate-800 ">
                {!profileImage ? (
                  <span className="absolute bottom-3 right-6">
                    Set DP &#8600;
                  </span>
                ) : (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={160}
                    height={160}
                    className="rounded-full"
                  />
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Edit className="cursor-pointer w-5 h-5 text-slate-500 dark:text-slate-600 absolute -right-0.5 bottom-0.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-30">
                    <DropdownMenuLabel>Set your DP</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={selectedGender === "male"}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGender("male");
                        } else {
                          setSelectedGender(null);
                        }
                      }}
                    >
                      Male
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedGender === "female"}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGender("female");
                        } else {
                          setSelectedGender(null);
                        }
                      }}
                    >
                      Female
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className=" mt-10">
                <h1 className="text-5xl font-bold">{user?.name}</h1>
                <h2 className="mt-3 font-medium text-neutral-500 dark:text-neutral-400">
                  @{user?.username}
                </h2>
              </div>
            </div>
            <div className="absolute left-10 bottom-5">
              <h1>adil</h1>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-between pt-28 pb-5 pl-10">
            <h1>rightside</h1>
          </div>
        </div>
      </div>
    </>
  );
}
