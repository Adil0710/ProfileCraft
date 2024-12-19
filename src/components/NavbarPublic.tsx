"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { ModeToggle } from "./theme-toggle";

export default function NavbarPublic() {

  return (
    <nav className=" navbar fixed border-b-neutral-50 dark:border-b-neutral-900 border-b w-full px-10 py-1 z-50 flex items-center justify-between">
      <Link href="/"><Image src={logo} alt="ProfileCraft" className="w-10 sm:w-12" /></Link>
      

        <ModeToggle />
    
    </nav>
  );
}
