import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  Target,
  Heart,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import ContributionButton from "../ContributionButton";


export default async function CampaignDetailsPage({ params }) {

  const { id } = await params;


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}`,
    {
      cache: "no-store",
    }
  );


  if (!res.ok) {

    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">

        <h1 className="text-3xl font-bold dark:text-white">
          Campaign Not Found
        </h1>

      </section>
    );

  }


  const campaign = await res.json();


  const percentage = Math.min(
    100,
    Math.round((campaign.raised / campaign.goal) * 100)
  );


  return (

    <section className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-white
      to-blue-50
      px-6
      py-5
      dark:from-slate-950
      dark:via-slate-900
      dark:to-slate-950
    ">


      <div className="mx-auto max-w-7xl">


        <Link
          href="/campaigns"
          className="
          mb-8
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-white
          px-5
          py-2
          font-semibold
          shadow
          transition
          hover:-translate-x-1
          dark:bg-slate-800
          dark:text-white
          "
        >

          <ArrowLeft size={18} />

          Back to Campaigns

        </Link>




        <div className="grid gap-10 lg:grid-cols-2">


          {/* Image */}

          <div className="
            relative
            overflow-hidden
            rounded-[32px]
            shadow-2xl
          ">


            <Image

              src={campaign.image}

              alt={campaign.title}

              width={700}

              height={700}

              className="
              h-[550px]
              w-full
              object-cover
              transition
              duration-500
              hover:scale-105
              "

            />


            <div className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-transparent
              to-transparent
            "/>



            <span className="
              absolute
              left-6
              top-6
              rounded-full
              bg-blue-600
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              shadow-lg
            ">

              {campaign.category}

            </span>




            <div className="
              absolute
              bottom-6
              left-6
              rounded-2xl
              bg-white/90
              px-5
              py-3
              backdrop-blur
              dark:bg-slate-900/80
            ">

              <p className="text-sm text-slate-500">
                Funding Progress
              </p>


              <h3 className="
                text-2xl
                font-bold
                text-blue-600
              ">

                {percentage}% Funded

              </h3>


            </div>


          </div>






          {/* Details */}


          <div className="
            flex
            flex-col
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-8
            shadow-2xl
            dark:border-slate-700
            dark:bg-slate-900
          ">


            <h1 className="
              text-4xl
              font-extrabold
              text-slate-900
              dark:text-white
            ">

              {campaign.title}

            </h1>




            <p className="
              mt-6
              leading-8
              text-slate-600
              dark:text-slate-300
            ">

              {campaign.description}

            </p>





            {/* Stats */}

            <div className="
              mt-8
              grid
              grid-cols-3
              gap-4
            ">


              <div className="
                rounded-2xl
                bg-slate-100
                p-5
                text-center
                dark:bg-slate-800
              ">

                <Target className="mx-auto mb-3 text-blue-600" />

                <p className="text-sm text-slate-500">
                  Goal
                </p>


                <h3 className="text-xl font-bold dark:text-white">
                  ${campaign.goal}
                </h3>


              </div>




              <div className="
                rounded-2xl
                bg-slate-100
                p-5
                text-center
                dark:bg-slate-800
              ">

                <Heart className="mx-auto mb-3 text-red-500" />


                <p className="text-sm text-slate-500">
                  Raised
                </p>


                <h3 className="text-xl font-bold dark:text-white">
                  ${campaign.raised}
                </h3>


              </div>




              <div className="
                rounded-2xl
                bg-slate-100
                p-5
                text-center
                dark:bg-slate-800
              ">

                <TrendingUp className="mx-auto mb-3 text-green-500" />


                <p className="text-sm text-slate-500">
                  Progress
                </p>


                <h3 className="text-xl font-bold text-green-600">
                  {percentage}%
                </h3>


              </div>


            </div>






            {/* Progress Bar */}


            <div className="mt-8">


              <div className="
                mb-3
                flex
                justify-between
                text-sm
                font-semibold
                dark:text-white
              ">

                <span>
                  Campaign Progress
                </span>


                <span>
                  {percentage}%
                </span>


              </div>




              <div className="
                h-4
                overflow-hidden
                rounded-full
                bg-slate-200
                dark:bg-slate-700
              ">


                <div

                  className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-blue-500
                  via-cyan-500
                  to-green-400
                  "

                  style={{
                    width: `${percentage}%`
                  }}

                />

              </div>


            </div>






            {/* Why Support */}

            <div className="
              mt-10
              rounded-3xl
              bg-slate-100
              p-6
              dark:bg-slate-800
            ">


              <h2 className="
                mb-5
                text-xl
                font-bold
                dark:text-white
              ">

                Why Support This Campaign?

              </h2>




              <div className="space-y-4">


                <div className="flex gap-3">

                  <ShieldCheck className="text-green-500" />

                  <p>
                    Secure and transparent fundraising process.
                  </p>

                </div>



                <div className="flex gap-3">

                  <BadgeCheck className="text-blue-600" />

                  <p>
                    Verified campaign with trusted organizers.
                  </p>

                </div>



                <div className="flex gap-3">

                  <Heart className="text-red-500" />

                  <p>
                    Every contribution helps bring this goal closer.
                  </p>

                </div>


              </div>


            </div>






            {/* Donate */}

            <div className="mt-auto pt-10">


              <ContributionButton campaign={campaign} />


            </div>



          </div>


        </div>


      </div>


    </section>

  );

}