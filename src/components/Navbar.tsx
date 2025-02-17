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
    <nav className=" navbar max-w-screen fixed border-b-neutral-50 dark:border-b-neutral-900 z-[999] border-b w-full px-5 sm:px-10 py-1 ">
      <div className="max-w-6xl mx-auto flex items-center justify-between w-full">
        <Link href={"/"}>
          <Brand />
        </Link>
        <Link href="https://github.com/Adil0710/ProfileCraft" className=" sm:block hidden">
          <RainbowButton className=" px-3 py-1 rounded-lg h-auto text-xs font-semibold">
            <FaGithub size={18} className=" mr-2" /> Star on Github
          </RainbowButton>
        </Link>
        <div className=" flex sm:gap-5 gap-2 justify-center items-center">
          {session ? (
            <>
              {pathname !== "/" ? (
                <Link href="/">
                  <Button size="sm" variant="ghost">
                    Home
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button size="sm" variant="ghost">
                    Profile
                  </Button>
                </Link>
              )}

              <Button size="sm" variant="ghost" onClick={() => signOut()}>
                Logout
              </Button>
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
      </div>
    </nav>
  );
}
