import * as React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { AddPost } from "./addPost";

export function Navbar() {
  return (
    <>
      <header className="fixed inset-x-0 w-full max-w-6xl p-4 mx-auto rounded-md shadow-md dark:border dark:border-zinc-800 top-2 backdrop-blur-xl">
        <nav className="flex items-center justify-between ">
          {/* Logo */}
          <Link
            className="font-bold text-left text-zinc-900 dark:text-white"
            href={"/"}
          >
            Blogs
          </Link>

          {/* Navigation and Mode Toggle */}
          <div className="flex items-center gap-2 ml-auto">
            {/* <AddPost /> */}
            <ModeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
