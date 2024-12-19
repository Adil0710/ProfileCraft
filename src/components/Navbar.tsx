"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className=" navbar fixed border-b-neutral-50 dark:border-b-neutral-900 border-b w-full px-10 py-1 z-50 flex items-center justify-between">
      <Image src={logo} alt="ProfileCraft" className="w-10 sm:w-12" />
      <div className=" flex gap-5">
        {session ? (
          <Button size="sm" variant="ghost" onClick={() => signOut()}>Logout</Button>
        ) : (
          <>
            <Link href="/sign-in">
              <Button size="sm" >Login</Button>
            </Link>
          </>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
}
