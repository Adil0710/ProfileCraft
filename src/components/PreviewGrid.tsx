"use client";
import React from "react";
import Logo from "./Logo";
import { Music, Sun } from "lucide-react";
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import Image from "next/image";
import { Meteors } from "./ui/meteors";
import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";
import BlurFade from "./ui/blur-fade";

import { Separator } from "./ui/separator";
import Header from "./ui/header";

function PreviewGrid() {
  return (
    <div
      id="preview"
      className=" z-0 w-full h-full bg-[#F7FAFF] dark:bg-neutral-950 min-h-screen py-10"
    >
      <div className="max-w-6xl mx-auto mt-10 h-full">
        <div className=" px-5">
        <Header
          header="Preview Your Bento Grid"
          description="See how your profile will look in real-time"
        />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 m-4">
          <AnimatePresence>

             {/* LinkedIn */}
             <BlurFade delay={0.002} inView>
              <motion.div
                whileHover={{ rotate: -4 }}
                className=" cursor-pointer"
              >
                <div className="bg-gradient-to-br dark:from-sky-300 dark:to-blue-600 from-sky-200 to-blue-500 rounded-xl px-5 py-5 h-48  ">
                  <div className=" logo-container">
                    <Logo name="linkedin" size={35} />
                  </div>
                  <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words overflow-hidden text-ellipsis whitespace-nowrap">
                    @yourhandle
                  </p>
                  <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                    <p className=" py-0.5 text-sm font-medium px-1.5 bg-blue-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-blue-300 transition ">
                      Connect
                    </p>
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          

            {/* Spotify */}
            <BlurFade delay={0.1} inView>
              <motion.div
                whileHover={{ rotate: -4 }}
                className=" cursor-pointer"
              >
                <div className="bg-gradient-to-br dark:from-green-200 dark:to-emerald-500 from-green-100 to-emerald-400 rounded-2xl px-5 py-5 h-48  relative">
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
                    <Music
                      className="music-chord chord3"
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
              </motion.div>
            </BlurFade>

            <BlurFade delay={0.15} inView>
              {/* Gmail */}
              <motion.div
                whileHover={{ rotate: 4 }}
                className=" cursor-pointer"
              >
                <div className="bg-gradient-to-br dark:from-rose-300 dark:to-red-600 from-rose-200 to-red-500 rounded-xl pl-5 py-5 h-48 ">
                  <div className="logo-container">
                    <Logo name="gmail" size={35} />
                  </div>
                  <p className="font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words overflow-hidden text-ellipsis whitespace-nowrap">
                    your email
                  </p>
                  <div className="flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                    <p className="py-0.5 text-sm font-medium px-1.5 bg-red-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-red-300 transition ">
                      Mail
                    </p>
                  </div>
                </div>
              </motion.div>
            </BlurFade>

             {/* Instagram */}
             <BlurFade delay={0.2} inView>
              <motion.div
                whileHover={{ rotate: 4 }}
                className=" cursor-pointer"
              >
                <div className=" bg-gradient-to-br dark:from-pink-300 dark:to-purple-500 from-pink-200 to-purple-400 rounded-2xl px-5 py-5 h-48">
                  <div className="logo-container">
                    <Logo name="instagram" size={33} />
                  </div>
                  <p className=" font-semibold text-xs text-black/60 mt-2">
                    @yourhandle
                  </p>
                  <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                    <p className=" py-0.5 text-sm font-medium px-1.5 bg-pink-100 text-black w-20 rounded-full flex items-center justify-center hover:bg-pink-200 transition ">
                      Follow
                    </p>
                  </div>
                </div>
              </motion.div>
            </BlurFade>

            {/* GitHub */}
            <BlurFade delay={0.25} inView>
              <motion.div
                whileHover={{ rotate: -4 }}
                className=" cursor-pointer"
              >
                <div className="bg-gradient-to-br dark:from-[#daeeff] dark:to-neutral-500  from-neutral-50 to-neutral-400 rounded-xl px-5 py-5 h-48 ">
                  <div className=" logo-container">
                    <Logo name="github" size={35} />
                  </div>
                  <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                    @yourhandle
                  </p>
                  <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                    <p className=" py-0.5 text-sm font-medium px-1.5 bg-neutral-800 text-white w-20 rounded-full flex items-center justify-center hover:bg-neutral-950 transition ">
                      Profile
                    </p>
                  </div>
                </div>
              </motion.div>
            </BlurFade>

            {/* Youtube */}
            <BlurFade delay={0.3} inView>
              <motion.div
                whileHover={{ rotate: 4 }}
                className=" cursor-pointer"
              >
                <div className="bg-gradient-to-r from-red-300 dark:to-red-600 to-red-500 rounded-xl px-5 py-5 h-48 ">
                  <div className=" logo-container">
                    <Logo name="youtube" size={35} />
                  </div>
                  <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                    Your Channel
                  </p>
                  <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                    <p className=" py-0.5 text-sm font-medium px-1.5 bg-rose-200 text-black w-20 rounded-full flex items-center justify-center hover:bg-rose-300 transition ">
                      Channel
                    </p>
                  </div>
                </div>
              </motion.div>
            </BlurFade>

            {/* Twitter */}
            <BlurFade delay={0.35} inView>
              <motion.div
                whileHover={{ rotate: -4 }}
                className=" cursor-pointer"
              >
                <div className="bg-gradient-to-br dark:from-yellow-200 dark:to-orange-400 from-yellow-100 to-orange-300 rounded-xl px-5 py-5 h-48 ">
                  <div className=" logo-container">
                    <Logo name="twitter" size={35} />
                  </div>
                  <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                    @yourhandle
                  </p>
                  <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                    <p className=" py-0.5 text-sm font-medium px-1.5 bg-neutral-800 text-white w-20 rounded-full flex items-center justify-center hover:bg-neutral-950 transition ">
                      Follow
                    </p>
                  </div>
                </div>
              </motion.div>
            </BlurFade>

            {/* Threads */}
            <BlurFade delay={0.4} inView>
              <motion.div
                whileHover={{ rotate: 4 }}
                className=" cursor-pointer"
              >
                <div className="bg-gradient-to-br dark:from-emerald-300 dark:to-sky-600 from-emerald-200 to-sky-500 rounded-xl px-5 py-5 h-48 ">
                  <div className=" logo-container">
                    <Logo name="threads" size={35} />
                  </div>
                  <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words">
                    @yourhandle
                  </p>
                  <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                    <p className=" py-0.5 text-sm font-medium px-1.5 bg-neutral-800 text-white w-20 rounded-full flex items-center justify-center hover:bg-neutral-950 transition ">
                      Follow
                    </p>
                  </div>
                </div>
              </motion.div>
            </BlurFade>

            {/* FavouriteQuote */}

            <motion.div
              initial={{
                offset: 6,
                opacity: 0,
                filter: "blur(6px)",
              }}
              whileInView={{
                offset: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  delay: 0.04 + 0.45,
                  duration: 0.4,
                  ease: "easeOut",
                },
              }}
              whileHover={{ rotate: 2 }}
              viewport={{ once: true }}
              className="relative rounded-xl md:col-span-3 sm:col-span-2 col-span-2 lg:col-span-2 h-48 overflow-hidden"
            >
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.95] rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative shadow-xl bg-gray-900/10 px-5 py-5 h-full rounded-xl flex flex-col items-center justify-center">
                {/* FavQuotes component */}

                <p className="font-medium text-sm sm:text-base text-slate-800 dark:text-slate-100 relative z-40">
                  It is not the strongest of the species that survive, nor the
                  most intelligent, but the one most responsive to change.
                </p>

                <Meteors number={20} />
              </div>
            </motion.div>

            {/* Photo */}

            <motion.div
              initial={{
                offset: 6,
                opacity: 0,
                filter: "blur(6px)",
              }}
              whileInView={{
                offset: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  delay: 0.04 + 0.5,
                  duration: 0.4,
                  ease: "easeOut",
                },
              }}
              whileHover={{ rotate: 3 }}
              viewport={{ once: true }}
              className="bg-gray-50 relative dark:bg-gray-800 rounded-xl col-span-2 md:col-span-3 sm:col-span-2 lg:col-span-2 row-span-2 md:h-[400px] sm:h-auto h-[400px] overflow-hidden  dark:border-none "
            >
              <Image
                src="/landing.jpg"
                alt="image"
                fill
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>

            {/* Occupation */}
            <motion.div
              initial={{
                offset: 6,
                opacity: 0,
                filter: "blur(6px)",
              }}
              whileInView={{
                offset: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  delay: 0.04 + 0.55,
                  duration: 0.4,
                  ease: "easeOut",
                },
              }}
              whileHover={{
                rotate: -2,
              }}
              viewport={{ once: true }}
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
                Software Developer
              </p>
            </motion.div>

            {/* Custom_Link */}
            <Link
              href="https://devadil.vercel.app"
              target="_blank"
              className=" cursor-pointer"
            >
              <motion.div
                initial={{
                  offset: 6,
                  opacity: 0,
                  filter: "blur(6px)",
                }}
                whileInView={{
                  offset: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    delay: 0.04 + 0.60,
                    duration: 0.4,
                    ease: "easeOut",
                  },
                }}
                whileHover={{
                  rotate: -4,
                }}
                viewport={{ once: true }}
                className="bg-gradient-to-br dark:from-pink-300 dark:to-violet-500 from-pink-200 to-violet-400 rounded-xl px-5 pb-5 pt-4 h-48  sm:col-span-2 col-span-1 "
              >
                <div className=" logo-container shadow-lg rounded-md bg-transparent">
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/bubbles/100/geography.png"
                    alt="geography"
                  />
                </div>
                <p className=" font-semibold sm:text-xs text-[10px] text-black/60 mt-1 break-words overflow-hidden text-ellipsis whitespace-nowrap">
                  Devadil.vercel.app
                </p>
                <div className=" flex flex-row items-center sm:text-3xl text-xl justify-between w-full text-neutral-800 sm:mt-12 mt-10">
                  <p className=" py-0.5 text-sm font-medium px-1.5 bg-purple-200 text-black w-20 rounded-full flex items-center justify-center  transition">
                    Visit
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Location */}

            <motion.div
              initial={{
                offset: 6,
                opacity: 0,
                filter: "blur(6px)",
              }}
              whileInView={{
                offset: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  delay: 0.04 + 0.65,
                  duration: 0.4,
                  ease: "easeOut",
                },
              }}
              whileHover={{
                rotate: 2,
              }}
              viewport={{ once: true }}
              className=" bg-gradient-to-br  dark:from-gray-200 dark:to-gray-900 from-gray-100 to-gray-800 rounded-xl p-5 sm:col-span-3 col-span-1 h-48 
        relative overflow-hidden cursor-pointer"
            >
               <div className="sm:block hidden absolute inset-0 bg-[url(https://res.cloudinary.com/eldoraui/image/upload/v1734021299/map_pcqdwb.png)] bg-[length:530px_430px] bg-[right_-75px] bg-no-repeat [mask-image:linear-gradient(to_bottom,black_50%,transparent)]" />
              <div className="flex flex-col justify-between h-full z-10 ">
                <div className="text-2xl flex flex-row gap-2 z-10  font-bold text-neutral-800 ">
                  <Sun className="w-8 h-8 text-neutral-800 " />
                  <Separator
                    orientation="vertical"
                    className="w-0.5 bg-neutral-500 rounded-full"
                  />
                  Solapur
                </div>

                <div className="flex items-center justify-between z-10">
                  <div>
                    <div className="text-3xl font-bold text-neutral-800 ">
                      28°C
                    </div>
                    <div className="text-sm font-medium text-neutral-800 ">
                      Clear
                    </div>
                  </div>
                </div>
              </div>

              {/* Add GlobeDemo in the bottom right corner */}
            </motion.div>

            
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default PreviewGrid;
