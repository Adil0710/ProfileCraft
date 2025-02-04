"use client";
import React from "react";
import Background from "@/components/Background";
import HeroText from "./HeroText";
import { motion, useSpring, useMotionValue } from "framer-motion";
import BlurFade from "./ui/blur-fade";

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply smooth transition using `useSpring`
  const smoothX = useSpring(mouseX, { stiffness: 10, damping: 12 });
  const smoothY = useSpring(mouseY, { stiffness: 10, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // Calculate the movement range relative to center
    const x = (clientX - left - width / 2) * 0.05; // Adjust sensitivity
    const y = (clientY - top - height / 2) * 0.05;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div className="relative">
      <Background />
      <motion.div
        className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen max-h-screen p-5 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        onMouseMove={handleMouseMove}
      >
        <div className="social-icon floatanimate absolute right-[22%] sm:right-[15%] sm:top-[50%] top-[63%]  sm:p-6 p-0 rounded-xl backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
          <BlurFade delay={0.04 * 3}>
            <motion.svg
              className="w-16 h-16"
              fill="currentColor"
 viewBox="-19.5036 -32.49725 169.0312 194.9835"
              style={{
                x: smoothX,
                y: smoothY,
                position: "absolute",
              }}
            >
              <defs>
                <radialGradient
                  fy={578.088}
                  fx={158.429}
                  gradientTransform="matrix(0 -1.98198 1.8439 0 -1031.399 454.004)"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#a"
                  r={65}
                  cy={578.088}
                  cx={158.429}
                  id="c"
                />
                <radialGradient
                  fy={473.455}
                  fx={147.694}
                  gradientTransform="matrix(.17394 .86872 -3.5818 .71718 1648.351 -458.493)"
                  gradientUnits="userSpaceOnUse"
                  xlinkHref="#b"
                  r={65}
                  cy={473.455}
                  cx={147.694}
                  id="d"
                />
                <linearGradient id="b">
                  <stop stopColor="#3771c8" offset={0} />
                  <stop offset={0.128} stopColor="#3771c8" />
                  <stop stopOpacity={0} stopColor="#60f" offset={1} />
                </linearGradient>
                <linearGradient id="a">
                  <stop stopColor="#fd5" offset={0} />
                  <stop stopColor="#fd5" offset={0.1} />
                  <stop stopColor="#ff543e" offset={0.5} />
                  <stop stopColor="#c837ab" offset={1} />
                </linearGradient>
              </defs>
              <path
                d="M65.033 0C37.891 0 29.953.028 28.41.156c-5.57.463-9.036 1.34-12.812 3.22-2.91 1.445-5.205 3.12-7.47 5.468-4.125 4.282-6.625 9.55-7.53 15.812-.44 3.04-.568 3.66-.594 19.188-.01 5.176 0 11.988 0 21.125 0 27.12.03 35.05.16 36.59.45 5.42 1.3 8.83 3.1 12.56 3.44 7.14 10.01 12.5 17.75 14.5 2.68.69 5.64 1.07 9.44 1.25 1.61.07 18.02.12 34.44.12 16.42 0 32.84-.02 34.41-.1 4.4-.207 6.955-.55 9.78-1.28a27.22 27.22 0 0017.75-14.53c1.765-3.64 2.66-7.18 3.065-12.317.088-1.12.125-18.977.125-36.81 0-17.836-.04-35.66-.128-36.78-.41-5.22-1.305-8.73-3.127-12.44-1.495-3.037-3.155-5.305-5.565-7.624-4.3-4.108-9.56-6.608-15.829-7.512C102.338.157 101.733.027 86.193 0z"
                fill="url(#c)"
              />
              <path
                d="M65.033 0C37.891 0 29.953.028 28.41.156c-5.57.463-9.036 1.34-12.812 3.22-2.91 1.445-5.205 3.12-7.47 5.468-4.125 4.282-6.625 9.55-7.53 15.812-.44 3.04-.568 3.66-.594 19.188-.01 5.176 0 11.988 0 21.125 0 27.12.03 35.05.16 36.59.45 5.42 1.3 8.83 3.1 12.56 3.44 7.14 10.01 12.5 17.75 14.5 2.68.69 5.64 1.07 9.44 1.25 1.61.07 18.02.12 34.44.12 16.42 0 32.84-.02 34.41-.1 4.4-.207 6.955-.55 9.78-1.28a27.22 27.22 0 0017.75-14.53c1.765-3.64 2.66-7.18 3.065-12.317.088-1.12.125-18.977.125-36.81 0-17.836-.04-35.66-.128-36.78-.41-5.22-1.305-8.73-3.127-12.44-1.495-3.037-3.155-5.305-5.565-7.624-4.3-4.108-9.56-6.608-15.829-7.512C102.338.157 101.733.027 86.193 0z"
                fill="url(#d)"
              />
              <path
                d="M65.003 17c-13.036 0-14.672.057-19.792.29-5.11.234-8.598 1.043-11.65 2.23-3.157 1.226-5.835 2.866-8.503 5.535-2.67 2.668-4.31 5.346-5.54 8.502-1.19 3.053-2 6.542-2.23 11.65C17.06 50.327 17 51.964 17 65s.058 14.667.29 19.787c.235 5.11 1.044 8.598 2.23 11.65 1.227 3.157 2.867 5.835 5.536 8.503 2.667 2.67 5.345 4.314 8.5 5.54 3.054 1.187 6.543 1.996 11.652 2.23 5.12.233 6.755.29 19.79.29 13.037 0 14.668-.057 19.788-.29 5.11-.234 8.602-1.043 11.656-2.23 3.156-1.226 5.83-2.87 8.497-5.54 2.67-2.668 4.31-5.346 5.54-8.502 1.18-3.053 1.99-6.542 2.23-11.65.23-5.12.29-6.752.29-19.788 0-13.036-.06-14.672-.29-19.792-.24-5.11-1.05-8.598-2.23-11.65-1.23-3.157-2.87-5.835-5.54-8.503-2.67-2.67-5.34-4.31-8.5-5.535-3.06-1.187-6.55-1.996-11.66-2.23-5.12-.233-6.75-.29-19.79-.29zm-4.306 8.65c1.278-.002 2.704 0 4.306 0 12.816 0 14.335.046 19.396.276 4.68.214 7.22.996 8.912 1.653 2.24.87 3.837 1.91 5.516 3.59 1.68 1.68 2.72 3.28 3.592 5.52.657 1.69 1.44 4.23 1.653 8.91.23 5.06.28 6.58.28 19.39s-.05 14.33-.28 19.39c-.214 4.68-.996 7.22-1.653 8.91-.87 2.24-1.912 3.835-3.592 5.514-1.68 1.68-3.275 2.72-5.516 3.59-1.69.66-4.232 1.44-8.912 1.654-5.06.23-6.58.28-19.396.28-12.817 0-14.336-.05-19.396-.28-4.68-.216-7.22-.998-8.913-1.655-2.24-.87-3.84-1.91-5.52-3.59-1.68-1.68-2.72-3.276-3.592-5.517-.657-1.69-1.44-4.23-1.653-8.91-.23-5.06-.276-6.58-.276-19.398s.046-14.33.276-19.39c.214-4.68.996-7.22 1.653-8.912.87-2.24 1.912-3.84 3.592-5.52 1.68-1.68 3.28-2.72 5.52-3.592 1.692-.66 4.233-1.44 8.913-1.655 4.428-.2 6.144-.26 15.09-.27zm29.928 7.97a5.76 5.76 0 105.76 5.758c0-3.18-2.58-5.76-5.76-5.76zm-25.622 6.73c-13.613 0-24.65 11.037-24.65 24.65 0 13.613 11.037 24.645 24.65 24.645C78.616 89.645 89.65 78.613 89.65 65S78.615 40.35 65.002 40.35zm0 8.65c8.836 0 16 7.163 16 16 0 8.836-7.164 16-16 16-8.837 0-16-7.164-16-16 0-8.837 7.163-16 16-16z"
                fill="#fff"
              />
            </motion.svg>
          </BlurFade>
        </div>

        <div className="social-icon floatanimate1 absolute sm:left-[15%] left-[10%] top-[65%] sm:top-[50%]  sm:p-6 p-0 rounded-xl backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
          <BlurFade delay={0.04 * 6}>
            <motion.svg
              style={{
                x: smoothX,
                y: smoothY,
                position: "absolute",
              }}
              className="w-10 h-10 text-neutral-800 dark:text-neutral-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </motion.svg>
          </BlurFade>
        </div>

        <div className="social-icon floatanimate2 absolute left-[10%] sm:left-[20%] sm:top-[15%] top-[8%]  sm:p-6 p-0 rounded-xl backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
          <BlurFade delay={0.04 * 9}>
            <motion.svg
              style={{
                x: smoothX,
                y: smoothY,
                position: "absolute",
              }}
              className="w-12 h-12 text-[#FF0000]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </motion.svg>
          </BlurFade>
        </div>

        <div className="social-icon floatanimate absolute top-[10%] sm:top-[15%] right-[20%] sm:p-6 p-0 rounded-xl backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
          <BlurFade delay={0.04 * 7}>
            <motion.svg
              style={{
                x: smoothX,
                y: smoothY,
                position: "absolute",
              }}
              className="w-12 h-12 text-gray-800 dark:text-gray-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </motion.svg>
          </BlurFade>
        </div>

        <div className="social-icon floatanimate3 absolute left-[20%] sm:left-[30%] bottom-[20%] sm:bottom-[10%] sm:p-6 p-0 rounded-xl backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
          <BlurFade delay={0.04 * 10}>
            <motion.svg
              style={{
                x: smoothX,
                y: smoothY,
                position: "absolute",
              }}
              className="w-12 h-12 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.09 17.453c-.23.34-.68.44-1.02.21-2.8-1.84-6.32-2.25-10.47-1.22-.39.1-.79-.14-.89-.53-.1-.39.14-.79.53-.89 4.56-1.09 8.48-.63 11.55 1.34.34.23.44.68.21 1.02zm1.5-3.02c-.28.42-.84.55-1.26.28-3.2-2.05-8.1-2.64-11.88-1.43-.48.15-1-.11-1.15-.59-.15-.48.11-1 .59-1.15 4.23-1.32 9.57-.68 13.14 1.64.42.28.55.84.28 1.25zm.1-3.1c-3.88-2.34-10.24-2.56-13.84-1.39-.56.18-1.16-.13-1.34-.69-.18-.56.13-1.16.69-1.34 4.1-1.27 11.06-1.03 15.42 1.56.52.31.68.98.37 1.5-.31.52-.98.68-1.5.37z" />
            </motion.svg>
          </BlurFade>
        </div>

        <div className="social-icon floatanimate4 absolute right-[30%] bottom-[20%] sm:bottom-[10%] sm:p-6 p-0 rounded-xl backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
          <BlurFade delay={0.04 * 14}>
            <motion.svg
              style={{
                x: smoothX,
                y: smoothY,
                position: "absolute",
              }}
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="currentColor"
              viewBox="0 0 512 512"
              className=" w-12 h-12 text-neutral-800 dark:text-neutral-300"
            >
              <path d="M105 0h302c57.75 0 105 47.25 105 105v302c0 57.75-47.25 105-105 105H105C47.25 512 0 464.75 0 407V105C0 47.25 47.25 0 105 0z" />
              <path
                className="text-white dark:text-black"
                d="M337.36 243.58c-1.46-.7-2.95-1.38-4.46-2.02-2.62-48.36-29.04-76.05-73.41-76.33-25.6-.17-48.52 10.27-62.8 31.94l24.4 16.74c10.15-15.4 26.08-18.68 37.81-18.68h.4c14.61.09 25.64 4.34 32.77 12.62 5.19 6.04 8.67 14.37 10.39 24.89-12.96-2.2-26.96-2.88-41.94-2.02-42.18 2.43-69.3 27.03-67.48 61.21.92 17.35 9.56 32.26 24.32 42.01 12.48 8.24 28.56 12.27 45.26 11.35 22.07-1.2 39.37-9.62 51.45-25.01 9.17-11.69 14.97-26.84 17.53-45.92 10.51 6.34 18.3 14.69 22.61 24.73 7.31 17.06 7.74 45.1-15.14 67.96-20.04 20.03-44.14 28.69-80.55 28.96-40.4-.3-70.95-13.26-90.81-38.51-18.6-23.64-28.21-57.79-28.57-101.5.36-43.71 9.97-77.86 28.57-101.5 19.86-25.25 50.41-38.21 90.81-38.51 40.68.3 71.76 13.32 92.39 38.69 10.11 12.44 17.73 28.09 22.76 46.33l28.59-7.63c-6.09-22.45-15.67-41.8-28.72-57.85-26.44-32.53-65.1-49.19-114.92-49.54h-.2c-49.72.35-87.96 17.08-113.64 49.73-22.86 29.05-34.65 69.48-35.04 120.16v.24c.39 50.68 12.18 91.11 35.04 120.16 25.68 32.65 63.92 49.39 113.64 49.73h.2c44.2-.31 75.36-11.88 101.03-37.53 33.58-33.55 32.57-75.6 21.5-101.42-7.94-18.51-23.08-33.55-43.79-43.48zm-76.32 71.76c-18.48 1.04-37.69-7.26-38.64-25.03-.7-13.18 9.38-27.89 39.78-29.64 3.48-.2 6.9-.3 10.25-.3 11.04 0 21.37 1.07 30.76 3.13-3.5 43.74-24.04 50.84-42.15 51.84z"
              />
            </motion.svg>
          </BlurFade>
        </div>

        <HeroText />
      </motion.div>
    </div>
  );
}

export default Hero;
