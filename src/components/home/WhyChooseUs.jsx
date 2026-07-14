export default function WhyChooseUs() {

  const features = [
    {
      title: "Secure Payment",
      description:
        "Safe and reliable payment system for every donation.",
    },
    {
      title: "Verified Campaigns",
      description:
        "Approved campaigns ensure better trust and transparency.",
    },
    {
      title: "Community Support",
      description:
        "Connect people and help meaningful projects grow.",
    },
  ];


  return (
    <section className="bg-slate-100 px-6 py-16 dark:bg-slate-950">

      <div className="mx-auto max-w-6xl">


        <div className="mb-10 text-center">

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Why Choose Us?
          </h2>

          <p className="mt-3 text-slate-500">
            We make fundraising simple, transparent and effective.
          </p>

        </div>



        <div className="grid gap-6 md:grid-cols-3">


          {features.map((item, index) => (

            <div
              key={index}
              className="
                rounded-3xl
                bg-white
                p-8
                shadow-lg
                dark:bg-slate-900
              "
            >

              <h3 className="text-xl font-bold dark:text-white">
                ✓ {item.title}
              </h3>


              <p className="mt-3 text-slate-500">
                {item.description}
              </p>


            </div>

          ))}


        </div>


      </div>


    </section>
  );
}