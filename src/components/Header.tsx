"use client";

import { cn } from "@/lib/utils";
import { MenuIcon, NotepadText, Plus, User, X } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import MyButton from "./ui/myBtn";
import { useState } from "react";
import { Button } from "./ui/button";

// const font = Nerko_One({ subsets: ["latin"], weight: "400" });
const font = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"] });

export const Header = () => {
  const isActive = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [myOpacity, setMyOpacity] = useState(false);

  const handleHamburgerMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setTimeout(() => {
      setMyOpacity((prev) => !prev);
    }, 300);
  };

  return (
    <div className="flex w-full max-w-7xl mx-auto justify-between items-center relative">
      {/* logo */}
      <Link
        href="/"
        className="flex gap-1 md:gap-1.5 items-center py-5 px-8 text-primary"
      >
        <NotepadText className="w-5 md:w-6 h-5 md:h-6" />
        <span className={cn("text-xl md:text-3xl font-bold", font.className)}>
          flashy
        </span>
      </Link>

      {/* card, library, user  */}
      <div className="hidden md:flex items-center gap-8 px-6">
        {/* create card  */}
        <Link
          href="/create"
          className={`flex items-center gap-1 text-base p-0 group hover:text-primary hover:font-semibold transition-all duration-300" ${
            isActive === "/create"
              ? "font-bold text-primary"
              : "text-neutral-700 font-medium"
          }`}
        >
          <span className="">Create Card</span>
          <Plus className="w-4 h-4" />
        </Link>

        {/* library  */}
        <Link
          href="/library"
          className={`flex items-center gap-1 text-base p-0 group hover:text-primary hover:font-semibold transition-all duration-300" ${
            isActive === "/library"
              ? "font-bold text-primary"
              : "text-neutral-700 font-medium"
          }`}
        >
          <span className="">Library</span>
        </Link>

        {/* login */}
        <Link href="/login">
          <MyButton />
        </Link>
      </div>

      {/* MOBILE : card, library, user  */}
      <button
        onClick={handleHamburgerMenu}
        className="md:hidden flex items-center py-5 px-8"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 z-10 text-white" />
        ) : (
          <MenuIcon className="w-6 h-6 text-primary" />
        )}
      </button>

      {/* Hamburger menu component */}
      {isMenuOpen && (
        <div
          className={cn(
            "md:hidden flex flex-col opacity-100 items-center gap-6 absolute bg-primary text-white w-full top-0 left-0 pt-20 pb-10 transition-all duration-500 ease-in-out",
            myOpacity
              ? "opacity-100 transition-all duration-500 ease-in-out"
              : "opacity-0 transition-all duration-500 ease-in-out"
          )}
        >
          <Link
            href="/create"
            className={`flex items-center gap-1 text-base p-0 group hover:font-bold transition-all duration-300" ${
              isActive === "/create" ? "font-bold text-white" : "font-medium"
            }`}
          >
            <span className="text-xl">Create Card</span>
            <Plus className="w-4 h-4" />
          </Link>

          {/* library  */}
          <Link
            href="/library"
            className={`flex items-center gap-1 text-base p-0 group hover:font-bold transition-all duration-300" ${
              isActive === "/library" ? "font-bold text-white" : "font-medium"
            }`}
          >
            <span className="text-xl">Library</span>
          </Link>

          {/* login */}
          <Link
            href="/login"
            className="text-white text-xl hover:font-bold transition-all duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};
