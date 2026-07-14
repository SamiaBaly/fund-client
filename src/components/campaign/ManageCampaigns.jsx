"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function ManageCampaigns() {

  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/campaigns/admin`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch campaigns");
        }

        const data = await res.json();
        console.log("ADMIN CAMPAIGNS:", data);

        if (data.campaigns) {
          setCampaigns(data.campaigns);
        } else {
          setCampaigns(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this campaign?"
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setCampaigns((prev) =>
        prev.filter((campaign) => campaign._id !== id)
      );

     
      toast.success("Campaign deleted successfully");

      // alert("Campaign deleted successfully");

    } catch (error) {

      console.error(error);

      toast.error("Failed to delete campaign");


    }

  };

  const handleStatusUpdate = async (id, status) => {
    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/campaigns/status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );


      const data = await res.json();


      if (!res.ok) {
        throw new Error(data.message || "Status update failed");
      }


      setCampaigns((prev) =>
        prev.map((campaign) =>
          campaign._id === id
            ? {
              ...campaign,
              status,
            }
            : campaign
        )
      );


      toast.success(`Campaign ${status}`);


    } catch (error) {

      console.log(error);

      toast.error("Failed to update status");

    }
  };

  return (
    <div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            Manage Campaigns
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all crowdfunding campaigns.
          </p>
        </div>

        <div className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
          {campaigns.length} Campaigns
        </div>

      </div>

      {
        loading ? (

          <div className="py-20 text-center font-semibold">
            Loading campaigns...
          </div>

        ) : error ? (

          <div className="py-20 text-center text-red-500">
            {error}
          </div>

        ) : (

          <div className="overflow-x-auto rounded-3xl bg-white shadow-lg dark:bg-slate-900">

            <table className="w-full">

              <thead className="border-b bg-slate-100 dark:border-slate-700 dark:bg-slate-800">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Campaign
                  </th>

                  <th className="px-6 py-4 text-left">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left">
                    Goal
                  </th>

                  <th className="px-6 py-4 text-left">
                    Raised
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  campaigns.length === 0 ? (

                    <tr>

                      <td
                        colSpan={6}
                        className="py-12 text-center text-slate-500"
                      >
                        No campaigns found.
                      </td>

                    </tr>

                  ) : (

                    campaigns.map((campaign) => {

                      const active =
                        new Date(campaign.deadline) > new Date();
                      const status = campaign.status || "pending";

                      return (

                        <tr
                          key={campaign._id}
                          className="border-b transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                        >

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              <Image
                                src={campaign.image}
                                alt={campaign.title}
                                width={60}
                                height={60}
                                className="rounded-xl object-cover"
                              />

                              <div>

                                <h3 className="font-semibold dark:text-white">
                                  {campaign.title}
                                </h3>

                                <p className="text-sm text-slate-500">
                                  {campaign.creatorName}
                                </p>

                              </div>

                            </div>

                          </td>

                          <td className="px-6 py-4">
                            {campaign.category}
                          </td>

                          <td className="px-6 py-4 font-semibold">
                            ${campaign.goal}
                          </td>

                          <td className="px-6 py-4 font-semibold text-green-600">
                            ${campaign.raised}
                          </td>

                          <td className="px-6 py-4">

                            <span
                              className={`rounded-full px-3 py-1 text-sm font-semibold
    ${status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : status === "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }
  `}
                            >
                              {status}
                            </span>

                          </td>

                          <td className="px-6 py-4">

                            <div className="flex justify-center gap-2">

                              {
                                status === "pending" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(
                                          campaign._id,
                                          "approved"
                                        )
                                      }
                                      className="
          rounded-lg 
          bg-green-500 
          px-3 
          py-2 
          text-sm 
          font-semibold 
          text-white
          hover:bg-green-600
          "
                                    >
                                      Approve
                                    </button>


                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(
                                          campaign._id,
                                          "rejected"
                                        )
                                      }
                                      className="
          rounded-lg 
          bg-orange-500 
          px-3 
          py-2 
          text-sm 
          font-semibold 
          text-white
          hover:bg-orange-600
          "
                                    >
                                      Reject
                                    </button>
                                  </>
                                )
                              }


                              <button
                                onClick={() => handleDelete(campaign._id)}
                                className="
    rounded-lg 
    bg-red-500 
    px-3 
    py-2 
    text-sm 
    font-semibold 
    text-white
    hover:bg-red-600
    "
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      );

                    })

                  )
                }

              </tbody>

            </table>

          </div>

        )
      }

    </div>
  );
}