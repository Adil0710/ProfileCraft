"use client";

import React, { useState } from "react";
import Header from "./ui/header";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


const FAQData = [
  {
    title: "How do I create my profile?",
    description:
      "Simply sign up for an account, choose your unique username, and start customizing your profile grid. Add your social media links, bio, location, and images to create your perfect digital identity.",
  },
  {
    title: "Supported platforms?",
    description:
      "We support all major social media platforms including Instagram, Twitter, LinkedIn, YouTube, TikTok, GitHub, and many more. You can add custom links to any platform or website.",
  },
  {
    title: "Can I use it as portfolio?",
    description:
      "Yes, of course! You can use this as your portfolio site on your resume, in your social media bio, or anywhere you want!",
  },
  {
    title: "Is it open-source project?",
    description:
      "Yes! ProfileCraft is an open-source project. Anyone can contribute—just fork the repository and you're ready to contribute. Happy Coding ❤️",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="FAQ"
      className="relative overflow-x-hidden max-w-screen h-full bg-white dark:bg-black flex flex-col mx-auto min-h-screen pt-20 z-0"
    >
      <Header
        header="Frequently Asked Questions"
        description="Everything you need to know about ProfileCraft"
      />
      <div className="max-w-3xl w-full px-8 pb-8 flex flex-col mx-auto">
        {FAQData.map((faq, index) => (
          <div
            key={index}
            className={cn(
              "dark:bg-neutral-800 bg-neutral-200 rounded-lg w-full mb-4 overflow-hidden transition-all",
              openIndex === index && "dark:bg-neutral-900 bg-neutral-200"
            )}
          >
            <button
              className="w-full flex justify-between items-center sm:p-6 px-6 py-3 sm:text-lg text-sm font-semibold dark:text-neutral-200 text-neutral-800 cursor-pointer focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.title}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className=" dark:text-indigo-500 text-indigo-600" />
              </motion.div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden dark:text-gray-400 text-gray-700"
            >
              <div className="px-6 pb-6 sm:text-base text-xs">
                {faq.description}
              </div>
            </motion.div>
          </div>
        ))}
       
      </div>
      
     
    </div>
  );
}

export default FAQ;
