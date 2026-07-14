"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
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
];







export default function Navbar() {

  const router = useRouter();

  const pathname = usePathname();


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


    toast.success("Logout Successful");


    router.push("/");

    router.refresh();

  };



  if (isPending) return null;



  if (isPending) return null;


  const role =
    session?.user?.role || "supporter";


  const userMenu =
    menuItems[role] || [];



  return (

    <nav
      className="
  sticky
  top-0
  z-50
  border-b
  border-slate-200/50
  bg-white/80
  backdrop-blur-xl
  dark:border-slate-800
  dark:bg-slate-950/80
  "
    >


      <div
        className="
mx-auto
flex
h-20
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
          className="
flex
items-center
gap-3
group
"
        >

          <div
            className="
rounded-2xl
bg-primary/10
p-1
transition
group-hover:scale-105
"
          >

            <Image
              src="/images/logo.png"
              alt="CrowdFund"
              width={45}
              height={45}
            />

          </div>


          <div>

            <h1
              className="
text-xl
font-extrabold
tracking-tight
text-slate-900
dark:text-white
"
            >
              CrowdFund
            </h1>


            <p
              className="
hidden
text-xs
text-slate-500
sm:block
"
            >
              Support dreams ❤️
            </p>


          </div>


        </Link>





        {/* Desktop Navigation */}

        <div
          className="
hidden
items-center
gap-2
md:flex
"
        >

          {
            navLinks.map((item) => (

              <Link
                key={item.href}
                href={item.href}

                className={`
rounded-full
px-5
py-2
text-sm
font-semibold
transition

${pathname === item.href

                    ?

                    "bg-primary text-white shadow-md"

                    :

                    "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"

                  }

`}
              >

                {item.label}

              </Link>


            ))
          }


        </div>





        {/* Right */}

        <div
          className="
flex
items-center
gap-3
"
        >


          <ThemeToggle />



          {
            !session ?

              (

                <div className="hidden gap-3 md:flex">

                  <Link href="/login">

                    <Button
                      variant="light"
                      className="
rounded-xl
font-semibold
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
shadow-md
"
                    >
                      Register
                    </Button>

                  </Link>

                </div>


              )

              :


              (

                <Dropdown>

                  <Dropdown.Trigger>

                    <Avatar
                      className="
cursor-pointer
ring-2
ring-primary/20
"
                    >

                      <Avatar.Image
                        src={session.user.image}
                      />


                      <Avatar.Fallback>

                        {
                          session.user.name
                            ?.charAt(0)
                            ?.toUpperCase()
                        }

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



                      {
                        userMenu.map((item) => (

                          <Dropdown.Item
                            key={item.href}
                            onAction={() => router.push(item.href)}
                          >

                            <Label>
                              {item.name}
                            </Label>


                          </Dropdown.Item>

                        ))
                      }



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

              )

          }


        </div>



      </div>


    </nav>

  );

}