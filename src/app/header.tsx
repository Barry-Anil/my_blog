"use client";
import React, { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-0 w-full z-30 bg-white md:bg-opacity-90 transition duration-300 ease-in-out">
      <div className="container flex max-w-6xl px-4 mx-auto items-center justify-between">
        <div className="flex flex-row items-center justify-between p-4">
          <Link href="/" className="text-lg font-semibold">
            My Blog
          </Link>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 md:hidden "
            onClick={toggleNavbar}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:w-auto w-full`}
        >
          <div className="md:flex md:gap-8 text-base text-gray-600 pt-4 md:pt-0 pb-4 md:pb-0 md:mt-0">
            <SignedIn>
              <Link href="/dashboard" className="link md:inline-block mr-4">
                Dashboard
              </Link>
              <Link href="/create" className="link md:inline-block mr-4">
                Create
              </Link>
              <Link href="/explore" className="link md:inline-block mr-4">
                Explore
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/pricing" className="link md:inline-block mr-4">
                Pricing
              </Link>
              <Link href="/about" className="link md:inline-block mr-4">
                About
              </Link>
            </SignedOut>
          </div>
          <div className="flex gap-4 items-center">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}