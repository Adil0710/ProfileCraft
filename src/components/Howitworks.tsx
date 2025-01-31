"use client";
import React, { useState } from "react";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "./ui/header";

function Howitworks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div
      id="features"
      className=" border-t border-black/[0.1] dark:border-white/[0.1] w-full h-full bg-white dark:bg-black flex justify-center pt-10 min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-8">
        <Header
          header=" How ProfileCraft Works"
          description="Create your perfect profile in three simple steps"
        />
        <div className=" py-8 pt-12 flex flex-col items-center justify-center gap-16">
          <div className="relative">
            <div
              className={`hidden md:block absolute top-1/2 mt-4 left-0 w-full bg-gray-300 dark:bg-neutral-600 h-1 transition-colors duration-700 transform -translate-y-1/2 `}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width:
                    hoveredStep === 1
                      ? "50%"
                      : hoveredStep === 2
                      ? "100%"
                      : "0%",
                }}
                transition={{ duration: 1 }}
                className="h-1 bg-indigo-600"
              />
            </div>
            <div className="md:hidden block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gray-300 dark:bg-neutral-600 transform ">
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height:
                    hoveredStep === 1
                      ? "50%"
                      : hoveredStep === 2
                      ? "100%"
                      : "0%",
                }}
                transition={{ duration: 1 }}
                className="w-1 h-full bg-indigo-600"
              >
                {" "}
              </motion.div>
            </div>
            <div className="grid md:grid-cols-3 md:gap-10 gap-14">
              {/* <div className="relative group"> */}
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-0  group-hover:opacity-30 transition-all duration-500" id="el-iwncp6q6" style={{padding: "45px"}}></div> */}
              <motion.div
                className="relative bg-gray-100 dark:bg-neutral-800 p-8 rounded-xl animate__animated animate__fadeInLeft hover:bg-indigo-50 cursor-pointer group"
                onMouseEnter={() => setHoveredStep(1)}
                onMouseLeave={() => setHoveredStep(null)}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 1 * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <div className="mt-8 text-center">
                  <div className="h-24 w-24 mx-auto mb-6 bg-gray-200 dark:bg-neutral-700 group-hover:bg-gray-50 transition-all duration-300 dark:group-hover:bg-neutral-600 rounded-full flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-indigo-500 group-hover:scale-125 transition-transform group-hover:rotate-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Create Account</h3>
                  <p className="text-neutral-700 dark:text-neutral-400">
                    Sign up with your email and choose your unique username for
                    your profile link.
                  </p>
                </div>
              </motion.div>
              {/* </div> */}

              <motion.div
                className="relative bg-gray-100 dark:bg-neutral-800 p-8 rounded-xl animate__animated animate__fadeInLeft hover:bg-indigo-50 cursor-pointer group"
                style={{ animationDelay: "0.2s" }}
                onMouseEnter={() => setHoveredStep(2)}
                onMouseLeave={() => setHoveredStep(null)}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 2 * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <div className="mt-8 text-center">
                  <div className="h-24 w-24 mx-auto mb-6 bg-gray-200 dark:bg-neutral-700 group-hover:bg-gray-50 transition-all duration-300 dark:group-hover:bg-neutral-600 rounded-full flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-indigo-500 group-hover:scale-125 transition-transform group-hover:rotate-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    Add Your Content
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-400">
                    Customize your grid with social links, bio, images, and
                    other personal details.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative bg-gray-100 dark:bg-neutral-800 p-8 rounded-xl animate__animated animate__fadeInLeft hover:bg-indigo-50 cursor-pointer group"
                style={{ animationDelay: "0.4s" }}
                onMouseEnter={() => setHoveredStep(2)}
                onMouseLeave={() => setHoveredStep(null)}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 3 * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <div className="mt-8 text-center">
                  <div className="h-24 w-24 mx-auto mb-6 bg-gray-200 dark:bg-neutral-700 group-hover:bg-gray-50 transition-all duration-300 dark:group-hover:bg-neutral-600 rounded-full flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-indigo-500 group-hover:scale-125 transition-transform group-hover:rotate-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    Share Your Profile
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-400">
                    Get your unique link and share your profile with the world.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          <Link href="/sign-up">
            {" "}
            <button
              className={`group relative rounded-full p-2 text-base font-semibold`}
            >
              <div className="absolute left-0 top-0 flex h-full w-10 items-center justify-end rounded-full transition-all duration-200 ease-in-out group-hover:w-full bg-indigo-600">
                <span className="mr-3 text-white transition-all flex duration-200 ease-in-out">
                  <ArrowRight size={20} />
                </span>
              </div>
              <span className="relative left-4 z-10 whitespace-nowrap px-8 font-semibold text-black dark:text-white transition-all duration-200 ease-in-out group-hover:-left-3 group-hover:text-white">
                Start Creating Your Profile
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Howitworks;
