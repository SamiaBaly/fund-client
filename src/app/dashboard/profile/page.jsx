import ProfileCard from "@/components/profile/ProfileCard";
import { checkRole } from "@/lib/auth-check";

export default async function ProfilePage() {
  await checkRole([
    "supporter",
    "creator",
    "admin",
  ]);

  return <ProfileCard />;
}