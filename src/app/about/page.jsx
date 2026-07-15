import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white">
            About CrowdFund
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
            CrowdFund is a modern crowdfunding platform where creators can
            launch campaigns and supporters can help turn great ideas into
            reality.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">
            <div className="mb-5 text-5xl">🎯</div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Our Mission
            </h3>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Help innovators, charities and entrepreneurs raise funds quickly
              and securely.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">
            <div className="mb-5 text-5xl">🤝</div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Community
            </h3>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Thousands of supporters work together to make meaningful projects
              successful.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">
            <div className="mb-5 text-5xl">🚀</div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Innovation
            </h3>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              We believe every great idea deserves an opportunity to grow.
            </p>
          </div>
        </div>

        <div className="mt-20 rounded-3xl bg-blue-600 px-10 py-16 text-center text-white">
          <h2 className="text-4xl font-bold">
            Ready to Start Your Campaign?
          </h2>

          <p className="mt-4 text-blue-100">
            Join thousands of creators and supporters today.
          </p>

          <Link
            href="/campaigns"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-slate-100"
          >
            Explore Campaigns
          </Link>
        </div>
      </div>
    </section>
  );
}