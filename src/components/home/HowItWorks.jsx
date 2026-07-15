export default function HowItWorks() {
  const steps = [
    {
      title: "Create Campaign",
      description:
        "Creators can launch fundraising campaigns and share their ideas with supporters worldwide.",
    },
    {
      title: "Support Campaigns",
      description:
        "Supporters can securely contribute to campaigns they believe in with just a few clicks.",
    },
    {
      title: "Make an Impact",
      description:
        "Every donation helps bring meaningful projects to life and creates positive change.",
    },
  ];

  return (
    <section className="bg-slate-50 px-6 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            How It Works
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Start your crowdfunding journey in three simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                text-center
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-600
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {index + 1}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}