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
        viewport={{once:true}}
        className="sm:text-4xl text-xl font-bold dark:text-white text-black mb-4"
      >
       {header}
      </motion.h2>
      <motion.p
        whileInView={{ y: 0, opacity: 1 }}
        initial={{ y: 50, opacity: 0 }}
        viewport={{once:true}}
        className="dark:text-neutral-300 text-neutral-700 sm:text-lg text-base"
      >
       {description}
      </motion.p>
    </div>
  );
}

export default Header;
