"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import api from "@/lib/api";


import MyCampaignCard from "@/components/campaign/MyCampaignCard";


export default function MyCampaignsPage() {

 
  const { data: session, isPending } = authClient.useSession();

  console.log("SESSION:", session);
  console.log("PENDING:", isPending);


  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(true);



  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this campaign?"
    );

    if (!confirmDelete) return;


    try {

      const token = await authClient.token();


      await api.delete(
        `/campaigns/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setCampaigns((prev) =>
        prev.filter(
          (campaign) => campaign._id !== id
        )
      );


    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    const loadCampaigns = async () => {

  console.log("LOAD CAMPAIGNS START");

  if (!session?.user?.email) {
    console.log("NO EMAIL");
    setLoading(false);
    return;
  }

  try {

    setLoading(true);

    console.log(
      "USER EMAIL:",
      session.user.email
    );


    const res = await api.get(
      `/campaigns/my-campaigns?email=${session.user.email}`
    );
    console.log(process.env.NEXT_PUBLIC_API_URL);


    console.log(
      "API DATA:",
      res.data
    );


    setCampaigns(res.data);


  } catch(error){

    console.log(
      "API ERROR:",
      error
    );

  } finally {

    console.log("FINALLY RUN");

    setLoading(false);

  }

};


    loadCampaigns();


  }, [session?.user?.email]);




  if (isPending || loading) {

    return (
      <div className="
        flex
        min-h-screen
        items-center
        justify-center
      ">
        <p className="text-xl font-semibold">
          Loading campaigns...
        </p>
      </div>
    );

  }



  return (

    <section>

      <div className="mx-auto max-w-7xl">


        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white !text-slate-900 dark:!text-white">
            My Campaigns
          </h1>


          <p className="
            mt-3
            text-slate-600
            dark:text-slate-400
          ">
            Manage your created fundraising campaigns.
          </p>

        </div>



        {
          campaigns.length > 0 ? (

            <div className="
              grid
              gap-8
              sm:grid-cols-2
              lg:grid-cols-3
            ">

              {
                campaigns.map((campaign) => (

                  <MyCampaignCard
                    key={campaign._id}
                    campaign={campaign}
                    onDelete={handleDelete}
                  />

                ))
              }

            </div>

          ) : (

            <div className="
              py-20
              text-center
              text-slate-500
            ">

              No campaigns found

            </div>

          )
        }


      </div>

    </section>

  );
}