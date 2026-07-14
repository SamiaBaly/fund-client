"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ManageDonations() {

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchDonations = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/donations`
        );

        const data = await res.json();
        console.log("DONATIONS:", data);

        setDonations(
          Array.isArray(data)
            ? data
            : Array.isArray(data.donations)
              ? data.donations
              : []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };


    fetchDonations();

  }, []);
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donation?"
    );

    if (!confirmDelete) return;


    try {

    


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donations/${id}`,
        {
          method: "DELETE",
        }
      );


      if (!res.ok) {
        throw new Error("Delete failed");
      }


      setDonations((prev) =>
        prev.filter(
          (donation) => donation._id !== id
        )
      );


      toast.success("Donation deleted successfully");


    } catch (error) {

      console.log(error);

      toast.error("Failed to delete donation");

    }

  };



  if (loading) {

    return (
      <div className="py-20 text-center">
        Loading donations...
      </div>
    );

  }


  return (

    <div>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold dark:text-white">
            Manage Donations
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage all donations.
          </p>

        </div>


        <div className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">

          {donations.length} Donations

        </div>


      </div>
      <div className="overflow-x-auto rounded-3xl bg-white shadow-lg dark:bg-slate-900">

        <table className="w-full">

          <thead className="border-b bg-slate-100 dark:border-slate-700 dark:bg-slate-800">

            <tr>

              <th className="px-6 py-4 text-left">
                Donor
              </th>

              <th className="px-6 py-4 text-left">
                Campaign
              </th>

              <th className="px-6 py-4 text-left">
                Amount
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-center">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {
              donations.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500"
                  >
                    No donations found.
                  </td>

                </tr>


              ) : (

                donations.map((donation) => (

                  <tr
                    key={donation._id}
                    className="border-b transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                  >


                    <td className="px-6 py-4">

                      <div>

                        <h3 className="font-semibold dark:text-white">
                          {donation.donorName || donation.donorEmail || "Unknown"}
                        </h3>

                       

                      </div>

                    </td>



                    <td className="px-6 py-4 dark:text-white">

                      {donation.campaignTitle}

                    </td>



                    <td className="px-6 py-4 font-semibold text-green-600">

                      ${Number(donation.amount || 0)}

                    </td>
                    <td className="px-6 py-4 font-semibold text-green-600">

                      {new Date(donation.donatedAt).toLocaleDateString()}

                    </td>



                   



                    <td className="px-6 py-4 text-center">

                      <button
                        onClick={() => handleDelete(donation._id)}
                        className="
  rounded-lg
  bg-red-500
  px-4
  py-2
  text-sm
  font-semibold
  text-white
  hover:bg-red-600
  "
                      >
                        Delete
                      </button>

                    </td>


                  </tr>

                ))

              )
            }


          </tbody>


        </table>

      </div>


    </div>

  );

}