"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import Brand from "./Brand";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();

  const pathname = usePathname();

  return (
    <nav className=" navbar fixed border-b-neutral-50 dark:border-b-neutral-900 border-b w-full px-10 py-1 z-50 flex items-center justify-between">
      <Link href={"/"}>
        <Brand />
      </Link>
      <div className=" flex gap-5 justify-center items-center">
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
    </nav>
  );
}
