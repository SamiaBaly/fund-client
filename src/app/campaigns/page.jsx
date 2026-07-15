"use client";

import { useEffect, useState } from "react";

import CampaignCard from "@/components/campaign/CampaignCard";
import api from "@/lib/api";


export default function CampaignsPage() {

  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);


  const [categories, setCategories] = useState([]);


  const limit = 6;



  const fetchCampaigns = async () => {

    try {

      setLoading(true);


      const res = await api.get(
        `/campaigns?page=${currentPage}&limit=${limit}&search=${search}&category=${category}&status=approved`
      );


      


      setCampaigns(res.data.campaigns);
      setTotalPages(res.data.totalPages);

    } catch (error) {

      console.log(
        "Campaign fetch error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCampaigns();

  }, [
    currentPage,
    search,
    category
  ]);


  // Category list

  useEffect(() => {

    const loadCategories = async () => {

      try {

        const res = await api.get(
          "/campaigns?limit=100"
        );


        const data = res.data.campaigns.filter(
          (campaign) => campaign.status === "approved"
        );


        const unique = [
          "All",
          ...new Set(
            data.map(
              item => item.category
            )
          )
        ];


        setCategories(unique);


      } catch (error) {

        console.log(error);

      }

    };


    loadCategories();


  }, []);







  if (loading) {

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

    <section
      className="
      min-h-screen
      bg-slate-50
      px-6
      py-16

      dark:bg-slate-950
      "
    >

      <div className="mx-auto max-w-7xl">


        <div className="mb-10 text-center">

          <h1
            className="
            text-4xl
            font-bold
            text-slate-900
            dark:text-white
            "
          >
            Explore Campaigns
          </h1>


          <p className="
          mt-3
          text-slate-600
          dark:text-slate-400
          ">
            Support amazing ideas and make a difference.
          </p>


        </div>





        {/* Search */}


        <div className="
        mb-10
        rounded-3xl
        bg-white
        p-6
        shadow
        dark:bg-slate-900
        ">


          <input

            type="text"

            placeholder="Search campaigns..."

            value={search}

            onChange={(e) => {

              setSearch(e.target.value);

              setCurrentPage(1);

            }}

            className="
            w-full
            rounded-full
            border
            px-5
            py-3
            outline-none

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
            "

          />





          <div className="
          mt-5
          flex
          flex-wrap
          gap-3
          ">


            {
              categories.map((item) => (

                <button

                  key={item}

                  onClick={() => {

                    setCategory(item);

                    setCurrentPage(1);

                  }}

                  className={`
                rounded-full
                px-5
                py-2
                font-semibold

                ${category === item
                      ?
                      "bg-blue-600 text-white"
                      :
                      "bg-slate-100 dark:bg-slate-800 dark:text-white"
                    }

                `}
                >

                  {item}

                </button>

              ))
            }


          </div>


        </div>






        {/* Campaign Cards */}


        {
          campaigns.length > 0 ?

            <div className="
          grid
          gap-8
          sm:grid-cols-2
          lg:grid-cols-3
          ">


              {
                campaigns.map((campaign) => (

                  <CampaignCard

                    key={campaign._id}

                    campaign={campaign}

                  />

                ))
              }


            </div>


            :


            <div className="
          py-20
          text-center
          text-slate-500
          ">

              No campaigns found

            </div>

        }






        {/* Pagination */}


        {/* Pagination */}

        {
          totalPages > 1 && (

            <div
              className="
      mt-12
      flex
      justify-center
      items-center
      gap-3
      "
            >


              {/* Previous */}

              <button

                disabled={currentPage === 1}

                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }

                className="
        rounded-full
        bg-white
        px-5
        py-2
        font-semibold
        shadow

        disabled:cursor-not-allowed
        disabled:opacity-50

        dark:bg-slate-800
        dark:text-white
        "
              >

                ← Previous

              </button>





              {/* Pages */}

              {
                Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                )
                  .map((page) => (

                    <button

                      key={page}

                      onClick={() =>
                        setCurrentPage(page)
                      }

                      className={`
            h-10
            w-10
            rounded-full
            font-semibold

            ${currentPage === page
                          ?
                          "bg-blue-600 text-white"
                          :
                          "bg-white dark:bg-slate-800 dark:text-white"
                        }

            `}
                    >

                      {page}

                    </button>

                  ))
              }





              {/* Next */}

              <button

                disabled={currentPage === totalPages}

                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }

                className="
        rounded-full
        bg-white
        px-5
        py-2
        font-semibold
        shadow

        disabled:cursor-not-allowed
        disabled:opacity-50

        dark:bg-slate-800
        dark:text-white
        "
              >

                Next →

              </button>


            </div>

          )
        }


      </div>

    </section>

  );

}