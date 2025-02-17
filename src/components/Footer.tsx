import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import { Github, Linkedin } from "lucide-react";
import X from "./X";

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
    link: "#hero",
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
    <div className=" dark:bg-neutral-950 bg-[#F7FAFF]  text-sm sm:text-base w-full py-10 flex flex-col  items-center justify-center">
      <div className=" grid grid-cols-3 w-full max-w-4xl gap-5">
        <div>
          <h1 className=" font-bold text-2xl text-neutral-800 dark:text-neutral-200">ProfileCraft</h1>
          <p className=" mt-2 text-sm text-neutral-700 dark:text-neutral-400">
            Create your personalized social media hub with our modern bento grid
            layout.
          </p>
        </div>
        <div className=" flex flex-col justify-center items-center">
          <h1 className=" font-bold text-xl ml-6 text-neutral-800 dark:text-neutral-200">Quick Links</h1>
          <div className=" flex flex-col mt-3 gap-2 text-sm">
            {FooterItems.map((item, index) => (
              <Link className="text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white" href={item.link} key={index}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className=" font-bold text-xl text-neutral-800 dark:text-neutral-200">Connect</h1>
          <div className=" flex flex-row mt-3 gap-5 text-sm">
            {SocialLinks.map((item, index) => (
              <Link className="text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white" href={item.href} key={index}>
                <item.icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" className=" max-w-4xl mt-5" />
      <div className=" flex flex-row  items-center justify-center mt-5 text-sm">
        <p className="text-neutral-700 dark:text-neutral-400">
          &copy; {getFullYear} {' '}
          <Link
            href="/"
            className=" font-semibold text-neutral-900 hover:text-black duration-200 dark:text-neutral-200 dark:hover:text-white"
          >
            ProfileCraft.
          </Link> {' '} 
          All rights reserved.
        </p>
        <Separator
          orientation="vertical"
          className="h-5 w-[1px] bg-gray-300 dark:bg-neutral-600 mx-4"
        />{" "}
        <p className="text-neutral-700 dark:text-neutral-400">
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
