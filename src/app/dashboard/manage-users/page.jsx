import { checkRole } from "@/lib/auth-check";
import ManageUsers from "@/components/dashboard/ManageUsers";

export default async function ManageUsersPage() {
 
  await checkRole(["admin"]);

  return <ManageUsers />;
}