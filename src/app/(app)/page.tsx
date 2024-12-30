
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
       
       <h1 className=" text-center font-bold md:text-6xl text-3xl text-neutral-800 dark:text-neutral-200">
        Profile<span className=" text-transparent bgcustom bg-clip-text">Craft</span> 
       </h1>
       <h2 className=" font-semibold text-center text-xl md:text-3xl text-neutral-600 dark:text-neutral-400">
       A beautiful link for your bio !
       </h2>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/sign-in"
           
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Login
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/sign-up"
          
            rel="noopener noreferrer"
          >
            Sign up for free
          </Link>
        </div>
      </main>
    
      
    </div>

    </>
  );
}
