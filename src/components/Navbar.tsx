"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import Brand from "./Brand";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className=" navbar fixed border-b-neutral-50 dark:border-b-neutral-900 border-b w-full px-10 py-1 z-50 flex items-center justify-between">
      <Brand/>
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
