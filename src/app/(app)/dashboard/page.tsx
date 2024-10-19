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
import { Meteors } from "@/components/ui/meteors";
import { FavQuotes } from "@/components/FavQuotes";

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [selectedGender, setSelectedGender] = React.useState<
    "male" | "female" | null
  >(null);

  const profileImage = React.useMemo(() => {
    if (user?.image) return user.image;
    if (selectedGender === "male") return male.src;
    if (selectedGender === "female") return female.src;
    return null;
  }, [user?.image, selectedGender]);

  return (
    <>
      <div className="relative w-full h-screen">
        {/* Background styling */}
        <div className="main">
          <div className="content"></div>
        </div>

        {/* Left Side (Fixed) */}
        <div className="fixed top-0 left-0 flex flex-col justify-between w-[35%] h-full pt-28 pb-5 pl-10">
          <div>
            <div className="relative w-32 h-32 rounded-full bg-slate-300 dark:bg-slate-800">
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
                      if (checked) setSelectedGender("male");
                      else setSelectedGender(null);
                    }}
                  >
                    Male
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedGender === "female"}
                    onCheckedChange={(checked) => {
                      if (checked) setSelectedGender("female");
                      else setSelectedGender(null);
                    }}
                  >
                    Female
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-10">
              <h1 className="text-5xl font-bold">{user?.name}</h1>
              <h2 className="mt-3 font-medium text-neutral-500 dark:text-neutral-400">
                @{user?.username}
              </h2>
            </div>
          </div>
          <div className="absolute left-10 bottom-5">
            <h1>Adil</h1>
          </div>
        </div>

        {/* Right Side (Scrollable) */}
        <div className="ml-[35%] h-screen overflow-y-auto pt-28 pb-5 sm:pr-10 pr-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 m-4">
            <div className="bg-[#ffc9e1] rounded-md p-10 h-48">insta</div>
            <div className="bg-neutral-200 rounded-md p-10 h-48">twitter</div>
            <div className="bg-green-200 rounded-md p-10 h-48">music</div>
            <div className="bg-[#e1f0ff] rounded-md p-10 h-48">linked</div>
            <div className="relative rounded-md sm:col-span-2 h-48 overflow-hidden">
              {/* Background gradient and blur effect */}
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative shadow-xl bg-gray-900 border border-gray-800 p-10 h-full rounded-md flex flex-col justify-end items-start">
                {/* FavQuotes component */}
                

                {/* Optional text or additional content */}
                <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                  I don&apos;t know what to write so I&apos;ll just paste
                  something cool here. One more sentence because lorem ipsum is
                  just unacceptable. Won&apos;t ChatGPT the shit out of this.
                </p>

                {/* Meteor effect */}
                <Meteors number={20} />
              </div>
            </div>

            <div className="bg-gray-200 rounded-md p-10 sm:col-span-2 h-48 relative overflow-hidden">
              <Meteors number={20} />
            </div>
            <div className="bg-gray-200 rounded-md p-10 sm:col-span-2 sm:row-span-2 h-[400px]">
              pic
            </div>
            <div className="bg-gray-200 rounded-md p-10 h-48">github</div>
            <div className="bg-gray-200 rounded-md p-10 h-48">youtube</div>
            <div className="bg-gray-200 rounded-md p-10 sm:col-span-2 h-48">
              occupation
            </div>
            <div className="bg-gray-200 rounded-md p-10 sm:col-span-2 h-48">
              location
            </div>
            <div className="bg-gray-200 rounded-md p-10 h-48">custom link</div>
          </div>
        </div>
      </div>
    </>
  );
}
