"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import Brand from "./Brand";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { RainbowButton } from "./magicui/rainbow-button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Disable scrolling when the menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <nav className={cn(" max-w-screen fixed border-b-neutral-50 dark:border-b-neutral-900 border-b w-full px-2 sm:px-10 py-2 z-50 flex items-center justify-between ", !menuOpen ? "navbar" : "bg-white/95 dark:bg-black/95")}>
      {/* Brand Logo */}
      <Link href={"/"} onClick={() => setMenuOpen(false)}>
        <Brand />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex gap-3 items-center">
        {pathname === "/" && (
          <>
            <Link href="https://github.com/Adil0710/ProfileCraft">
              <RainbowButton className="px-3 py-1.5 rounded-lg h-auto text-xs font-semibold">
                <FaGithub size={18} className="mr-2" /> Star on GitHub
              </RainbowButton>
            </Link>
            {["Preview", "How It Works", "Features", "Showcase", "FAQ"].map(
              (item) => (
                <Link key={item} href={`/#${item.toLowerCase().replace(/ /g, "")}`}>
                  <Button size="sm" variant="ghost">
                    {item}
                  </Button>
                </Link>
              )
            )}
          </>
        )}
        {session ? (
          pathname !== "/" ? (
            <>
              <Link href="/">
                <Button size="sm" variant="ghost">
                  Home
                </Button>
              </Link>
              <Button size="sm" variant="ghost" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/dashboard">
              <Button size="sm" variant="ghost">
                Profile
              </Button>
            </Link>
          )
        ) : (
          <Link href="/sign-in">
            <Button size="sm" variant="ghost">
              Login
            </Button>
          </Link>
        )}
        <Separator orientation="vertical" className="h-5" />
        <ModeToggle />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden flex items-center gap-2">
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 w-8 h-8 flex items-center justify-center focus:outline-none"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className=" text-accent-foreground"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M2 6 L20 6"
              variants={{
                open: { d: "M5 5L19 19" },
                closed: { d: "M4 6L20 6" },
              }}
              animate={menuOpen ? "open" : "closed"}
              transition={{ duration: 0.4 }}
            />
            <motion.path
              d="M4 12 L20 12"
              variants={{
                open: { opacity: 0 },
                closed: { opacity: 1 },
              }}
              transition={{ duration: 0.2 }}
              animate={menuOpen ? "open" : "closed"}
            />
            <motion.path
              d="M4 18 L20 18"
              variants={{
                open: { d: "M5 19L19 5" },
                closed: { d: "M4 18L20 18" },
              }}
              animate={menuOpen ? "open" : "closed"}
              transition={{ duration: 0.4 }}
            />
          </svg>
        </motion.button>
        <Separator orientation="vertical" className="h-5" />
        <ModeToggle />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-0 top-full w-full backdrop-blur-xl filter border-b border-neutral-200 dark:border-neutral-800 sm:hidden flex flex-col items-center gap-2 py-4 bg-white/10 dark:bg-black"
          >
            {pathname === "/" && (
              <>
                <Link href="https://github.com/Adil0710/ProfileCraft">
                  <RainbowButton className="px-3 py-1.5 rounded-lg h-auto text-xs font-semibold">
                    <FaGithub size={18} className="mr-2" /> Star on GitHub
                  </RainbowButton>
                </Link>
                {["Preview", "How It Works", "Features", "Showcase", "FAQ"].map(
                  (item) => (
                    <Link
                      key={item}
                      href={`/#${item.toLowerCase().replace(/ /g, "")}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <Button size="sm" variant="ghost">
                        {item}
                      </Button>
                    </Link>
                  )
                )}
              </>
            )}
            {session ? (
              pathname !== "/" ? (
                <>
                  <Link href="/" onClick={() => setMenuOpen(false)}>
                    <Button size="sm" variant="ghost">
                      Home
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      signOut();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button size="sm" variant="ghost">
                    Profile
                  </Button>
                </Link>
              )
            ) : (
              <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                <Button size="sm" variant="ghost">
                  Login
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
