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
    <nav className=" navbar absolute w-full px-10 py-5 z-50 flex items-center justify-between">
      <Image src={logo} alt="ProfileCraft" height={50} width={50} />
      <div className=" flex gap-5">
        {session ? (
          <Button size="sm" onClick={() => signOut()}>Logout</Button>
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
