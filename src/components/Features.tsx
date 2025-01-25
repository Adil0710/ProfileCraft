import { HoverEffect } from "./ui/card-hover-effect";

export function Features() {
  return (
    <div id="features" className=" border-t border-black/[0.1] dark:border-white/[0.1] w-full h-full bg-white dark:bg-black flex justify-center items-center min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-8">
      <div className="text-center mb-16 animate__animated animate__fadeIn">
        <h2 className="sm:text-4xl text-xl font-bold dark:text-white text-black mb-4">Craft Your Perfect Profile</h2>
        <p className="dark:text-neutral-300 text-neutral-700 sm:text-lg text-base">Everything you need to create an impressive social media hub</p>
      </div>
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
    title: "Media Integration",
    description:
      "Seamlessly integrate photos, Profile Piicture and other media content.",
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
      "Unique link for profile so user can visit, click, and engage with detailed profile.",
    icon: (
      <div className="h-14 w-14 bg-blue-600/10 rounded-lg flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
      </div>
    ),
  },
];
