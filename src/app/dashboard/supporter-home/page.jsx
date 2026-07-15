"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  FaDonate,
  FaMoneyBillWave,
  FaBullhorn,
} from "react-icons/fa";
export default function SupporterHomePage() {

  const { data: session } = authClient.useSession();

  const [stats, setStats] = useState({});

  const [loading, setLoading] = useState(true);
  useEffect(() => {

    if (!session?.user?.email) return;

    const loadStats = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/campaigns/supporter-stats?email=${session.user.email}`
        );

        const data = await res.json();

        setStats(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    loadStats();

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
      title: "Total Donated",
      value: `$${stats.totalAmount || 0}`,
      icon: <FaMoneyBillWave />,
    },

    {
      title: "My Donations",
      value: stats.totalDonations || 0,
      icon: <FaDonate />,
    },

    {
      title: "Supported Campaigns",
      value: stats.supportedCampaigns || 0,
      icon: <FaBullhorn />,
    },

  ];
  return (

    <div>

      <div className="mb-10">

        <h1 className="text-3xl font-bold !text-slate-900 dark:!text-white">
          Welcome, {session?.user?.name} 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Thank you for supporting crowdfunding campaigns.
        </p>

      </div>
      <div className="grid gap-6 md:grid-cols-3">

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

            <h2 className="mt-2 text-3xl font-bold !text-slate-900 dark:!text-white">
              {item.value}
            </h2>

          </div>

        ))}

      </div>
      <div className="mt-10">

        <Link
          href="/campaigns"
          className="inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Browse Campaigns
        </Link>

      </div>
      <div className="mt-10 rounded-2xl bg-white p-6 shadow dark:bg-slate-900">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold !text-slate-900 dark:!text-white">
            Recent Donations
          </h2>

          <Link
            href="/dashboard/my-donations"
            className="font-semibold text-primary"
          >
            View All
          </Link>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="border-b dark:border-slate-700">

              <tr>

                <th className="px-4 py-3 text-left">
                  Campaign
                </th>

                <th className="px-4 py-3 text-left">
                  Amount
                </th>

                <th className="px-4 py-3 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {stats.recentDonations?.map((donation) => (

                <tr
                  key={donation._id}
                  className="border-b dark:border-slate-700"
                >

                  <td className="px-4 py-4 text-slate-700 dark:text-slate-300">
                    {donation.campaignTitle}
                  </td>

                  <td className="px-4 py-4 text-green-600">
                    ${donation.amount}
                  </td>

                  <td className="px-4 py-4">
                    {new Date(donation.donatedAt).toLocaleDateString()}
                  </td>

                </tr>

              ))}

              {stats.recentDonations?.length === 0 && (

                <tr>

                  <td
                    colSpan={3}
                    className="py-8 text-center text-slate-500"
                  >
                    No donations found.
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