import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Meteors } from "./ui/meteors";
import { Separator } from "./ui/separator";
import Link from "next/link";

export default function LoadingPublic() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      <div className="lg:w-[35%] flex-shrink-0 flex flex-col justify-between w-full h-auto lg:h-full pt-28 pb-5 sm:pl-10 pl-5">
        <div>
          <Skeleton className="relative w-36 h-36 rounded-full"></Skeleton>

          <div className="mt-10">
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="mt-3 w-[20%] h-5 " />
            <Skeleton className=" mt-3 w-[80%] h-8 " />
          </div>
        </div>
        <div className="absolute sm:left-10 sm:bottom-2 -bottom-10 sm:space-y-7 space-y-7 pb-3 left-3">
          <div className=" flex flex-row">
            <Skeleton className="h-8 w-[125px]" />{" "}
            <Separator
              orientation="vertical"
              className="h-auto w-[1px] bg-gray-300 dark:bg-neutral-600 mx-4"
            />{" "}
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="flex flex-row text-sm sm:text-base">
            <p className="text-neutral-500">
              Powered by{" "}
              <Link
                href="/"
                className="underline text-neutral-800 hover:text-black duration-200"
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
                className=" text-neutral-800 font-semibold hover:text-black duration-200"
              >
                Adil
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side (Scrollable) */}
      <div className="w-full h-auto lg:h-screen pt-28 sm:pb-5 pb-20 md:pr-0 pr-0 lg:pr-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 m-4">
          {Array.from({ length: 8 }).map((_, index) =>
            index === 1 ? (
              <Skeleton className=" rounded-2xl px-5 py-5 h-48" key={index}>
                <Skeleton className=" h-9 w-9" />
                <Skeleton className=" h-5 w-[80%] mt-3" />
                <div className=" flex flex-row items-center justify-between w-full mt-8">
                  <Skeleton className=" sm:h-9 h-7 w-7 sm:w-9" />
                  <Skeleton className=" sm:h-12 h-9 w-9 sm:w-12" />
                  <Skeleton className=" sm:h-9 h-7 w-7 sm:w-9" />
                </div>
              </Skeleton>
            ) : (
              <Skeleton className=" rounded-2xl px-5 py-5 h-48" key={index}>
                <Skeleton className=" h-9 w-9" />
                <Skeleton className=" h-5 w-[80%] mt-3" />
                <Skeleton className=" h-7 w-20 rounded-full sm:mt-12 mt-10" />
              </Skeleton>
            )
          )}

          <div className="relative rounded-2xl col-span-2 h-48 overflow-hidden">
            {/* Background gradient and blur effect */}

            {/* Content */}
            <Skeleton className="relative shadow-xl border p-10 h-full rounded-2xl flex flex-col justify-center">
              {/* FavQuotes component */}
              <Skeleton className="h-4 w-full sm:text-base relative z-50" />
              <Skeleton className="h-4 mt-2 w-[100%] sm:text-base relative z-50" />
              <Skeleton className="h-4 mt-2 w-[70%] sm:text-base relative z-50" />

              {/* Meteor effect */}
              <Meteors number={20} />
            </Skeleton>
          </div>

          <Skeleton className=" rounded-2xl p-10 col-span-2 row-span-2 h-[400px]" />

          <Skeleton className=" rounded-2xl p-10 sm:col-span-2 h-48" />
          <Skeleton className=" rounded-2xl p-10 h-48" />
          <Skeleton className=" rounded-2xl p-10 h-48" />
        </div>
      </div>
    </div>
  );
}
