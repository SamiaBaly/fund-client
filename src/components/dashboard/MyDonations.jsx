"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";


export default function MyDonations() {

  const { data: session, isPending } = authClient.useSession();


  const [donations, setDonations] = useState([]);

  const [loading, setLoading] = useState(true);




  useEffect(() => {
    if (!session?.user?.email || !session?.session?.token) {
      setLoading(false);
      return;
    }

    const loadDonations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/donations/my-donations?email=${session.user.email}`,
          {
            headers: {
              Authorization: `Bearer ${session.session.token}`,
            },
          }
        );

        const data = await res.json();

        console.log(data);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch donations");
        }

        setDonations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };

    loadDonations();
  }, [session]);
  console.log(donations);

  const totalAmount = Array.isArray(donations)
    ? donations.reduce(
      (sum, donation) => sum + Number(donation.amount),
      0
    )
    : 0;

  const totalDonations = Array.isArray(donations)
    ? donations.length
    : 0;

  const lastDonation =
    donations.length > 0
      ? new Date(donations[0].donatedAt).toLocaleDateString()
      : "--";



  if (isPending || loading) {

    return (
      <div className="flex min-h-[300px] items-center justify-center">

        <p className="font-semibold">
          Loading donations...
        </p>

      </div>
    );

  }





  return (

    <div>


      <div className="mb-8">


        <h1 className="
          text-3xl
          font-bold
          text-slate-900
          dark:text-white
        ">
          My Donations ❤️
        </h1>
       



        <p className="
          mt-2
          text-slate-600
          dark:text-slate-400
        ">
          Track all campaigns you supported.
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


            <p className="mt-2 text-slate-500">

              You havent supported any campaign yet.

            </p>


          </div>


        ) : (



          <div className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          ">


          
              {
                Array.isArray(donations) &&
                donations.map((donation)=> {

                  const active =
                    donation.campaignDeadline &&
                    new Date(donation.campaignDeadline) >= new Date();

                  return (
                    <div
                      key={donation._id}
                      className="
          overflow-hidden
          rounded-2xl
          bg-white
          shadow
          dark:bg-slate-800
        "
                    >
                      <Image
                        src={
                          donation.campaignImage &&
                            donation.campaignImage.startsWith("http") &&
                            donation.campaignImage !== "https://..."
                            ? donation.campaignImage
                            : "/placeholder.jpg"
                        }
                        alt={donation.campaignTitle || "Campaign image"}
                        width={400}
                        height={220}
                        className="h-56 w-full rounded-t-2xl object-cover"
                      />

                      <div className="p-5">
                        <h2 className="text-xl font-bold dark:text-white">
                          {donation.campaignTitle}
                        </h2>

                        <div className="mt-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >
                            {active ? "Active" : "Ended"}
                          </span>
                        </div>

                        <div className="mt-4 space-y-2 text-sm">
                          <p className="text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">Donated:</span>{" "}
                            <span className="font-bold text-green-600">
                              ${donation.amount}
                            </span>
                          </p>

                          <p className="text-slate-600 dark:text-slate-400">
                            <span className="font-semibold">Date:</span>{" "}
                            {new Date(donation.donatedAt).toLocaleDateString()}
                          </p>
                        </div>

                        <Link href={`/campaigns/${donation.campaignId}`}>
                          <Button className="mt-5 w-full rounded-sm">
                            View Campaign
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );

                })
              }


          </div>


        )
      }



    </div>

  );

}