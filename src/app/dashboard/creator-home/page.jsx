"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  FaBullhorn,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
export default function CreatorHomePage() {

  const { data: session } = authClient.useSession();

  const [stats, setStats] = useState({});

  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {

    if (!session?.user?.email) return;

    const loadData = async () => {

      try {

        const [statsRes, campaignsRes] = await Promise.all([

          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/campaigns/creator-stats?email=${session.user.email}`
          ),

          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/campaigns/my-campaigns?email=${session.user.email}`
          ),

        ]);

        const statsData = await statsRes.json();

        const campaignsData = await campaignsRes.json();

        setStats(statsData);

        setCampaigns(campaignsData);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, [session]);
  if (loading) {

    return (

      <div className="py-20 text-center font-semibold">

        Loading...

      </div>

    );

  }
  const statsData = [

    {
      title: "Total Campaigns",
      value: stats.totalCampaigns || 0,
      icon: <FaBullhorn />,
    },

    {
      title: "Pending",
      value: stats.pendingCampaigns || 0,
      icon: <FaClock />,
    },

    {
      title: "Approved",
      value: stats.approvedCampaigns || 0,
      icon: <FaCheckCircle />,
    },

    {
      title: "Rejected",
      value: stats.rejectedCampaigns || 0,
      icon: <FaTimesCircle />,
    },

    {
      title: "Total Raised",
      value: `$${stats.totalRaised || 0}`,
      icon: <FaMoneyBillWave />,
    },

  ];
  return (

    <div>

      <div className="mb-10">

        <h1 className="text-3xl font-bold dark:text-white">
          Welcome, {session?.user?.name} 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's an overview of your crowdfunding campaigns.
        </p>

      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

        {statsData.map((item, index) => (

          <div
            key={index}
            className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900"
          >

            <div className="mb-4 text-3xl text-primary">
              {item.icon}
            </div>

            <p className="text-slate-500">
              {item.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold dark:text-white">
              {item.value}
            </h2>

          </div>

        ))}

      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <Link
          href="/dashboard/create-campaign"
          className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg dark:bg-slate-900"
        >

          <h3 className="text-xl font-bold dark:text-white">
            Create Campaign
          </h3>

          <p className="mt-2 text-slate-500">
            Start a new fundraising campaign.
          </p>

        </Link>

        <Link
          href="/dashboard/my-campaigns"
          className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg dark:bg-slate-900"
        >

          <h3 className="text-xl font-bold dark:text-white">
            My Campaigns
          </h3>

          <p className="mt-2 text-slate-500">
            View and manage your campaigns.
          </p>

        </Link>

      </div>
      <div className="mt-10 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold dark:text-white">
            Recent Campaigns
          </h2>

          <Link
            href="/dashboard/my-campaigns"
            className="text-primary font-semibold"
          >
            View All
          </Link>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="border-b dark:border-slate-700">

              <tr>

                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Goal</th>
                <th className="px-4 py-3 text-left">Raised</th>
                <th className="px-4 py-3 text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              {campaigns.slice(0, 5).map((campaign) => (

                <tr
                  key={campaign._id}
                  className="border-b dark:border-slate-700"
                >

                  <td className="px-4 py-4 font-medium dark:text-white">
                    {campaign.title}
                  </td>

                  <td className="px-4 py-4">
                    {campaign.category}
                  </td>

                  <td className="px-4 py-4">
                    ${campaign.goal}
                  </td>

                  <td className="px-4 py-4 text-green-600">
                    ${campaign.raised}
                  </td>

                  <td className="px-4 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${campaign.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : campaign.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {campaign.status}
                    </span>

                  </td>

                </tr>

              ))}

              {campaigns.length === 0 && (

                <tr>

                  <td
                    colSpan={5}
                    className="py-8 text-center text-slate-500"
                  >
                    No campaigns found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}