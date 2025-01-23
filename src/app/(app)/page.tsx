import Background from "@/components/Background";
import Brand from "@/components/Brand";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Background/>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center max-w-3xl">
          <Brand />

          <h1 className=" text-center font-bold md:text-4xl text-xl text-neutral-800 dark:text-neutral-200">
            Create Your Perfect Social Profile Hub with <br />
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
          <h2 className=" font-medium text-center text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Share all your social media profiles in one beautiful
            Bento grid layout. Stand out with an interactive showcase of your
            digital presence !
          </h2>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-1 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-9 px-4 sm:px-5 group"
              href="/sign-in"
              rel="noopener noreferrer"
            >
              Login <ChevronRight size={18} className=" group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent gap-1 text-sm sm:text-base h-9 px-4 sm:px-5 sm:min-w-36 group"
              href="/sign-up"
              rel="noopener noreferrer"
            >
              Sign up <ChevronRight size={18} className=" text-neutral-600 dark:text-neutral-400 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
