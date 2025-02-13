"use client";
import React from "react";
import { Keyboard } from "@/components/eldoraui/keyboard";

import { LogoCluster } from "@/components/eldoraui/logocluster";
import { Map } from "@/components/eldoraui/map";
import { BentoCard } from "./eldoraui/bentogrid";
import { AnimatedBeamMultipleOutput } from "./AnimatedBeamMultiple";
import Header from "./ui/header";
import { cn } from "@/lib/utils";
import { CardSpotlightDemo } from "./CardSpotLight";

export function HowWorks() {
  return (
    <div
      className=" bg-white flex flex-col justify-center items-center dark:bg-black min-h-screen py-10 px-5 pt-20"
      // style={{
      //   backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.2) 1px, transparent 0.5px)`,

      //   backgroundSize: "8px 8px",
      //   backgroundRepeat: "repeat",
      // }}
    >
      <Header
        header=" How ProfileCraft Works"
        description="Create your perfect profile in three simple steps"
        className="mb-2"
      />
      <div className="mt-0 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2 max-w-6xl">
        <BentoCard
          eyebrow="ProfileCraft"
          title="Perfect Social Profile"
          description="Share all your social profiles, bio, and more with one beautiful link. Create your personalized profile grid in minutes with ProfileCraft."
          graphic={
            <div>
              <AnimatedBeamMultipleOutput className="bg-white dark:bg-gray-950 z-10 absolute right-0 top-0 h-full rounded-none border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_-10%,#000_-50%)] group-hover:scale-105" />
              <div
                className={cn(
                  "absolute -left-1 -top-10 h-28 w-28  animate-pop-blob rounded-sm bg-blue-400 z-[1000] p-8 dark:opacity-100 opacity-50 mix-blend-multiply blur-3xl filter"
                )}
              ></div>
            </div>
          }
          fade={["bottom"]}
          className="max-lg:rounded-t-4xl lg:rounded-tl-4xl lg:col-span-3"
        />
        <BentoCard
          eyebrow="Signup / Login"
          title="Get Started"
          description="Sign up with your email and choose your unique username or login with Google OAuth for your profile link."
          graphic={
            <>
              <CardSpotlightDemo />
              <div
                className={cn(
                  "absolute -right-1 -top-10 h-28 w-28  animate-pop-blob rounded-sm bg-purple-400 z-50 p-8 opacity-50 mix-blend-multiply blur-3xl filter"
                )}
              ></div>
            </>
          }
          fade={["bottom"]}
          className="lg:rounded-tr-4xl lg:col-span-3"
        />
        <BentoCard
          eyebrow="Plan"
          title="It's Free Forever"
          description="PrifileCraft is free to use for everyone. No credit card required. J ust sign up and start creating your profile."
          graphic={
            <div className="flex size-full pl-10 pt-10">
              <Keyboard highlighted={["F", "R","E", "E"]} />
            </div>
          }
          className="lg:rounded-bl-4xl lg:col-span-2"
        />
        <BentoCard
          eyebrow="Create Profile"
          title="Add Your Content"
          description="Add your details like social links, bio, images, and other personal details. Your profile is ready."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Share"
          title="Show it to the World"
          description="Get your unique link and share your profile link with the world. You can also share it on social media platforms."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:rounded-br-4xl lg:col-span-2"
        />
      </div>
    </div>
  );
}
