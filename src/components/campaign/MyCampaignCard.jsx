"use client";

import Image from "next/image";
import Link from "next/link";

export default function MyCampaignCard({
  campaign,
  onDelete,
}) {

  const percentage = Math.round(
    (campaign.raised / campaign.goal) * 100
  );


  return (
    <div
      className="
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      shadow-md
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-xl

      dark:border-slate-700
      dark:bg-slate-900
      "
    >

      {/* Image */}

      <div className="relative h-52 w-full overflow-hidden">

        <Image
          src={
            campaign.image?.startsWith("http")
              ? campaign.image
              : "https://placehold.co/600x400"
          }
          alt={campaign.title}
          fill
          className="object-cover"
        />

      </div>



      {/* Content */}

      <div className="space-y-4 p-6">


        {/* Category + Percentage */}

        <div className="flex justify-between items-center">

          <span
            className="
            rounded-full
            bg-blue-100
            px-3
            py-1
            text-xs
            font-semibold
            text-blue-700

            dark:bg-blue-900/40
            dark:text-blue-300
            "
          >
            {campaign.category}
          </span>


          <span
            className="
            text-sm
            font-bold
            text-blue-600
            dark:text-blue-400
            "
          >
            {percentage}%
          </span>

        </div>



        {/* Title */}

        <h2
          className="
          text-xl
          font-bold
          text-slate-900
          dark:text-white
          "
        >
          {campaign.title}
        </h2>



        {/* Description */}

        <p
          className="
          line-clamp-2
          text-sm
          leading-6
          text-slate-600
          dark:text-slate-400
          "
        >
          {campaign.description}
        </p>



        {/* Progress */}

        <div
          className="
          h-3
          w-full
          overflow-hidden
          rounded-full
          bg-slate-200
          dark:bg-slate-700
          "
        >

          <div
            className="
            h-full
            rounded-full
            bg-blue-600
            "
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>



        {/* Amount */}

        <div
          className="
          flex
          justify-between
          text-sm
          text-slate-600
          dark:text-slate-300
          "
        >

          <span>
            Raised:
            <strong> ${campaign.raised}</strong>
          </span>


          <span>
            Goal:
            <strong> ${campaign.goal}</strong>
          </span>

        </div>


      </div>




      {/* Actions */}

      {/* Actions */}

      <div className="grid grid-cols-3 gap-3 px-6 pb-6">


        {/* Details */}

        <Link
          href={`/campaigns/${campaign._id}`}
          className="
    rounded-full
    border
    border-blue-200
    bg-blue-50
    py-2
    text-center
    text-sm
    font-semibold
    text-blue-700
    transition
    hover:bg-blue-100

    dark:border-blue-800
    dark:bg-blue-900/30
    dark:text-blue-300
    "
        >
          View
        </Link>



        {/* Edit */}

        <Link
          href={`/dashboard/my-campaigns/edit/${campaign._id}`}
          className="
    rounded-full
    border
    border-amber-200
    bg-amber-50
    py-2
    text-center
    text-sm
    font-semibold
    text-amber-700
    transition
    hover:bg-amber-100

    dark:border-amber-800
    dark:bg-amber-900/30
    dark:text-amber-300
    "
        >
          Edit
        </Link>



        {/* Delete */}

        <button
          onClick={() => onDelete(campaign._id)}
          className="
    rounded-full
    border
    border-red-200
    bg-red-50
    py-2
    text-sm
    font-semibold
    text-red-700
    transition
    hover:bg-red-100

    dark:border-red-800
    dark:bg-red-900/30
    dark:text-red-300
    "
        >
          Delete
        </button>


      </div>


    </div>
  );
}