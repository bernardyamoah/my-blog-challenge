"use client";
import * as React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";



export function Navbar() {
  return (
    <>
      <header className=" fixed dark:border dark:border-zinc-800  inset-x-0 top-2 p-4 mx-auto max-w-6xl  w-full shadow-md rounded-md   backdrop-blur-xl">
        <nav className="flex items-center justify-between ">
          {/* Logo */}
          <Link
            className="font-bold text-left text-zinc-900 dark:text-white"
            href={"/"}
          >
        Blogs
          </Link>

          {/* Navigation and Mode Toggle */}
          <div className="flex gap-2 ml-auto self-end">
            <ModeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
