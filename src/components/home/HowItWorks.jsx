export default function HowItWorks() {

  const steps = [
    {
      title: "Create Campaign",
      description:
        "Creators can create fundraising campaigns and share their ideas with people.",
    },
    {
      title: "Support Campaigns",
      description:
        "Supporters can donate to campaigns they care about through secure payment.",
    },
    {
      title: "Make Impact",
      description:
        "Together we help people and communities achieve their goals.",
    },
  ];


  return (
    <section className="px-6 py-16">

      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            How It Works
          </h2>

          <p className="mt-3 text-slate-500">
            Simple steps to start supporting meaningful campaigns.
          </p>

        </div>


        <div className="grid gap-6 md:grid-cols-3">

          {steps.map((step, index) => (

            <div
              key={index}
              className="
                rounded-3xl
                bg-white
                p-8
                text-center
                shadow-lg
                dark:bg-slate-900
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-xl
                  font-bold
                  text-white
                "
              >
                {index + 1}
              </div>


              <h3 className="mt-5 text-xl font-bold dark:text-white">
                {step.title}
              </h3>


              <p className="mt-3 text-slate-500">
                {step.description}
              </p>


            </div>

          ))}

        </div>

      </div>

    </section>
  );
}