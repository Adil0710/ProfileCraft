"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Meteors } from "./ui/meteors";
import axios from "axios";
import Link from "next/link";
import { Images, MessageSquareQuote, Music } from "lucide-react";
import Logo from "./Logo";
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import Image from "next/image";
import LocationCard from "./LocationCard";

// Define prop types
interface GridProps {
  profileUpdated: boolean;
  setProfileUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function Grid({ profileUpdated, setProfileUpdated }: GridProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const [profileDetails, setProfileDetails] = useState({
    profilePhoto: "",
    name: "",
    username: "",
    gender: "",
    about: "",
    favoriteQuote: "",
    image: "",
    location: "",
    occupation: "",
    socialMediaLinks: [
      {
        platform: "",
        platform_username: "",
      },
    ],
  });

  // Fetch profile details
  const getProfileDetails = async () => {
    try {
      const response = await axios.get("/api/get-profile-details");
      setProfileDetails(response.data.user); // Update profile details in state
      console.log(response);
    } catch (error) {
      console.log("Error fetching profile details:", error);
    }
  };

  useEffect(() => {
    getProfileDetails(); // Fetch details on component mount or user change
  }, []);

  useEffect(() => {
    if (profileUpdated) {
      getProfileDetails(); // Re-fetch details when profile is updated
      setProfileUpdated(false); // Reset the flag after fetching
    }
  }, [profileUpdated]);

  // Extract social media platforms and URLs
  const socialMediaLinks = profileDetails?.socialMediaLinks || [];

  // Map social media links to create a username object
  const userNames = socialMediaLinks.reduce((acc, link) => {
    acc[link.platform.toLowerCase()] = link.platform_username;
    return acc;
  }, {} as Record<string, string>);

  // Now you can access usernames by platform
  // console.log(userNames); // For debugging
  console.log("Details", profileDetails);

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
                <IoPlaySkipBack /> <IoPlay className=" sm:text-5xl text-3xl" />{" "}
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
              <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words overflow-hidden text-ellipsis whitespace-nowrap">
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
          <Link href={`https://github.com/${githubUsername}`} target="_blank">
            <div className="bg-gray-50 dark:bg-gradient-to-l from-black/10 to-gray-50 rounded-xl px-5 py-5 h-48 border border-neutral-200">
              <div className=" logo-container">
                <Logo name="github" size={35} />
              </div>
              <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                {githubUsername}
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
                {youtubeChannel}
              </p>
              <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                <p className=" py-0.5 text-sm font-medium px-1.5 bg-rose-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-rose-300 transition border border-neutral-300">
                  Channel
                </p>
              </div>
            </div>
          </Link>

          {/* Twitter */}
          <Link href={`https://x.com/${twitterUsername}`} target="_blank">
            <div className="bg-[#f5f5f5] dark:bg-gradient-to-l from-black/10 to-[#e4f3ff] rounded-xl px-5 py-5 h-48 border border-neutral-200">
              <div className=" logo-container">
                <Logo name="twitter" size={35} />
              </div>
              <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                {twitterUsername}
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
                {threadsUsername}
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
              {profileDetails.favoriteQuote ? (
                <p className="font-normal text-sm sm:text-base text-slate-300 relative z-40">
                  {profileDetails.favoriteQuote}
                </p>
              ) : (
                <p className="font-normal text-sm flex flex-col justify-center items-center gap-2 sm:text-base text-slate-300 relative z-40">
                  Add a Quote
                  <MessageSquareQuote />
                </p>
              )}

              <Meteors number={20} />
            </div>
          </div>

          {/* Photo */}
          <div className="bg-gray-50 relative dark:bg-gray-800 rounded-xl col-span-2 row-span-2 sm:h-auto h-[400px] overflow-hidden border border-neutral-200 dark:border-none ">
            {profileDetails.image ? (
              <Image
                src={profileDetails.image}
                alt={profileDetails.name}
                fill
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <div className=" h-full w-full flex justify-center items-center">
                <p className=" dark:text-slate-300 flex flex-col justify-center items-center gap-2">
                  Please Upload an image from profile
                  <Images />
                </p>
              </div>
            )}
          </div>

          {/* Location */}
          <LocationCard location={`${profileDetails.location}`} />
          {/* Occupation */}
          <div className=" bgcustom rounded-xl px-5 py-5  h-48 border ">
            <div className=" logo-container">
              <img
                width="37"
                height="37"
                src="https://img.icons8.com/emoji/48/rocket-emji.png"
                alt="rocket-emji"
              />
            </div>
            <p className=" font-semibold w-full mx-auto sm:text-sm text-base text-center text-black/70 mt-2 ">
              {" "}
              Proudly I&apos;m a
            </p>
            <p className=" font-bold w-full sm:text-sm text-lg text-center text-black/90 mt-1 ">
              {" "}
              {profileDetails.occupation}
            </p>
          </div>

          {/* Custom_Link */}
          <Link href={`${customLink}`} target="_blank">
            <div className="bg-[#e2efff] dark:bg-gradient-to-l from-black/10 to-[#e2efff] rounded-xl px-5 pb-5 pt-4 h-48 border border-neutral-200">
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
                <p className=" py-0.5 text-sm font-medium px-1.5 bg-blue-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-blue-300 transition border border-neutral-300">
                  Visit
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Grid;
