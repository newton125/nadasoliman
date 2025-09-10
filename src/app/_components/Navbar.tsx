'use client';

import Link from "next/link";
import logo from "../../assets/images/freshcart-logo.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CartResponse } from "../cart/typescript/cart.interface";

export default function Navbar() {
  const { data } = useQuery<CartResponse>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await fetch('/api/cart');
      if (!response.ok) throw new Error('Failed to fetch cart');
      const payload = await response.json();
      return payload;
    },
  });

  function handleLogout() {
    signOut({ callbackUrl: "/" });
  }

  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/", element: "home" },
    { path: "/products", element: "products" },
    { path: "/categories", element: "categories" },
    { path: "/Brands", element: "Brands" },
  ];

  const auths = [
    { path: "/auth/login", element: "login" },
    { path: "/auth/register", element: "register" },
  ];

  // ✅ Function تحدد إذا اللينك active ولا لا
  function isActive(path: string) {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  }

  return (
    <nav className="w-full bg-light border-gray-200 dark:bg-gray-900 relative">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">

        {/* logo */}
        <div className="flex items-center gap-5">
          <Image src={logo} alt="FreshCart Logo" className="h-8" />
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex font-medium flex-row space-x-5">
          {links.map(link => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`${isActive(link.path) ? "active" : ""} block py-2 px-3 text-gray-600 dark:text-white`}
              >
                {link.element}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          className="md:hidden text-gray-600 dark:text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>

        {/* Desktop auth + social */}
        <ul className="hidden md:flex font-medium flex-row space-x-5 items-center">
          {/* Social icons */}
          <li><i className="fa-brands fa-facebook text-lg"></i></li>
          <li><i className="fa-brands fa-twitter  text-lg"></i></li>
          <li><i className="fa-brands fa-google  text-lg"></i></li>

          {/* Auth */}
          {status === "authenticated" ? (
            <>
              <li className="cursor-pointer" onClick={() => handleLogout()}>Logout</li>
              <li><span className="text-main">Hi</span> {session?.user?.name}</li>
              {session?.user.image &&
                <li>
                  <img
                    src={session?.user?.image}
                    alt={session?.user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                </li>}

              {/* Wishlist icon */}
              <li>
                <Link href="/wish-list" className="relative">
                  <i className={`fa-solid fa-heart text-2xl ${isActive("/wish-list") ? "active" : ""}`}></i>
                </Link>
              </li>

              {/* Cart icon */}
              <li>
                <Link href="/cart" className="relative">
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full px-1">
                    {data?.numOfCartItems || 0}
                  </span>
                  <i className="fa-solid fa-cart-shopping  text-2xl"></i>
                </Link>
              </li>
            </>
          ) : (
            auths.map(auth => (
              <li key={auth.path}>
                <Link
                  href={auth.path}
                  className={`${isActive(auth.path) ? "active" : ""} block py-2 px-3 text-gray-600 dark:text-white`}
                >
                  {auth.element}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md p-4 z-50">
          <ul className="flex flex-col mb-4">
            {links.map(link => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`${isActive(link.path) ? "active" : ""} block py-2 px-3 text-gray-600 dark:text-white`}
                >
                  {link.element}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social + Auth (mobile) */}
          <ul className="flex flex-col gap-2">
            {status === "authenticated" ? (
              <>
                <li
                  className="cursor-pointer"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </li>
                <li><span className="text-main">Hi</span>{session?.user?.name}</li>

                {/* Wishlist (mobile) */}
                <li>
                  <Link href="/wish-list" onClick={() => setIsOpen(false)}>
                    <i className={`fa-solid fa-heart ${isActive("/wish-list") ? "active" : ""}`}></i>
                  </Link>
                </li>

                {/* Cart (mobile) */}
                <li>
                  <Link href="/cart" onClick={() => setIsOpen(false)} className="relative">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Link>
                </li>
              </>
            ) : (
              auths.map(auth => (
                <li key={auth.path}>
                  <Link
                    href={auth.path}
                    onClick={() => setIsOpen(false)}
                    className={`${isActive(auth.path) ? "active" : ""} block py-2 px-3 text-gray-600 dark:text-white`}
                  >
                    {auth.element}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
