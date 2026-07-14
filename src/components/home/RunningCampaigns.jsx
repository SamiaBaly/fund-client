"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

export default function RunningCampaigns() {

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns/running`)
      .then(res => res.json())
      .then(data => {
        setCampaigns(data.slice(0, 4));
      })
      .catch(error => console.log(error));

  }, []);


  return (

    <section className="px-6 py-16">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">

          <h2 className="
            text-3xl
            font-bold
            dark:text-white
          ">
            Running Campaigns
          </h2>

          <p className="mt-2 text-slate-500">
            Support campaigns that are making an impact.
          </p>

        </div>


        <div className="
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-4
        ">

          {
            campaigns.map((campaign) => (

              <div
                key={campaign._id}
                className="
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  shadow
                  dark:bg-slate-900
                "
              >

                <Image
                  src={campaign.image || "/placeholder.jpg"}
                  alt={campaign.title}
                  width={400}
                  height={250}
                  className="
                    h-52
                    w-full
                    object-cover
                  "
                />


                <div className="p-5">

                  <h3 className="
                    text-xl
                    font-bold
                    dark:text-white
                  ">
                    {campaign.title}
                  </h3>


                  <p className="
                    mt-2
                    line-clamp-2
                    text-slate-500
                  ">
                    {campaign.description}
                  </p>


                  <div className="mt-4 flex justify-between">

                    <span className="font-semibold text-green-600">
                      Raised ${campaign.raised}
                    </span>

                    <span className="font-semibold">
                      Goal ${campaign.goal}
                    </span>

                  </div>


                  <Link
                    href={`/campaigns/${campaign._id}`}
                    className="
                      mt-5
                      block
                      rounded-xl
                      bg-primary
                      py-2
                      text-center
                      font-semibold
                      text-white
                    "
                  >
                    <Button>View Campaign</Button>
                  </Link>


                </div>

              </div>

            ))
          }

        </div>


      </div>

    </section>

  );

}