"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "react-hot-toast";


import {
  Dropdown,
  Button,
  Label,
  Description,
  Separator,
  Avatar,
} from "@heroui/react";

import { useSession, signOut } from "@/lib/auth-client";
import { menuItems } from "@/config/dashboardMenu";

const ThemeToggle = dynamic(
  () => import("./ThemeToggle"),
  { ssr: false }
);

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/campaigns",
    label: "All Campaigns",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    data: session,
    isPending,
  } = useSession();

  const handleLogout = async () => {
    const { error } = await signOut();

    if (error) {
      toast.error("Logout failed");
      return;
    }

    setMenuOpen(false);

    toast.success("Logout Successful");

    router.push("/");
    router.refresh();
  };

  if (isPending) return null;

  const role = session?.user?.role || "supporter";
  const userMenu = menuItems[role] || [];
  return (
    <nav
      className="
      sticky
      top-0
      z-50
      border-b
      border-slate-200
      bg-white/95
      shadow-sm
      backdrop-blur-xl
      dark:border-slate-800
      dark:bg-slate-950/95
    "
    >
      <div
        className="
        mx-auto
        flex
        h-16
        max-w-7xl
        items-center
        justify-between
        px-5
        lg:px-8
      "
      >
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div
            className="
            rounded-2xl
            bg-blue-100
            p-2
            transition
            duration-300
            group-hover:scale-105
            dark:bg-slate-800
          "
          >
            <Image
              src="/images/logo.png"
              alt="CrowdFund"
              width={42}
              height={42}
            />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              CrowdFund
            </h1>

            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              Support dreams ❤️
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
              rounded-full
              px-5
              py-2
              text-sm
              font-semibold
              transition-all
              duration-200

              ${pathname === item.href
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                }
            `}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {!session ? (
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/login">
                <Button
                  variant="bordered"
                  className="
          rounded-xl
          border-slate-300
          px-5
          font-semibold
          dark:border-slate-700
        "
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  color="primary"
                  className="
          rounded-xl
          px-6
          font-semibold
          shadow-lg
          shadow-blue-500/20
          transition-transform
          hover:scale-105
        "
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Dropdown>
              <Dropdown.Trigger>
                <Avatar
                  className="
          cursor-pointer
          ring-2
          ring-blue-500/30
          transition
          hover:ring-blue-500
        "
                >
                  <Avatar.Image
                    src={session.user.image}
                  />

                  <Avatar.Fallback>
                    {session.user.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <Dropdown.Menu>

                  <Dropdown.Item isReadOnly>
                    <Label className="font-bold">
                      {session.user.name}
                    </Label>

                    <Description>
                      {session.user.email}
                    </Description>
                  </Dropdown.Item>

                  <Separator />

                  {userMenu.map((item) => (
                    <Dropdown.Item
                      key={item.href}
                      onAction={() =>
                        router.push(item.href)
                      }
                    >
                      <Label>{item.name}</Label>
                    </Dropdown.Item>
                  ))}

                  <Separator />

                  <Dropdown.Item
                    color="danger"
                    onAction={handleLogout}
                  >
                    <Label>
                      🚪 Logout
                    </Label>
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
    rounded-xl
    p-2
    transition
    hover:bg-slate-100
    dark:hover:bg-slate-800
    lg:hidden
  "
          >
            ☰
          </button>

        </div>

      </div>
      {menuOpen && (
        <div
          className="
      lg:hidden
      border-t
      border-slate-200
      bg-white
      dark:border-slate-800
      dark:bg-slate-950
    "
        >
          <div className="space-y-2 px-5 py-5">

            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`
            block
            rounded-xl
            px-4
            py-3
            transition

            ${pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }
          `}
              >
                {item.label}
              </Link>
            ))}

            {session && (
              
              <>
                <hr className="border-slate-700" />

                {userMenu.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      setMenuOpen(false);
                    }}
                    className="
                block
                w-full
                rounded-xl
                px-4
                py-3
                text-left
                hover:bg-slate-100
                dark:hover:bg-slate-800
              "
                  >
                    {item.name}
                  </button>
                ))}

                <button
                  onClick={handleLogout}
                  className="
              mt-2
              w-full
              rounded-xl
              bg-red-600
              py-3
              text-white
            "
                >
                  Logout
                </button>
              </>
            )}

            {!session && (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="
              block
              rounded-xl
              bg-blue-600
              py-3
              text-center
              text-white
            "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="
              block
              rounded-xl
              bg-green-600
              py-3
              text-center
              text-white
            "
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}