import CampaignForm from "@/components/forms/CampaignForm";
import { checkRole } from "@/lib/auth-check";



export default async function CreateCampaignPage() {

  await checkRole([
    "creator"
  ]);


  return (
    <CampaignForm />
  );
}