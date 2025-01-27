import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function Howitworks() {
  return (
    <div
      id="features"
      className=" border-t border-black/[0.1] dark:border-white/[0.1] w-full h-full bg-white dark:bg-black flex justify-center pt-10 min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12 animate__animated animate__fadeIn">
          <h2 className="sm:text-4xl text-xl font-bold dark:text-white text-black mb-4">
            How ProfileCraft Works
          </h2>
          <p className="dark:text-neutral-300 text-neutral-700 sm:text-lg text-base">
            Create your perfect profile in three simple steps
          </p>
        </div>
        <div className=" py-8 pt-12 flex flex-col items-center justify-center gap-16">
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 mt-4 left-0 w-full h-1 bg-indigo-600 transform -translate-y-1/2"></div>
            <div className="md:hidden block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-indigo-600 transform "></div>
            <div className="grid md:grid-cols-3 md:gap-10 gap-14">
              <div className="relative bg-gray-100 dark:bg-neutral-800 p-8 rounded-xl animate__animated animate__fadeInLeft">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <div className="mt-8 text-center">
                  <div className="h-24 w-24 mx-auto mb-6 bg-gray-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-indigo-500"
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
              </div>

              <div
                className="relative bg-gray-100 dark:bg-neutral-800 p-8 rounded-xl animate__animated animate__fadeInLeft"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <div className="mt-8 text-center">
                  <div className="h-24 w-24 mx-auto mb-6 bg-gray-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-indigo-500"
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
              </div>

              <div
                className="relative bg-gray-100 dark:bg-neutral-800 p-8 rounded-xl animate__animated animate__fadeInLeft"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <div className="mt-8 text-center">
                  <div className="h-24 w-24 mx-auto mb-6 bg-gray-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-indigo-500"
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
              </div>
            </div>
          </div>
          <Link href="/sign-up">
            {" "}
            <Button className=" bg-indigo-600 text-white hover:bg-indigo-500">
              Start Creating Your Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Howitworks;
