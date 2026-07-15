import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("Dashboard session:", session);
console.log("Role:", session?.user?.role);

 
  if (!session) {
    redirect("/login");
  }

  // Valid role check
  const allowedRoles = ["admin", "creator", "supporter"];

  if (!allowedRoles.includes(session.user.role)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Content */}
      <main className="flex-1 p-8">
        <div className="min-h-full rounded-2xl p-6 text-slate-900 dark:text-white">
          {children}
        </div>
      </main>
    </div>
  );
}