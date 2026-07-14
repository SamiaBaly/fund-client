"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";


export default function PaymentSuccess() {

  const searchParams = useSearchParams();

  const router = useRouter();


  const [saving, setSaving] = useState(true);



  useEffect(() => {


    const sessionId = searchParams.get("session_id");


    if (!sessionId) {
      return;
    }


    const saveDonation = async () => {


      try {


        // Get Stripe session data

        const sessionRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/donations/stripe-session/${sessionId}`
        );


        const sessionData = await sessionRes.json();



        // Save donation

        const saveRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/donations/save-after-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sessionData),
          }
        );


        if (!saveRes.ok) {
          throw new Error("Donation save failed");
        }


      } catch (error) {

        console.log(error);

      } finally {

        setSaving(false);

      }


    };


    saveDonation();


  }, [searchParams]);




  return (

    <div className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-slate-100
    dark:bg-slate-950
  ">


      <div className="
      w-full
      max-w-md
      rounded-3xl
      bg-white
      p-10
      text-center
      shadow-xl
      dark:bg-slate-900
    ">


        {
          saving ? (

            <h1 className="
            text-2xl
            font-bold
            text-slate-900
            dark:text-white
          ">
              Processing Payment...
            </h1>

          ) : (

            <>

              <div className="
              mx-auto
              mb-5
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-green-100
              text-4xl
              dark:bg-green-900/30
            ">
                🎉
              </div>


              <h1 className="
              text-3xl
              font-bold
              text-green-600
            ">
                Payment Successful
              </h1>


              <p className="
              mt-4
              text-slate-600
              dark:text-slate-400
            ">
                Thank you for supporting this campaign ❤️
              </p>


              <button
                onClick={() =>
                  router.push("/dashboard/my-donations")
                }
                className="
                mt-8
                w-full
                rounded-xl
                bg-primary
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:opacity-90
              "
              >
                View My Donations
              </button>

            </>

          )
        }


      </div>


    </div>

  );

}