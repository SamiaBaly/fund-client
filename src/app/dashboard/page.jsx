"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const { data: session, isPending } = authClient.useSession();
  console.log("SESSION:", session);
  console.log("PENDING:", isPending);

  const router = useRouter();


  useEffect(() => {

    if (isPending) return;


    if (!session) {
      router.replace("/login");
      return;
    }


    const role = session.user?.role;


    if (role === "admin") {
      router.replace("/dashboard/admin-home");
    }

    else if (role === "creator") {
      router.replace("/dashboard/creator-home");
    }

    else if (role === "supporter") {
      router.replace("/dashboard/supporter-home");
    }

    else {
      router.replace("/");
    }


  }, [session, isPending, router]);



  if (isPending) {
    return (
      <p className="text-center py-10">
        Checking session...
      </p>
    );
  }


  return (
    <p className="text-center py-10">
      Loading Dashboard...
    </p>
  );
}