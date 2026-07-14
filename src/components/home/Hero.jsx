"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, ProgressBar } from "@heroui/react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowRight,
  HeartHandshake,
  Users,
  Target,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
    relative
    isolate
    overflow-hidden

    bg-gradient-to-br
    from-blue-50
    via-cyan-50
    to-white

    dark:from-slate-950
    dark:via-indigo-950
    dark:to-black
  "
    >

      {/* Background Blur */}

      <div
        className="
    absolute
    -left-40
    top-0
     -z-10
    h-[450px]
    w-[450px]
    rounded-full
    bg-blue-400/30
    blur-[120px]

    dark:bg-blue-600/30
  "
      />


      <div
        className="
    absolute
    -right-40
    bottom-0
     -z-10
    h-[450px]
    w-[450px]
    rounded-full
    bg-cyan-400/30
    blur-[120px]

    dark:bg-cyan-500/30
  "
      />


      <div
        className="
        mx-auto flex min-h-[90vh]
        max-w-7xl
        flex-col
        items-center
        gap-14
        px-6
        py-16
        lg:flex-row
        z-10
        "
      >


        {/* LEFT CONTENT */}

        <motion.div
          initial={{
            opacity: 0,
            x: -60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: .8,
          }}
          className="flex-1"
        >


          <span
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-blue-200
            bg-blue-100
            px-4
            py-2
            text-sm
            font-semibold
            text-blue-700

            dark:border-blue-800
            dark:bg-blue-900/40
            dark:text-blue-300
            "
          >

            <HeartHandshake size={18} />

            Together We Build Dreams

          </span>



          <h1
            className="
            mt-8
            text-5xl
            font-extrabold
            leading-tight
            text-slate-900

            dark:text-white

            md:text-7xl
            "
          >

            Every Dream

            <br />

            Deserves

            <br />


            <span
              className="
              text-blue-600
              dark:text-blue-400
              "
            >

              <TypeAnimation
                sequence={[
                  "Support ❤️",
                  1500,
                  "Funding 💰",
                  1500,
                  "Hope 🚀",
                  1500,
                  "Success 🌎",
                  1500,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
              />

            </span>


          </h1>



          <p
            className="
            mt-8
            max-w-xl
            text-lg
            leading-8
            text-slate-600

            dark:text-slate-300
            "
          >

            Launch campaigns, inspire people,
            and receive support from thousands
            of generous contributors around the world.

          </p>




          <div
            className="
            mt-10
            flex
            flex-wrap
            gap-4
            "
          >

            <Button
              as={Link}
              href="/create-campaign"
              color="primary"
              radius="full"
              size="lg"
              endContent={<ArrowRight size={18} />}
            >

              Start Campaign

            </Button>



            <Button
              as={Link}
              href="/campaigns"
              variant="bordered"
              radius="full"
              size="lg"
            >

              Explore Campaigns

            </Button>


          </div>




          {/* STATS */}


          <div
            className="
            mt-14
            grid
            grid-cols-3
            gap-6
            "
          >

            <div>

              <h2
                className="
                text-3xl
                font-bold
                text-blue-600
                dark:text-blue-400
                "
              >
                500+
              </h2>

              <p
                className="
                text-sm
                text-slate-600
                dark:text-slate-400
                "
              >
                Campaigns
              </p>

            </div>



            <div>

              <h2
                className="
                text-3xl
                font-bold
                text-blue-600
                dark:text-blue-400
                "
              >
                15K+
              </h2>


              <p
                className="
                text-sm
                text-slate-600
                dark:text-slate-400
                "
              >
                Donors
              </p>


            </div>




            <div>

              <h2
                className="
                text-3xl
                font-bold
                text-blue-600
                dark:text-blue-400
                "
              >
                $2.8M
              </h2>


              <p
                className="
                text-sm
                text-slate-600
                dark:text-slate-400
                "
              >
                Raised
              </p>


            </div>


          </div>


        </motion.div>





        {/* RIGHT IMAGE */}


        <motion.div
          initial={{
            opacity: 0,
            x: 60
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            duration: .8
          }}
          className="
          relative
          flex
          flex-1
          justify-center
          "
        >



          {/* Donation Card */}


          <motion.div
            animate={{
              y: [0, -12, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
            className="
            absolute
            left-0
            top-8
            z-20
            rounded-3xl
            border
            border-slate-200
            bg-white/80
            p-5
            shadow-xl
            backdrop-blur-xl

            dark:border-slate-700
            dark:bg-slate-900/80
            "
          >

            <p
              className="
              font-semibold
              text-slate-900
              dark:text-white
              "
            >
              ❤️ New Donation
            </p>


            <h2
              className="
              mt-2
              text-2xl
              font-bold
              text-blue-600
              dark:text-blue-400
              "
            >
              +$250
            </h2>


            <p
              className="
              text-sm
              text-slate-500
              dark:text-slate-400
              "
            >
              just now
            </p>


          </motion.div>





          {/* Progress Card */}


          <motion.div
            animate={{
              y: [0, 15, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity
            }}
            className="
            absolute
            bottom-5
            right-0
            z-20
            w-64
            rounded-3xl
            border
            border-slate-200
            bg-white/80
            p-5
            shadow-xl
            backdrop-blur-xl

            dark:border-slate-700
            dark:bg-slate-900/80
            "
          >


            <div
              className="
              flex
              items-center
              justify-between
              text-slate-900
              dark:text-white
              "
            >

              <div className="flex items-center gap-2">

                <Target size={18} />

                Goal

              </div>


              <span>
                82%
              </span>


            </div>


            <ProgressBar
              value={82}
              className="mt-4"
              color="primary"
            />



            <div
              className="
              mt-4
              flex
              items-center
              gap-2
              text-sm
              text-slate-600
              dark:text-slate-300
              "
            >

              <Users size={16} />

              1,245 Supporters

            </div>


          </motion.div>





          {/* IMAGE */}


          <motion.div
            animate={{
              y: [0, -15, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity
            }}
          >

            <Image
              src="/images/hero.png"
              alt="Crowdfunding Hero"
              width={650}
              height={650}
              priority
              className="
rounded-3xl
border
border-slate-200
shadow-2xl

dark:border-slate-700
dark:shadow-blue-900/20
"
            />


          </motion.div>



        </motion.div>


      </div>


    </section>
  );
}