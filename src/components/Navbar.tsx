"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import Brand from "./Brand";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { RainbowButton } from "./magicui/rainbow-button";

export default function Navbar() {
  const { data: session } = useSession();

  const pathname = usePathname();

  return (
    <nav className=" navbar max-w-screen fixed border-b-neutral-50 dark:border-b-neutral-900 border-b w-full px-5 sm:px-10 py-1 z-50 flex items-center justify-between">
      <Link href={"/"}>
        <Brand />
      </Link>

      <div className=" flex sm:gap-3 gap-2 justify-center items-center">
        {pathname === "/" && (
          <>
            <Link
              href="https://github.com/Adil0710/ProfileCraft"
              className=" sm:block hidden"
            >
              <RainbowButton className=" px-3 py-1.5 rounded-lg h-auto text-xs font-semibold">
                <FaGithub size={18} className=" mr-2" /> Star on GitHub
              </RainbowButton>
            </Link>
            <Link href="/#preview" className=" sm:block hidden">
              <Button size="sm" variant="ghost">
                Preview
              </Button>
            </Link>
            <Link href="/#how" className=" sm:block hidden">
              <Button size="sm" variant="ghost">
                How It Works
              </Button>
            </Link>
            <Link href="/#features" className=" sm:block hidden">
              <Button size="sm" variant="ghost">
                Features
              </Button>
            </Link>
            <Link href="/#showcase" className=" sm:block hidden">
              <Button size="sm" variant="ghost">
                Showcase
              </Button>
            </Link>
            <Link href="/#FAQ" className=" sm:block hidden">
              <Button size="sm" variant="ghost">
                FAQ
              </Button>
            </Link>
          </>
        )}
        {session ? (
          <>
            {pathname !== "/" ? (
              <>
              <Link href="/">
                <Button size="sm" variant="ghost">
                  Home
                </Button>
              </Link>
               <Button size="sm" variant="ghost" onClick={() => signOut()}>
               Logout
             </Button>
             </>
            ) : (
              <Link href="/dashboard">
                <Button size="sm" variant="ghost">
                  Profile
                </Button>
              </Link>
            )}

           
          </>
        ) : (
          <>
            <Link href="/sign-in">
              <Button size="sm" variant="ghost">
                Login
              </Button>
            </Link>
          </>
        )}

        <Separator orientation="vertical" className=" h-5" />

        <ModeToggle />
      </div>
    </nav>
  );
}
