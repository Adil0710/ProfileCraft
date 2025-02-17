"use client";
import React from "react";
import Link from "next/link";

import { ModeToggle } from "./theme-toggle";
import Brand from "./Brand";

export default function NavbarPublic() {
  return (
    <nav className=" navbar max-w-screen fixed border-b-neutral-50 dark:border-b-neutral-900 border-b w-full px-5 sm:px-10 py-1 z-50 flex items-center justify-between">
     <div className=" max-w-6xl">
     <Link href={"/"}>
        <Brand />
      </Link>

      <ModeToggle />
     </div>
    </nav>
  );
}
