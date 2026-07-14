import MyDonations from "@/components/dashboard/MyDonations";
import { checkRole } from "@/lib/auth-check";


export default async function MyDonationsPage() {

  await checkRole([
    "supporter"
  ]);


  return <MyDonations />;

}