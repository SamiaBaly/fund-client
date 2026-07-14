"use client";

import Link from "next/link";

import { useSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { menuItems } from "@/config/dashboardMenu";


export default function DashboardSidebar() {

  const { data: session } = useSession();
  const pathname = usePathname();


  const role = session?.user?.role || "supporter";


  const sidebarItems = menuItems[role] || [];


  return (
    <aside
      className="
      w-72
      bg-white dark:bg-slate-900
      text-slate-800 dark:text-white
      shadow-lg
      p-6
      hidden md:block
      "
    >

      <h2 className="text-3xl font-bold mb-10">
        FundFlow
      </h2>


      <nav className="space-y-4">

        {
          sidebarItems.map((item) => {

            const Icon = item.icon;


            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
flex items-center gap-4
px-4 py-3
rounded-xl
transition

${pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }
`}
              >

                <Icon />

                {item.name}

              </Link>
            );

          })
        }

      </nav>


    </aside>
  );
}