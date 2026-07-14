"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending || !session) return;

    switch (session.user.role) {
      case "admin":
        router.replace("/dashboard/admin-home");
        break;

      case "creator":
        router.replace("/dashboard/creator-home");
        break;

      case "supporter":
        router.replace("/dashboard/supporter-home");
        break;

      default:
        router.replace("/");
    }
  }, [session, isPending, router]);

  return <p className="text-center py-10">Loading Dashboard...</p>;
}