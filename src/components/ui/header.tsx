"use client";
import React from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  header: string;
  description: string;
  className?:string
}
function Header({ header, description, className }: HeaderProps) {
  return (
    <div className={`text-center mb-16 animate__animated animate__fadeIn ${className}`}>
      <motion.h2
        whileInView={{ y: 0, opacity: 1 }}
        initial={{ y: 50, opacity: 0 }}
        className="pointer-events-none whitespace-pre-wrap sm:text-4xl text-xl font-bold dark:from-white dark:to-slate-300/10 bg-gradient-to-b from-black to-gray-400/80 mb-4 text-transparent bg-clip-text"
      >
        {header}
      </motion.h2>
      <motion.p
        whileInView={{ y: 0, opacity: 1 }}
        initial={{ y: 50, opacity: 0 }}
        className="dark:text-neutral-400 text-neutral-600 sm:text-lg text-base"
      >
        {description}
      </motion.p>
    </div>
  );
}

export default Header;
