"use client";
import React from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  header: string;
  description: string;
}
function Header({ header, description }: HeaderProps) {
  return (
    <div className="text-center mb-16 animate__animated animate__fadeIn">
      <motion.h2
        whileInView={{ y: 0, opacity: 1 }}
        initial={{ y: 50, opacity: 0 }}
    
        className="sm:text-4xl text-xl font-bold dark:bg-gradient-to-b dark:from-white dark:to-neutral-700 bg-gradient-to-b from-black to-neutral-500 mb-4 text-transparent bg-clip-text"
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
