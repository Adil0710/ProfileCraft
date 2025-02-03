import { cn } from "@/lib/utils";
import { HoverEffect } from "./ui/card-hover-effect";
import Header from "./ui/header";

export function Features() {
  return (
    <div
      id="features"
      className="relative z-0 w-full h-full bg-white dark:bg-black min-h-screen"
    >
      <div className="absolute min-h-52 min-w-52 left-[0%] top-0 sm:top-28 z-10 items-center justify-center">
              <div className="relative w-full max-w-lg">
                <div
                  className={cn(
                    "absolute sm:-right-10 sm:-top-40 top-20 sm:h-52 sm:w-52 h-28 w-28 animate-pop-blob rounded-sm bg-blue-400 p-8 opacity-45 dark:opacity-25 mix-blend-multiply blur-3xl filter"
                  )}
                ></div>
                <div
                  className={cn(
                    "absolute sm:-left-10 sm:-top-72 top-0 sm:h-52 sm:w-52 h-28 w-28 animate-pop-blob rounded-sm bg-purple-400 p-8 opacity-45 dark:opacity-25 mix-blend-multiply blur-3xl filter"
                  )}
                ></div>
              </div>
            </div>
      
      <div className="max-w-6xl mx-auto px-8 py-8">
       
        <Header header="  Craft Your Perfect Profile" description=" Everything you need to create an impressive social media hub"/>
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
export const projects = [
  {
    title: "Bento Grid Layout",
    description:
      "Organize your social profiles in a modern, aesthetic grid layout that catches attention.",
    icon: (
      <div className="h-14 w-14 bg-indigo-600/10 rounded-lg flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-indigo-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </div>
    ),
  },
  {
    title: "Easy Customization",
    description:
      "Personalize details, dark or light themes to match your brand or personality identity perfectly.",
    icon: (
      <div className="h-14 w-14 bg-pink-600/10 rounded-lg flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-pink-500"
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
    ),
  },
  {
    title: "Interactive Elements",
    description:
      "Engage visitors with smooth animations and responsive interactions.",
    icon: (
      <div className="h-14 w-14 bg-orange-600/10 rounded-lg flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      </div>
    ),
  },
  {
    title: "Secure Links",
    description:
      "Keep your profile safe with advanced security features and link protection.",
    icon: (
      <div className="h-14 w-14 bg-red-600/10 rounded-lg flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          ></path>
        </svg>
      </div>
    ),
  },

  {
    title: "Image Upload",
    description:
      "Add your profile picture and custom images to make your profile stand out.",
    icon: (
      <div className="h-14 w-14 bg-green-600/10 rounded-lg flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
      </div>
    ),
  },

  {
    title: "Unique Link",
    description:
      "Get your unique, shareable link that's easy to remember and share with your audience.",
    icon: (
      <div className="h-14 w-14 bg-blue-600/10 rounded-lg flex items-center justify-center mb-6">
        <svg
          className="h-8 w-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          ></path>
        </svg>
      </div>
    ),
  },
];
