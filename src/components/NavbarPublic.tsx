"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { ModeToggle } from "./theme-toggle";

export default function NavbarPublic() {

  return (
    <nav className=" navbar fixed w-full px-10 py-5 z-50 flex items-center justify-between">
      <Link href="/"><Image src={logo} alt="ProfileCraft" height={50} width={50} /></Link>
      

        <ModeToggle />
    
    </nav>
  );
}
