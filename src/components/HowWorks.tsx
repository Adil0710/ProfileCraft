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
    <div className=" bg-white flex flex-col justify-center items-center dark:bg-black py-10">
      <Header
        header=" How ProfileCraft Works"
        description="Create your perfect profile in three simple steps"
        className="mb-5"
      />
      <div className="mt-0 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2 max-w-6xl">
        <BentoCard
          eyebrow="ProfileCraft"
          title="Perfect Social Profile"
          description="Share all your social profiles, bio, and more with one beautiful link. Create your personalized profile grid in minutes with ProfileCraft."
          graphic={
            // eslint-disable-next-line tailwindcss/no-contradicting-classname
            <div>
              <AnimatedBeamMultipleOutput className="bg-white dark:bg-gray-950 z-10 absolute right-0 top-0 h-full rounded-none border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_-10%,#000_-50%)] group-hover:scale-105" />
              <div
                className={cn(
                  "absolute -left-1 -top-10 h-28 w-28  animate-pop-blob rounded-sm bg-blue-400 z-50 p-8 opacity-50 mix-blend-multiply blur-3xl filter"
                )}
              ></div>
            </div>
          }
          fade={["bottom"]}
          className="max-lg:rounded-t-4xl lg:rounded-tl-4xl lg:col-span-3"
        />
        <BentoCard
          eyebrow="Analysis"
          title="Undercut your competitors"
          description="Ensuring your account is properly secured helps protect your personal
        information and data."
          graphic={
            // eslint-disable-next-line tailwindcss/no-contradicting-classname
           <CardSpotlightDemo/>
          }
          fade={["bottom"]}
          className="lg:rounded-tr-4xl lg:col-span-3"
        />
        <BentoCard
          eyebrow="Speed"
          title="Built for power users"
          description="It’s never been faster to cold email your entire contact list using our streamlined keyboard shortcuts."
          graphic={
            <div className="flex size-full pl-10 pt-10">
              <Keyboard highlighted={["LeftCommand", "C", "S"]} />
            </div>
          }
          className="lg:rounded-bl-4xl lg:col-span-2"
        />
        <BentoCard
          eyebrow="Source"
          title="Get the furthest reach"
          description="Bypass those inconvenient privacy laws to source leads from the most unexpected places."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Limitless"
          title="Sell globally"
          description="Radiant helps you sell in locations currently under international embargo."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:rounded-br-4xl lg:col-span-2"
        />
      </div>
    </div>
  );
}
