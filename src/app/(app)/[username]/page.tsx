"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import female from "@/assets/female.png";
import male from "@/assets/male.png";
import { Meteors } from "@/components/ui/meteors";

interface SocialMediaLink {
  platform: string;
  platform_username: string;
}

interface UserProfile {
  profilePhoto?: string;
  email:string;
  name: string;
  username: string;
  about?: string;
  favoriteQuote?: string;
  gender?: string;
  occupation?: string;
  socialMediaLinks?: Array<SocialMediaLink>;
  location?: string;
  image?: string;
  // Add any other public fields as needed
}

export default function UserProfile({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const { username } = params;

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`/api/user/${username}`);
        setUser(response.data.user);
        console.log(response);
      } catch (err) {
        setError("User not found or an error occurred.");
      }
    }
    fetchUser();
  }, [username]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  // Extract social media platforms and URLs
  const socialMediaLinks = user.socialMediaLinks || [];
  const platforms = socialMediaLinks.map(link => link.platform);
  const urls = socialMediaLinks.map(link => link.platform_username);

  // Now you can use 'platforms' and 'urls' variables wherever needed
  console.log(platforms); // For debugging
  console.log(urls);      // For debugging

  return (
    <>
    <div className="relative w-full min-h-screen">
      <div className="main">
        <div className="content"></div>
      </div>

      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className="lg:w-[35%] flex-shrink-0 flex flex-col justify-between w-full h-auto lg:h-full pt-28 pb-5 pl-10">
          <div>
            <div className="relative w-36 h-36 rounded-full bg-slate-300 dark:bg-slate-800 flex items-center justify-center">
              <Image
                src={
                  user.profilePhoto ||
                  (user.gender === "Female" ? female : male)
                }
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            <div className="mt-10">
              <h1 className="text-5xl font-bold dark:text-neutral-300">
                {user.name}
              </h1>
              <h2 className="mt-3 font-medium text-neutral-500 dark:text-neutral-500 sm:text-base text-sm">
                @{user.username}
              </h2>
              <p className=" mt-3 font-medium dark:text-neutral-400 text-neutral-700 ">{user.about}</p>

              

             
             
            </div>
          </div>
          <div className="absolute left-10 sm:bottom-5 bottom-0">
            <h1>Adil</h1>
          </div>
        </div>

        {/* Right Side (Scrollable) */}
        <div className="w-full h-auto lg:h-screen overflow-y-auto pt-28 sm:pb-5 pb-20 md:pr-0 pr-0 lg:pr-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 m-4">
              <a href="">
                <div className="bg-[#fff7fb] rounded-md p-10 h-48"></div>
              </a>

              <div className="bg-green-200 rounded-md p-10 h-48">music</div>
              <a href={`mailto:${user.email}`}>
                <div className="bg-[#ffdddd] rounded-md p-10 h-48">Gmail</div>
              </a>
              <div className="bg-[#E9F4FA] rounded-md p-10 h-48">linked</div>

              <div className="relative rounded-md col-span-2 h-48 overflow-hidden">
                {/* Background gradient and blur effect */}
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative shadow-xl bg-gray-900 border border-gray-800 p-10 h-full rounded-md flex flex-col items-center justify-center">
                  {/* FavQuotes component */}
                <p className="font-normal text-sm sm:text-base text-slate-400 relative z-50">
                    {user.favoriteQuote}
                   </p>
                   
                  {/* Optional text or additional content */}
                 

                  {/* Meteor effect */}
                  <Meteors number={20} />
                </div>
              </div>

              <div className="bg-gray-200 rounded-md p-10 col-span-2 row-span-2 h-[400px]">
                pic
              </div>
              <div className="bg-gray-200 rounded-md p-10 h-48">github</div>
              <div className="bg-[#ffdddd] rounded-md p-10 h-48">youtube</div>
              <div className="bg-gray-200 rounded-md p-10 sm:col-span-2 h-48">
                occupation
              </div>
              <div className="bg-gray-200 rounded-md p-10 sm:col-span-2 h-48">
                location
              </div>
              <div className="bg-[#e4f3ff] rounded-md p-10 h-48">twitter</div>
              <div className="bg-gray-200 rounded-md p-10 h-48">
                custom link
              </div>
             
            </div>
          </div>
       
      </div>
    </div>
  </>
  );
}
