"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Modal,
  Button,
  Input,
} from "@heroui/react";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";


export default function ContributionButton({ campaign }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const handleDonate = async () => {

    if (!session?.user) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (session.user.role !== "supporter") {
      toast.error("Only supporters can donate");
      return;

    }


    const donationAmount = Number(amount);

    if (!donationAmount) {

      toast.error("Please enter donation amount");

      return;

    }


    if (donationAmount < campaign.minimumDonation) {

      toast.error(
        `Minimum donation is $${campaign.minimumDonation}`
      );

      return;

    }




    try {


      setLoading(true);



      const response = await fetch(

        `${process.env.NEXT_PUBLIC_API_URL}/donations/create-checkout-session`,

        {

          method: "POST",


          headers: {
            "Content-Type": "application/json",
            
          },


          body: JSON.stringify({

            campaignId: campaign._id,

            campaignTitle: campaign.title,

            amount: donationAmount,

            donorEmail: session.user.email,
            
            donorName: session.user.name,

          }),

        }

      );




      const data = await response.json();



      console.log(
        "Stripe Checkout:",
        data
      );



      if (!response.ok) {

        throw new Error(
          data.message || "Checkout failed"
        );

      }




      if (data.url) {


        // Redirect to Stripe Checkout

        window.location.href = data.url;


        return;


      }




      toast.error(
        "Stripe checkout URL not found"
      );




    } catch (error) {


      console.log(error);


      toast.error(
        "Donation failed!"
      );



    } finally {


      setLoading(false);


    }


  };






  return (

    <Modal>


      <Modal.Trigger>

        <Button
          color="primary"
          className="
          w-full
          rounded-2xl
          py-7
          text-lg
          font-bold
          "
        >

          ❤️ Support This Campaign


        </Button>


      </Modal.Trigger>





      <Modal.Backdrop className="bg-black/40 backdrop-blur-md">


        <Modal.Container>


          <Modal.Dialog className="
            max-w-2xl
            rounded-3xl
            bg-white
            dark:bg-slate-900
          ">



            <Modal.CloseTrigger />




            <Modal.Header>


              <Modal.Heading className="text-2xl font-bold">

                ❤️ Support This Campaign

              </Modal.Heading>


            </Modal.Header>






            <Modal.Body className="space-y-6">



              <Image

                src={campaign.image}

                alt={campaign.title}

                width={700}

                height={350}

                className="
                h-60
                w-full
                rounded-2xl
                object-cover
                "

              />





              <div>


                <h2 className="text-2xl font-bold">

                  {campaign.title}

                </h2>



                <p className="mt-2 text-default-500">

                  {campaign.description}

                </p>


              </div>






              <div className="
                grid
                grid-cols-3
                gap-4
              ">



                <div className="
                  rounded-2xl
                  bg-slate-100
                  p-4
                  text-center
                  dark:bg-slate-800
                ">

                  <p className="text-sm text-default-500">
                    Goal
                  </p>

                  <h3 className="text-xl font-bold">
                    ${campaign.goal}
                  </h3>


                </div>






                <div className="
                  rounded-2xl
                  bg-slate-100
                  p-4
                  text-center
                  dark:bg-slate-800
                ">

                  <p className="text-sm text-default-500">
                    Raised
                  </p>


                  <h3 className="text-xl font-bold">
                    ${campaign.raised}
                  </h3>


                </div>






                <div className="
                  rounded-2xl
                  bg-sky-100
                  p-4
                  text-center
                  dark:bg-sky-900/30
                ">


                  <p className="text-sm text-default-500">
                    Minimum
                  </p>


                  <h3 className="
                    text-xl
                    font-bold
                    text-blue-600
                  ">

                    ${campaign.minimumDonation}

                  </h3>


                </div>


              </div>







              <Input

                label="Donation Amount"

                placeholder={`Minimum $${campaign.minimumDonation}`}

                type="number"

                size="lg"

                value={amount}

                onChange={(e) => setAmount(e.target.value)}

              />





            </Modal.Body>







            <Modal.Footer>



              <Button variant="light">

                Cancel

              </Button>





              <Button

                color="primary"

                className="px-10"

                isDisabled={loading}

                onPress={handleDonate}

              >

                {
                  loading
                    ? "Processing..."
                    : "Donate Now ❤️"
                }


              </Button>



            </Modal.Footer>





          </Modal.Dialog>


        </Modal.Container>



      </Modal.Backdrop>


    </Modal>

  );

}