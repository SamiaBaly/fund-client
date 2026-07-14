import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";


export async function checkRole(allowedRoles = []) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });


  if (!session?.user) {

    redirect("/login");

  }


  const userRole = session.user.role;


  if (!allowedRoles.includes(userRole)) {

    redirect("/dashboard");

  }


  return session;

}