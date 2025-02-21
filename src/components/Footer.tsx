import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import { Github, Linkedin } from "lucide-react";
import X from "./X";
import { RainbowButton } from "./magicui/rainbow-button";
import { FaGithub } from "react-icons/fa";

const SocialLinks = [
  {
    href: "https://github.com/Adil0710",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/adil-patel-737692252/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://x.com/AdilPat21587273",
    label: "Twitter",
    icon: X,
  },
];

const FooterItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Preview",
    link: "#preview",
  },
  {
    title: "How It Works",
    link: "#how",
  },
  {
    title: "Features",
    link: "#features",
  },
  {
    title: "Showcase",
    link: "#showcase",
  },
  {
    title: "FAQ",
    link: "#FAQ",
  },
];

function Footer() {
  const getFullYear = new Date().getFullYear();
  return (
    <div className="group relative dark:bg-neutral-950 bg-[#F7FAFF]  text-sm sm:text-base w-full py-10 flex flex-col  items-center justify-center px-5 ">
      <span className=" bg-gradient-to-r from-transparent via-indigo-400 to-transparent sm:w-1/2 w-full h-px absolute inset-x-0 m-auto top-px"></span>
      <span className=" bg-gradient-to-r from-transparent via-indigo-400 to-transparent sm:w-1/2 w-full h-[5px] absolute inset-x-0 m-auto top-px blur-sm opacity-0 group-hover:opacity-100 duration-300 transition-opacity"></span>
      <div className=" grid sm:grid-cols-3 grid-cols-2 w-full max-w-4xl sm:gap-5 gap-8">
        <div className=" col-span-3 sm:col-span-1 order-3 sm:order-1">
          <h1 className=" font-bold text-2xl text-neutral-800 dark:text-neutral-200">
            ProfileCraft
          </h1>
          <p className=" mt-2 text-sm text-neutral-700 dark:text-neutral-400">
            Create your personalized social media hub with our modern bento grid
            layout.
          </p>
        </div>
        <div className=" flex flex-col sm:justify-center sm:items-center items-start order-2">
          <h1 className=" font-bold text-xl sm:ml-6 ml-0 text-neutral-800 dark:text-neutral-200">
            Quick Links
          </h1>
          <div className=" flex flex-col mt-3 gap-2 text-sm">
            {FooterItems.map((item, index) => (
              <Link
                className="text-neutral-700 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-300"
                href={item.link}
                key={index}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center order-2 sm:order-3">
          <h1 className=" font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Connect
          </h1>
          <div className=" flex flex-row mt-3 gap-5 text-sm">
            {SocialLinks.map((item, index) => (
              <Link
                className="text-neutral-700 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors duration-300"
                href={item.href}
                key={index}
              >
                <item.icon />
              </Link>
            ))}
          </div>
          <Link
            href="https://github.com/Adil0710/ProfileCraft"
            className=" mt-10"
          >
            <RainbowButton className=" px-3 py-1.5 rounded-lg h-auto text-xs font-semibold">
              <FaGithub size={18} className=" mr-2" /> Star on GitHub
            </RainbowButton>
          </Link>
        </div>
      </div>
      <Separator orientation="horizontal" className=" max-w-4xl mt-5" />
      <div className=" flex sm:flex-row flex-col items-center justify-center mt-5 text-sm">
        <p className="text-neutral-700 dark:text-neutral-400">
          &copy; {getFullYear}{" "}
          <Link
            href="/"
            className=" font-semibold text-neutral-900 hover:text-black duration-200 dark:text-neutral-200 dark:hover:text-white"
          >
            ProfileCraft.
          </Link>{" "}
          All rights reserved.
        </p>
        <Separator
          orientation="vertical"
          className="h-5 w-[1px] bg-gray-300 dark:bg-neutral-600 mx-4 sm:block hidden"
        />{" "}
        <p className="text-neutral-700 dark:text-neutral-400 sm:mt-0 mt-2">
          Developed by{" "}
          <Link
            href="https://devadil.vercel.app/"
            target="_blank"
            className="underline text-neutral-900 dark:text-neutral-200 dark:hover:text-white font-semibold hover:text-black duration-200"
          >
            Adil
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;
