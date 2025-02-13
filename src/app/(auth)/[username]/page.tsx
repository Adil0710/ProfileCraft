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
import { Music, RotateCcw } from "lucide-react";
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import LocationCard from "@/components/LocationCard";
import { motion } from "framer-motion";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";

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
      <div className="relative w-full flex flex-col gap-5 items-center justify-center min-h-screen">
        <Background />
        <p>{error}</p>
        <Button onClick={() => window.location.reload()}>
          <RotateCcw size={16} className=" mr-1" />
          Retry
        </Button>
        <div className="absolute sm:left-10 sm:bottom-2 -bottom-10 sm:space-y-7 space-y-7 pb-3 left-3">
          <div className="flex flex-row">
            <Link href="/sign-up">
              <ShinyButton>Create Profile</ShinyButton>
            </Link>{" "}
            <Separator
              orientation="vertical"
              className="h-auto w-[1px] bg-gray-300 dark:bg-neutral-600 mx-4"
            />{" "}
            <Link href="/sign-in">
              <ShinyButton className="bg-black/5">Log In</ShinyButton>
            </Link>
          </div>
          <div className="flex flex-row text-sm sm:text-base">
            <p className="text-neutral-500">
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
              className="h-auto w-[1px] bg-gray-300 dark:bg-neutral-600 mx-4"
            />{" "}
            <p className="text-neutral-500">
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
    );

  // Extract social media platforms and URLs
  const socialMediaLinks = user?.socialMediaLinks || [];

  // Map social media links to create a username object
  const userNames = socialMediaLinks.reduce((acc, link) => {
    acc[link.platform.toLowerCase()] = link.platform_username;
    return acc;
  }, {} as Record<string, string>);

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
                  <BlurFade delay={0.002}>
                    <div className="relative w-36 h-36 rounded-full bg-slate-300 dark:bg-slate-800 flex items-center justify-center">
                      <Image
                        src={
                          user.profilePhoto && user.profilePhoto.trim() !== ""
                            ? user.profilePhoto
                            : user.gender === "Female"
                            ? female
                            : male
                        }
                        alt={user.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                        priority
                      />
                    </div>
                  </BlurFade>

                  <div className="mt-10">
                    <BlurFade delay={0.1}>
                      <h1 className="sm:text-5xl text-4xl font-bold dark:text-neutral-300">
                        {user.name}
                      </h1>
                    </BlurFade>
                    <BlurFade delay={0.15}>
                      <h2 className="mt-3 font-medium text-neutral-500 dark:text-neutral-500 sm:text-base text-sm">
                        @{user.username}
                      </h2>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                      <p className=" mt-3 font-medium dark:text-neutral-300 text-neutral-700 ">
                        {user.about}
                      </p>
                    </BlurFade>
                  </div>
                </div>
                <div className="absolute sm:left-10 sm:bottom-2 -bottom-10 sm:space-y-7 space-y-7 pb-3 left-3">
                  <div className="flex flex-row">
                    <Link href="/sign-up">
                      <ShinyButton>Create Profile</ShinyButton>
                    </Link>{" "}
                    <Separator
                      orientation="vertical"
                      className="h-auto w-[1px] bg-gray-300 dark:bg-neutral-600 mx-4"
                    />{" "}
                    <Link href="/sign-in">
                      <ShinyButton className="bg-black/5">Log In</ShinyButton>
                    </Link>
                  </div>
                  <div className="flex flex-row text-sm sm:text-base">
                    <p className="text-neutral-500">
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
                      className="h-auto w-[1px] bg-gray-300 dark:bg-neutral-600 mx-4"
                    />{" "}
                    <p className="text-neutral-500">
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
              <div className="w-full h-auto lg:h-screen overflow-y-auto pt-28 sm:pb-5 pb-20 md:pr-0 pr-0 lg:pr-10 hidden-scrollbar">
                <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-4">
                  {/* LinkedIn */}
                  {linkedinProfile && (
                    <Link href={`${linkedinProfile}`} target="_blank">
                      <BlurFade delay={{ lg: 0.25, base: 0.002 }}>
                        <div className="bg-gradient-to-br dark:from-sky-300 dark:to-blue-600 from-sky-200 to-blue-500 rounded-xl px-5 py-5 h-48  ">
                          <div className=" logo-container">
                            <Logo name="linkedin" size={35} />
                          </div>
                          <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words overflow-hidden text-ellipsis whitespace-nowrap">
                            {linkedinProfile}
                          </p>
                          <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                            <p className=" py-0.5 text-sm font-medium px-1.5 bg-blue-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-blue-300 transition">
                              Connect
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                    </Link>
                  )}

                  {/* Spotify */}

                  {spotifyLink && (
                    <Link href={spotifyLink} target="_blank">
                      <BlurFade delay={{ lg: 0.3, base: 0.1 }}>
                        <div className="bg-gradient-to-br dark:from-green-200 dark:to-emerald-500 from-green-100 to-emerald-400 rounded-2xl px-5 py-5 h-48 relative">
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
                      </BlurFade>
                    </Link>
                  )}

                  {/* Gmail */}

                  {user.email && (
                    <Link href={`mailto:${user.email}`} target="_blank">
                      <BlurFade delay={{ lg: 0.35, base: 0.15 }}>
                        <div className="bg-gradient-to-br dark:from-rose-300 dark:to-red-600 from-rose-200 to-red-500 rounded-xl pl-5 py-5 h-48 ">
                          <div className="logo-container">
                            <Logo name="gmail" size={35} />
                          </div>
                          <p className="font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words overflow-hidden text-ellipsis whitespace-nowrap">
                            {user.email}
                          </p>
                          <div className="flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                            <p className="py-0.5 text-sm font-medium px-1.5 bg-red-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-red-300 transition">
                              Mail
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                    </Link>
                  )}

                  {/* Instagram */}

                  {instagramUsername && (
                    <Link
                      href={`https://www.instagram.com/${instagramUsername}`}
                      target="_blank"
                    >
                      <BlurFade delay={0.2}>
                        <div className=" bg-gradient-to-br dark:from-pink-300 dark:to-purple-500 from-pink-200 to-purple-400 rounded-2xl px-5 py-5 h-48">
                          <div className="logo-container">
                            <Logo name="instagram" size={33} />
                          </div>
                          <p className=" font-semibold text-xs text-black/60 mt-2">
                            @ {instagramUsername}
                          </p>
                          <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                            <p className=" py-0.5 text-sm font-medium px-1.5 bg-pink-100 text-black w-20 rounded-full flex items-center justify-center hover:bg-pink-200 transition">
                              Follow
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                    </Link>
                  )}

                  {/* GitHub */}

                  {githubUsername && (
                    <Link
                      href={`https://github.com/${githubUsername}`}
                      target="_blank"
                    >
                      {" "}
                      <BlurFade delay={0.25}>
                        <div className="bg-gradient-to-br dark:from-neutral-100 dark:to-neutral-500  from-neutral-50 to-neutral-400 rounded-xl px-5 py-5 h-48 ">
                          <div className=" logo-container">
                            <Logo name="github" size={35} />
                          </div>
                          <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                            {githubUsername}
                          </p>
                          <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                            <p className=" py-0.5 text-sm font-medium px-1.5 bg-neutral-800 text-white w-20 rounded-full flex items-center justify-center hover:bg-neutral-950 transition">
                              Profile
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                    </Link>
                  )}

                  {/* Youtube */}

                  {youtubeChannel && (
                    <Link
                      href={`https://www.youtube.com/@${youtubeChannel}`}
                      target="_blank"
                    >
                      <BlurFade delay={0.3}>
                        <div className="bg-gradient-to-r from-red-300 dark:to-red-600 to-red-500 rounded-xl px-5 py-5 h-48 ">
                          <div className=" logo-container">
                            <Logo name="youtube" size={35} />
                          </div>
                          <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                            @ {youtubeChannel}
                          </p>
                          <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                            <p className=" py-0.5 text-sm font-medium px-1.5 bg-rose-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-rose-300 transition">
                              Channel
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                    </Link>
                  )}

                  {/* Twitter */}

                  {twitterUsername && (
                    <Link
                      href={`https://x.com/${twitterUsername}`}
                      target="_blank"
                    >
                      <BlurFade delay={0.35}>
                        <div className="bg-gradient-to-br dark:from-[#daeeff] dark:to-neutral-500 from-[#dcefff] to-neutral-400 rounded-xl px-5 py-5 h-48 ">
                          <div className=" logo-container">
                            <Logo name="twitter" size={35} />
                          </div>
                          <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                            @ {twitterUsername}
                          </p>
                          <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                            <p className=" py-0.5 text-sm font-medium px-1.5 bg-neutral-800 text-white w-20 rounded-full flex items-center justify-center hover:bg-neutral-950 transition">
                              Follow
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                    </Link>
                  )}

                  {/* Threads */}

                  {threadsUsername && (
                    <Link
                      href={`https://www.threads.net/@${threadsUsername}`}
                      target="_blank"
                    >
                      <BlurFade delay={0.4}>
                        <div className="bg-gradient-to-br dark:from-neutral-100 dark:to-neutral-500  from-neutral-50 to-neutral-400 rounded-xl px-5 py-5 h-48 ">
                          <div className=" logo-container">
                            <Logo name="threads" size={35} />
                          </div>
                          <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                            {threadsUsername}
                          </p>
                          <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                            <p className=" py-0.5 text-sm font-medium px-1.5 bg-neutral-800 text-white w-20 rounded-full flex items-center justify-center hover:bg-neutral-950 transition">
                              Follow
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                    </Link>
                  )}

                  {/* FavouriteQuote */}

                  {user.favoriteQuote && (
                    <motion.div
                      initial={{
                        offset: 6,
                        opacity: 0,
                        filter: "blur(6px)",
                      }}
                      animate={{
                        offset: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        delay: 0.04 + 0.45,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="relative rounded-xl md:col-span-3 sm:col-span-2 col-span-2 lg:col-span-2 h-48 overflow-hidden"
                    >
                      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.95] rounded-full blur-3xl" />

                      {/* Content */}
                      <div className="relative shadow-xl bg-gray-900/10 px-5 py-5 h-full rounded-xl flex flex-col items-center justify-center">
                        {/* FavQuotes component */}
                        <p className="font-medium text-sm sm:text-base text-slate-800 dark:text-slate-100 relative z-40">
                          {user.favoriteQuote}
                        </p>

                        <Meteors number={20} />
                      </div>
                    </motion.div>
                  )}

                  {/* Photo */}
                  {user.image && (
                    <motion.div
                      initial={{
                        offset: 6,
                        opacity: 0,
                        filter: "blur(6px)",
                      }}
                      animate={{
                        offset: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        delay: 0.04 + 0.5,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="bg-gray-50 relative dark:bg-gray-800 rounded-xl md:col-span-3 sm:col-span-2 col-span-2 lg:col-span-2 sm:h-auto md:h-[400px] h-[400px] row-span-2 overflow-hidden border border-neutral-200 dark:border-none "
                    >
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        className="w-full h-full object-cover"
                        priority
                      />
                    </motion.div>
                  )}

                  {/* Occupation */}

                  {user.occupation && (
                    <motion.div
                      initial={{
                        offset: 6,
                        opacity: 0,
                        filter: "blur(6px)",
                      }}
                      animate={{
                        offset: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        delay: 0.04 + 0.5,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className=" bgcustom rounded-xl px-5 py-5 col-span-2  h-48 border "
                    >
                      <div className="">
                        <img
                          width="37"
                          height="37"
                          src="https://img.icons8.com/emoji/48/rocket-emji.png"
                          alt="rocket-emji"
                        />
                      </div>
                      <p className=" font-semibold w-full mx-auto sm:text-sm text-xs text-center text-black/70 mt-2 ">
                        {" "}
                        Proudly I&apos;m a
                      </p>
                      <p className=" font-bold w-full text-center text-base text-black/90 mt-1 ">
                        {" "}
                        {user.occupation}
                      </p>
                    </motion.div>
                  )}

                  {/* Custom_Link */}

                  {customLink && (
                    <Link href={`${customLink}`} target="_blank">
                      <BlurFade delay={0.55}>
                        <div className="bg-gradient-to-br dark:from-pink-300 dark:to-violet-500 from-pink-200 to-violet-400 rounded-xl px-5 pb-5 pt-4 h-48  sm:col-span-2 col-span-1 ">
                          <div className=" logo-container shadow-lg rounded-md bg-blue-200">
                            <img
                              width="40"
                              height="40"
                              src="https://img.icons8.com/bubbles/100/geography.png"
                              alt="geography"
                            />
                          </div>
                          <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words overflow-hidden text-ellipsis whitespace-nowrap">
                            {customLink}
                          </p>
                          <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                            <p className=" py-0.5 text-sm font-medium px-1.5 bg-blue-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-blue-300 transition">
                              Visit
                            </p>
                          </div>
                        </div>
                      </BlurFade>
                    </Link>
                  )}

                  {/* Location */}

                  {user.location && (
                    <LocationCard location={`${user.location}`} />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// initial={{
//                       offset: 6, // Move 20 units down initially
//                       opacity: 0,
//                       filter: "blur(6px)", // Blur effect
//                     }}
//                     animate={{
//                       offset: 0, // Move to original position
//                       opacity: 1,
//                       filter: "blur(0px)", // Remove blur
//                     }}
//                     transition={{
//                       delay: 0.04 + 0.35, // Delay before animation starts
//                       duration: 0.4, // Animation duration
//                       ease: "easeOut", // Easing function
//                     }}
