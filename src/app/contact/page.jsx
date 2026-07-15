export default function ContactPage() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-14 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white">
            Contact Us
          </h1>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            We'd love to hear from you. Send us a message anytime.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}

          <div className="rounded-3xl bg-white p-10 shadow-lg dark:bg-slate-900">
            <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
              Get In Touch
            </h2>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-blue-600">📍 Address</h4>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Dhaka, Bangladesh
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-blue-600">📧 Email</h4>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  support@crowdfund.com
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-blue-600">📞 Phone</h4>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  +880 1234 567890
                </p>
              </div>
            </div>
          </div>

          {/* Form */}

          <form className="rounded-3xl bg-white p-10 shadow-lg dark:bg-slate-900">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block font-medium dark:text-white">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium dark:text-white">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium dark:text-white">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}