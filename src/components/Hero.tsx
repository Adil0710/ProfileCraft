import React from "react";
import Background from "@/components/Background";
import HeroText from "./HeroText";

function Hero() {
  return (
    <>
      <Background />
      <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen max-h-screen p-5 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="social-icon floatanimate absolute left-[20%] sm:top-[15%] top-[18%] sm:p-6 p-0 rounded-xl backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
          <svg
            className="w-12 h-12 text-[#E4405F]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
          </svg>
        </div>
        
        <div className="social-icon floatanimate1 absolute sm:left-[15%] left-[12%] top-[60%] sm:top-[50%]  sm:p-6 p-0 rounded-xl backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
          <svg className="w-10 h-10 text-neutral-800 dark:text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
          </svg>
        </div>
        <div className="social-icon floatanimate2 absolute right-[15%] sm:top-[50%] top-[58%] sm:p-6 p-0 rounded-xl backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
          <svg
            className="w-12 h-12 text-[#FF0000]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
        <div className="social-icon floatanimate absolute top-[15%] right-[20%] sm:p-6 p-0 rounded-xl backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
          <svg
            className="w-12 h-12 text-gray-800 dark:text-gray-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>

        <div className="social-icon absolute left-[30%] bottom-[10%] sm:p-6 p-0 rounded-xl backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
          <svg
            className="w-12 h-12 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.09 17.453c-.23.34-.68.44-1.02.21-2.8-1.84-6.32-2.25-10.47-1.22-.39.1-.79-.14-.89-.53-.1-.39.14-.79.53-.89 4.56-1.09 8.48-.63 11.55 1.34.34.23.44.68.21 1.02zm1.5-3.02c-.28.42-.84.55-1.26.28-3.2-2.05-8.1-2.64-11.88-1.43-.48.15-1-.11-1.15-.59-.15-.48.11-1 .59-1.15 4.23-1.32 9.57-.68 13.14 1.64.42.28.55.84.28 1.25zm.1-3.1c-3.88-2.34-10.24-2.56-13.84-1.39-.56.18-1.16-.13-1.34-.69-.18-.56.13-1.16.69-1.34 4.1-1.27 11.06-1.03 15.42 1.56.52.31.68.98.37 1.5-.31.52-.98.68-1.5.37z" />
          </svg>
        </div>
        <HeroText />
      </div>
    </>
  );
}

export default Hero;
