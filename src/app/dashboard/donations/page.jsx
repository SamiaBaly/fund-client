import { checkRole } from "@/lib/auth-check";
import ManageDonations from "@/components/dashboard/ManageDonations";


export default async function ManageDonationsPage() {

  await checkRole(["admin"]);


  return <ManageDonations />;

}