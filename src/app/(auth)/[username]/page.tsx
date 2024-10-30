"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import female from "@/assets/female.png";
import male from "@/assets/male.png";
import { Meteors } from "@/components/ui/meteors";
import Background from "@/components/Background";
import LoadingPublic from "@/components/LoadingPublic";
import ShinyButton from "@/components/ui/shiny-button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Music } from "lucide-react";
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";

interface SocialMediaLink {
  platform: string;
  platform_username: string;
}

interface UserProfile {
  profilePhoto?: string;
  email: string;
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

export default function UserProfile({
  params,
}: {
  params: { username: string };
}) {
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
        console.log(err);
      }
    }
    fetchUser();
  }, [username]);

  if (error)
    return (
      <div className="relative w-full flex items-center justify-center min-h-screen">
        <Background />
        <p>{error}</p>
      </div>
    );

  // Extract social media platforms and URLs
  const socialMediaLinks = user?.socialMediaLinks || [];

  // Map social media links to create a username object
  const userNames = socialMediaLinks.reduce((acc, link) => {
    acc[link.platform.toLowerCase()] = link.platform_username;
    return acc;
  }, {} as Record<string, string>);

  // Now you can access usernames by platform
  console.log(userNames); // For debugging

  // Get Instagram username
  const instagramUsername = userNames["instagram"] || "";
  const spotifyLink = userNames["spotify"] || "";
  const linkedinProfile = userNames["linkedin"] || "";
  const youtubeChannel = userNames["youtube"] || "";
  const twitterUsername = userNames["twitter"] || "";
  const threadsUsername = userNames["threads"] || "";
  const githubUsername = userNames["github"] || "";
  const customLink = userNames["custom"] || "";

  return (
    <>
      <div className="relative w-full min-h-screen">
        <Background />

        {!user ? (
          <LoadingPublic />
        ) : (
          <>
            {" "}
            <div className="flex flex-col lg:flex-row w-full h-full">
              <div className="lg:w-[35%] flex-shrink-0 flex flex-col justify-between w-full h-auto lg:h-full pt-28 pb-5 sm:pl-10 pl-5">
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
                    <h1 className="sm:text-5xl text-4xl font-bold dark:text-neutral-300">
                      {user.name}
                    </h1>
                    <h2 className="mt-3 font-medium text-neutral-500 dark:text-neutral-500 sm:text-base text-sm">
                      @{user.username}
                    </h2>
                    <p className=" mt-3 font-medium dark:text-neutral-300 text-neutral-700 ">
                      {user.about}
                    </p>
                  </div>
                </div>
                <div className="absolute sm:left-10 sm:bottom-2 -bottom-10 sm:space-y-7 space-y-7 pb-3 left-3">
                  <div className="flex flex-row">
                    <Link href="/sign-up">
                      <ShinyButton>Create Profile</ShinyButton>
                    </Link>{" "}
                    <Separator
                      orientation="vertical"
                      className="h-auto w-[1px] bg-gray-300 mx-4"
                    />{" "}
                    <Link href="/sign-in">
                      <ShinyButton className="bg-black/5">Log In</ShinyButton>
                    </Link>
                  </div>
                  <div className="flex flex-row text-sm sm:text-base">
                    <p className="text-neutral-500 dark:text-neutral-300">
                      Powered by{" "}
                      <Link
                        href="/"
                        className="underline text-neutral-800 hover:text-black duration-200 dark:text-neutral-300 dark:hover:text-neutral-50"
                      >
                        ProfileCraft
                      </Link>
                    </p>
                    <Separator
                      orientation="vertical"
                      className="h-auto w-[1px] bg-gray-300 mx-4"
                    />{" "}
                    <p className="text-neutral-500 dark:text-neutral-300">
                      Developed by{" "}
                      <Link
                        href="https://devadil.vercel.app/"
                        target="_blank"
                        className=" text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-50 font-semibold hover:text-black duration-200"
                      >
                        Adil
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side (Scrollable) */}
              <div className="w-full h-auto lg:h-screen overflow-y-auto pt-28 sm:pb-5 pb-20 md:pr-0 pr-0 lg:pr-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 m-4">
                  {/* Instagram */}

                  <Link
                    href={`https://www.instagram.com/${instagramUsername}`}
                    target="_blank"
                  >
                    <div className="bg-[#fff2f8] dark:bg-gradient-to-l from-black/10 to-[#fff2f8] rounded-2xl px-5 py-5 h-48 border border-neutral-200">
                      <div className="logo-container">
                        <Logo name="instagram" size={33} />
                      </div>
                      <p className=" font-semibold text-xs text-black/60 mt-2">
                        @ {instagramUsername}
                      </p>
                      <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                        <p className=" py-0.5 text-sm font-medium px-1.5 bg-pink-100 text-black w-20 rounded-full flex items-center justify-center hover:bg-pink-200 transition border border-neutral-300">
                          Follow
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Spotify */}

                  <Link href={spotifyLink} target="_blank">
                    <div className="bg-green-100 dark:bg-gradient-to-l from-black/20 to-green-100 rounded-2xl px-5 py-5 h-48 border border-neutral-200 relative overflow-hidden">
                      <div className="logo-container">
                        <Logo name="spotify" size={33} />
                        <div className="ripple"></div>

                        {/* Music Chords */}
                        <Music
                          className="music-chord chord1"
                          size={20}
                          strokeWidth={3}
                        />
                        <Music
                          className="music-chord chord2"
                          size={20}
                          strokeWidth={3}
                        />
                      </div>
                      <p className=" font-semibold sm:text-xs text-black/60 mt-2">
                        Spotify
                      </p>
                      <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 mt-8">
                        <IoPlaySkipBack />{" "}
                        <IoPlay className=" sm:text-5xl text-3xl" />{" "}
                        <IoPlaySkipForward />
                      </div>
                    </div>
                  </Link>

                  {/* Gmail */}
                  <Link href={`mailto:${user.email}`} target="_blank">
                    <div className="bg-[#ffe2e2] dark:bg-gradient-to-l from-black/10 to-[#ffe2e2] rounded-xl pl-5 py-5 h-48 border border-neutral-200">
                      <div className="logo-container">
                        <Logo name="gmail" size={35} />
                      </div>
                      <p className="font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words overflow-hidden text-ellipsis whitespace-nowrap">
                        {user.email}
                      </p>
                      <div className="flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                        <p className="py-0.5 text-sm font-medium px-1.5 bg-red-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-red-300 transition border border-neutral-300">
                          Mail
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* LinkedIn */}
                  <Link href={`${linkedinProfile}`} target="_blank">
                    <div className="bg-[#E9F4FA] dark:bg-gradient-to-l from-black/20 to-[#e9f3fa] rounded-xl px-5 py-5 h-48  border border-neutral-200">
                      <div className=" logo-container">
                        <Logo name="linkedin" size={35} />
                      </div>
                      <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                        {linkedinProfile}
                      </p>
                      <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                        <p className=" py-0.5 text-sm font-medium px-1.5 bg-blue-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-blue-300 transition border border-neutral-300">
                          Connect
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* GitHub */}
                  <Link
                    href={`https://github.com/${githubUsername}`}
                    target="_blank"
                  >
                    <div className="bg-gray-50 dark:bg-gradient-to-l from-black/10 to-gray-50 rounded-xl px-5 py-5 h-48 border border-neutral-200">
                      <div className=" logo-container">
                        <Logo name="github" size={35} />
                      </div>
                      <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                        {linkedinProfile}
                      </p>
                      <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                        <p className=" py-0.5 text-sm font-medium px-1.5 bg-neutral-800 text-white w-20 rounded-full flex items-center justify-center hover:bg-neutral-950 transition border border-neutral-50">
                          Profile
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Youtube */}
                  <Link
                    href={`https://www.youtube.com/@${youtubeChannel}`}
                    target="_blank"
                  >
                    <div className="bg-[#ffe7e7] dark:bg-gradient-to-l from-black/10 to-[#ffe7e7] rounded-xl px-5 py-5 h-48 border border-neutral-200">
                      <div className=" logo-container">
                        <Logo name="youtube" size={35} />
                      </div>
                      <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                        {linkedinProfile}
                      </p>
                      <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                        <p className=" py-0.5 text-sm font-medium px-1.5 bg-rose-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-rose-300 transition border border-neutral-300">
                          Channel
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Twitter */}
                  <Link
                    href={`https://x.com/${twitterUsername}`}
                    target="_blank"
                  >
                    <div className="bg-[#f5f5f5] dark:bg-gradient-to-l from-black/10 to-[#e4f3ff] rounded-xl px-5 py-5 h-48 border border-neutral-200">
                      <div className=" logo-container">
                        <Logo name="twitter" size={35} />
                      </div>
                      <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                        {linkedinProfile}
                      </p>
                      <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                        <p className=" py-0.5 text-sm font-medium px-1.5 bg-neutral-800 text-white w-20 rounded-full flex items-center justify-center hover:bg-neutral-950 transition border border-neutral-200">
                          Follow
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Threads */}
                  <Link
                    href={`https://www.threads.net/@${threadsUsername}`}
                    target="_blank"
                  >
                    <div className="bg-gray-50 dark:bg-gradient-to-l from-black/10 to-gray-50 rounded-xl px-5 py-5 h-48 border border-neutral-200">
                      <div className=" logo-container">
                        <Logo name="threads" size={35} />
                      </div>
                      <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                        {linkedinProfile}
                      </p>
                      <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                        <p className=" py-0.5 text-sm font-medium px-1.5 bg-neutral-800 text-white w-20 rounded-full flex items-center justify-center hover:bg-neutral-950 transition border border-neutral-200">
                          Follow
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* FavouriteQuote */}
                  <div className="relative rounded-xl col-span-2 h-48 overflow-hidden">
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />

                    {/* Content */}
                    <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-5 py-5 h-full rounded-xl flex flex-col items-center justify-center">
                      {/* FavQuotes component */}
                      <p className="font-normal text-sm sm:text-base text-slate-300 relative z-40">
                        {user.favoriteQuote}
                      </p>

                      <Meteors number={20} />
                    </div>
                  </div>

                  {/* Photo */}
                  <div className="bg-gray-200 rounded-xl px-5 py-5 col-span-2 row-span-2 h-[300px] border border-neutral-200">
                    pic
                  </div>

                  {/* Location */}
                  <Link
                    href=""
                    className="bg-gray-200 rounded-xl px-5 py-5 sm:col-span-2 col-span-2 h-48 border border-neutral-200"
                  >
                    <div>location</div>
                  </Link>

                  {/* Occupation */}
                  <div className="bg-gray-200 rounded-xl px-5 py-5  h-48 border border-neutral-200">
                    occupation
                  </div>

                  {/* Custom_Link */}
                  <Link href={`${customLink}`} target="_blank">
                    <div className="bg-gray-200 rounded-xl px-5 py-5 h-48 border border-neutral-200">
                      custom link
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
