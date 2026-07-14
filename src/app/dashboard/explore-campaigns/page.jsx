import { redirect } from "next/navigation";
import { checkRole } from "@/lib/auth-check";

export default async function ExploreCampaignsPage() {
  await checkRole(["supporter"]);

  redirect("/campaigns");
}