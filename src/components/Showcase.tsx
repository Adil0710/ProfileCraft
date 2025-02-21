"use client";
import React from "react";

import { cn } from "@/lib/utils";
import Header from "./ui/header";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ShineBorder } from "./magicui/shine-border";
import X from "./X";
import Image from "next/image";
import Link from "next/link";

const hoverVariant = {
  whileHover: { rotate: 5 },
};

function Showcase() {
  return (
    <div
      id="showcase"
      className="relative overflow-x-hidden max-w-screen h-full bg-[#F7FAFF] dark:bg-neutral-950 flex flex-col justify-center items-center min-h-screen pb-10 sm:pt-0 pt-20 z-0"
    >
      <div className="absolute min-h-52 min-w-52 sm:top-5 top-20 left-[93%] -translate-x-[93%] items-center justify-center z-00">
        <div className="relative w-full max-w-lg">
          <div
            className={cn(
              "absolute right-12 -top-40  sm:h-52 sm:w-52 h-32 w-32 animate-pop-blob rounded-sm bg-blue-400 p-8 opacity-45 dark:opacity-25 mix-blend-multiply blur-3xl filter"
            )}
          ></div>
          <div
            className={cn(
              "absolute sm:-right-20 right-0 -top-40  sm:h-52 sm:w-52 h-32 w-32 animate-pop-blob rounded-sm bg-purple-400 p-8 opacity-45 dark:opacity-25 mix-blend-multiply blur-3xl filter"
            )}
          ></div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-8 pb-8">
        <Header
          header="Profile Showcase"
          description=" See how others are using ProfileCraft to present their digital
            identity"
          className="z-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <ShineBorder
            className="p-0"
            color={["#9c27b0", "#2196f3", "#FE8FB5"]}
          >
            <div className="bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden animate__animated animate__fadeInUp">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-200 rounded-full overflow-hidden">
                    <Image
                      src={`https://res.cloudinary.com/dknqlet5o/image/upload/v1734007370/ProfileCraft_user_profiles/6714afb53e4df1884f9c1f66_profilePhoto.jpg`}
                      alt="Adil Patel"
                      width={100}
                      height={100}
                      objectFit="cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">@adil</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Fullstack Developer
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <motion.div
                    variants={hoverVariant}
                    className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition"
                  >
                    <X className=" w-6 h-6 mb-2 text-indigo-600 dark:text-indigo-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Twitter
                    </span>
                  </motion.div>
                  <div className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition">
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-500 mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.302 3.438 9.8 8.207 11.385.6.11.82-.26.82-.577v-2.012c-3.338.726-4.042-1.416-4.042-1.416-.546-1.39-1.333-1.76-1.333-1.76-1.091-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.49.998.107-.776.418-1.306.76-1.606-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.383 1.236-3.223-.124-.303-.535-1.522.116-3.176 0 0 1.007-.323 3.3 1.23a11.49 11.49 0 0 1 3.003-.404c1.02.004 2.044.138 3.003.404 2.29-1.553 3.297-1.23 3.297-1.23.653 1.654.242 2.873.118 3.176.77.84 1.235 1.913 1.235 3.223 0 4.61-2.807 5.624-5.48 5.921.43.37.813 1.103.813 2.224v3.293c0 .32.217.693.825.576C20.565 22.093 24 17.596 24 12.297 24 5.67 18.627.297 12 .297Z"
                      />
                    </svg>

                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      GitHub
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Full-stack developer passionate about creating beautiful web
                  experiences.
                </p>
                <Link href="https://profilecraft.vercel.app/adil">
                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </ShineBorder>
          <ShineBorder
            className="p-0"
            color={["#9c27b0", "#2196f3", "#FE8FB5"]}
          >
            <div className="bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden animate__animated animate__fadeInUp">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-200 rounded-full"></div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">@digital_artist</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Digital Artist
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition">
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-500 mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Instagram
                    </span>
                  </div>
                  <div className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition">
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-500 mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      LinkedIn
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Creating digital art and illustrations for brands worldwide.
                </p>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
                  View Profile
                </button>
              </div>
            </div>
          </ShineBorder>
          <ShineBorder
            className="p-0"
            color={["#9c27b0", "#2196f3", "#FE8FB5"]}
          >
            <div className="bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden animate__animated animate__fadeInUp">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-200 rounded-full"></div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">@content_creator</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Content Creator
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition">
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-500 mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      YouTube
                    </span>
                  </div>
                  <div className="bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-lg p-4 hover:bg-gray-200 transition">
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-500 mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.62-.99-5-2.62-6.84-1.66-1.86-3.98-3.12-6.38-3.16-.03 0-.05 0-.08 0-.61 0-1.09.5-1.09 1.11s.48 1.1 1.09 1.11c1.9.05 3.9.98 5.31 2.53 1.37 1.49 2.17 3.52 2.17 5.65 0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c.62 0 1.11-.5 1.11-1.11s-.49-1.11-1.11-1.11zM9.55 9.78c-.41 0-.82.08-1.21.24-1.46.56-2.41 2.06-2.41 3.77 0 2.2 1.64 4 3.66 4s3.66-1.8 3.66-4c0-.42-.07-.83-.19-1.22-.27-.83-.78-1.53-1.47-2.06-.71-.54-1.58-.82-2.42-.82zM10.5 11c.42 0 .83.14 1.17.41.37.3.63.7.76 1.12.08.24.12.49.12.75 0 1.1-.84 2-1.88 2s-1.88-.9-1.88-2 .84-2 1.88-2z" />
                    </svg>

                    <span className="text-sm text-gray-600 dark:text-gray-400">
                     Threads
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Lifestyle vlogger sharing daily adventures and tips.
                </p>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition">
                  View Profile
                </button>
              </div>
            </div>
          </ShineBorder>
        </div>
      </div>
      <Link href={"/sign-up"}>
        <button
          className={`group relative rounded-full p-2 text-base font-semibold mt-10`}
        >
          <div className="absolute left-0 top-0 flex h-full w-10 items-center justify-end rounded-full transition-all duration-200 ease-in-out group-hover:w-full bg-indigo-600">
            <span className="mr-3 text-white transition-all flex duration-200 ease-in-out">
              <ArrowRight size={20} />
            </span>
          </div>
          <span className="relative left-4 z-10 whitespace-nowrap px-8 font-semibold text-black dark:text-white transition-all duration-200 ease-in-out group-hover:-left-3 group-hover:text-white">
            Join These Creators
          </span>
        </button>
      </Link>
    </div>
  );
}

export default Showcase;
