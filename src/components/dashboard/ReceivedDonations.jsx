"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Heart } from "lucide-react";

export default function ReceivedDonations() {

  const { data: session, isPending } = authClient.useSession();

  const [donations, setDonations] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    if (!session?.user?.email) return;


    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/donations/creator?email=${session.user.email}`
    )
      .then(res => res.json())
      .then(data => {

        setDonations(data);

      })
      .catch(error => {

        console.log(error);

      })
      .finally(() => {

        setLoading(false);

      });


  }, [session]);



  if (isPending || loading) {

    return (
      <div className="flex min-h-[300px] items-center justify-center">
        Loading donations...
      </div>
    );

  }



  return (

    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold !text-slate-900 dark:!text-white">
          Received Donations ❤️
        </h1>


        <p className="mt-2 text-slate-500">
          See donations received on your campaigns.
        </p>

      </div>



      {
        donations.length === 0 ? (

          <div className="
            rounded-2xl
            bg-white
            p-10
            text-center
            shadow
            dark:bg-slate-800
          ">

            <Heart
              className="mx-auto mb-4 text-red-500"
              size={40}
            />

            <h2 className="text-xl font-bold dark:text-white">
              No Donations Found
            </h2>

          </div>

        ) : (

            <div className="
  overflow-x-auto
  rounded-3xl
  bg-white
  shadow
  dark:bg-slate-800
">

              <table className="w-full">

                <thead className="
      border-b
      bg-slate-100
      dark:border-slate-700
      dark:bg-slate-900
    ">

                  <tr>

                    <th className="px-6 py-4 text-left">
                      Campaign
                    </th>

                    <th className="px-6 py-4 text-left">
                      Donor
                    </th>

                    <th className="px-6 py-4 text-left">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {
                    donations.map((donation) => (

                      <tr
                        key={donation._id}
                        className="
              border-b
              dark:border-slate-700
              hover:bg-slate-50
              dark:hover:bg-slate-900
            "
                      >

                        <td className="px-6 py-4">

                          {donation.campaignTitle}

                        </td>


                        <td className="px-6 py-4">

                          {donation.donorEmail}

                        </td>


                        <td className="
              px-6
              py-4
              font-bold
              text-green-600
            ">

                          ${donation.amount}

                        </td>


                        <td className="px-6 py-4">

                          {new Date(
                            donation.donatedAt
                          ).toLocaleDateString()}

                        </td>


                      </tr>

                    ))
                  }


                </tbody>


              </table>


            </div>

        )
      }


    </div>

  );

}