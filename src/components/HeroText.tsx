import { ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";
import BlurFade from "./ui/blur-fade";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function HeroText() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center max-w-screen sm:max-w-3xl">
      <motion.div
        initial={{
          transform: "scale(1.3)",
          opacity: 0,
          transformOrigin: "center", // Ensures scaling happens from the center
          filter: "blur(10px)",
        }}
        animate={{
          transform: "scale(1)",
          opacity: 1,
          filter: "blur(0px)",
        }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "easeOut",
        }}
        className="z-10 flex  items-center justify-center mb-5"
      >
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            A Beautiful Link For Your Bio !
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
      </motion.div>

      <BlurFade delay={0.04}>
        <h1 className=" text-center font-bold md:text-4xl text-xl text-neutral-800 dark:text-neutral-200">
          Create Your Perfect Social Profile With <br />
          <svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="text-gradient" cx="0%" cy="80%" r="100%">
                <stop offset="0%" stopColor="hsla(327,83%,74%,1)" />
                <stop offset="40%" stopColor="hsla(285,81%,65%,1)" />
                <stop offset="100%" stopColor="hsla(198,81%,62%,1)" />
              </radialGradient>
            </defs>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".35em"
              fontWeight="bold"
              fill="url(#text-gradient)"
            >
              ProfileCraft
            </text>
          </svg>
        </h1>
      </BlurFade>
      <BlurFade delay={0.04 * 3}>
        <h2 className=" font-medium text-center text-sm md:text-base h text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Share all your social profiles, bio, and more to world with one beautiful link. <br />
          Create your personalized profile bento grid in minutes with ProfileCraft !
        </h2>
      </BlurFade>
      <BlurFade delay={0.04 * 3}>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-1 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-9 px-4 sm:px-5 group"
            href="/sign-in"
            rel="noopener noreferrer"
          >
            Login{" "}
            <ChevronRight
              size={18}
              className=" group-hover:translate-x-1.5 transition-transform"
            />
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#fff] dark:hover:bg-[#0000007c] hover:border-transparent gap-1 text-sm sm:text-base h-9 px-4 sm:px-5  group"
            href="/sign-up"
            rel="noopener noreferrer"
          >
            Sign up{" "}
            <ChevronRight
              size={18}
              className=" text-neutral-600 dark:text-neutral-400 group-hover:translate-x-1.5 transition-transform"
            />
          </Link>
        </div>
      </BlurFade>
    </main>
  );
}

export default HeroText;
