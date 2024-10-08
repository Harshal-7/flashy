"use client";

import { cn } from "@/lib/utils";
import { MenuIcon, NotepadText, Plus, User, X } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import MyLoginBtn from "./ui/myBtn";
import { Fragment, useState } from "react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { useScrollPosition } from "@/hooks/use-scroll";

const font = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"] });

export const Header = ({ session }: { session: any }) => {
  const path = usePathname();
  const isScrolled = useScrollPosition();
  const scrollClass = isScrolled ? "shadow bg-background" : "shadow-none";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [myOpacity, setMyOpacity] = useState(false);

  const handleHamburgerMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setTimeout(() => {
      setMyOpacity((prev) => !prev);
    }, 300);
  };

  if (path === "/login") {
    return <Fragment></Fragment>;
  }

  if (path === "/register") {
    return <Fragment></Fragment>;
  }

  const handleLogout = () => {
    console.log("logging out...!");
    setIsMenuOpen((prev) => !prev);
    signOut({ redirectTo: "/" });
  };

  return (
    <div
      className={cn(
        "flex w-full shadow z-50]",
        scrollClass,
        path === "/create-card" ? "relative" : "sticky top-0 left-0"
      )}
    >
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
            href="/create-card"
            className={`flex items-center gap-1 text-base p-0 group hover:text-primary hover:font-semibold transition-all duration-300 ${
              path === "/create-card"
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
            className={`flex items-center gap-1 text-base p-0 group hover:text-primary hover:font-semibold transition-all duration-300 ${
              path === "/library"
                ? "font-bold text-primary"
                : "text-neutral-700 font-medium"
            }`}
          >
            <span className="">Library</span>
          </Link>

          {/* User - Login */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:font-semibold hover:text-primary transition-all duration-300 text-neutral-700 font-medium">
                <User className="w-5 h-5 self-center" />
                <span> {session.user.name}</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="p-2 mt-2 w-72">
                <DropdownMenuLabel className="flex flex-row items-center gap-2 px-2 pb-2">
                  {session?.user?.image?.length > 0 ? (
                    <img
                      src={session?.user?.image}
                      alt="pfp"
                      className="h-full max-h-12 object-cover "
                    />
                  ) : (
                    <User className="w-10 h-10 font-light stroke-black/80" />
                  )}

                  <div className="flex flex-col">
                    <div className="text-base">{session?.user?.name}</div>
                    <div>{session?.user?.email}</div>
                  </div>
                </DropdownMenuLabel>
                <Separator />
                <DropdownMenuItem>Privacy Policy</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <Separator />
                <DropdownMenuItem className="cursor-pointer">
                  <button onClick={handleLogout}>Logout</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={`flex items-center gap-1 text-base p-0 group hover:text-primary hover:font-semibold transition-all duration-300 ${
                path === "/library"
                  ? "font-bold text-primary"
                  : "text-neutral-700 font-medium"
              }`}
            >
              <MyLoginBtn />
            </Link>
          )}
        </div>

        {/* MOBILE : card, library, user  */}
        <button
          onClick={handleHamburgerMenu}
          className="md:hidden flex items-center py-5 px-8"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 z-50 text-white" />
          ) : (
            <MenuIcon className="w-6 h-6 text-primary" />
          )}
        </button>

        {/* Hamburger menu component */}
        {isMenuOpen && (
          <div
            className={cn(
              "md:hidden flex flex-col opacity-100 items-center gap-6 absolute bg-primary text-white w-full top-0 left-0 pt-20 pb-10 transition-all duration-500 ease-in-out z-40"
            )}
          >
            <Link
              href="/create-card"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`flex items-center gap-1 text-base p-0 group hover:font-bold transition-all duration-300" ${
                path === "/create-card"
                  ? "font-bold text-white"
                  : "text-white font-medium"
              }`}
            >
              <span className="text-xl">Create Card</span>
            </Link>

            {/* library  */}
            <Link
              href="/library"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`flex items-center gap-1 text-base p-0 group hover:font-bold transition-all duration-300" ${
                path === "/library" ? "font-bold text-white" : "font-medium"
              }`}
            >
              <span className="text-xl">Library</span>
            </Link>

            {/* login */}
            {session?.user?.name ? (
              <button
                className="text-white text-xl hover:font-bold transition-all duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="text-white text-xl hover:font-bold transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
