export default function Footer() {
  return (
    <footer className="bg-slate-900 px-6 py-10 text-white">

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">

        <div>
          <h2 className="text-2xl font-bold">
            CrowdFund ❤️
          </h2>

          <p className="mt-3 text-slate-400">
            Helping people support meaningful ideas and causes.
          </p>
        </div>


        <div>
          <h3 className="font-bold">
            Quick Links
          </h3>

          <ul className="mt-3 space-y-2 text-slate-400">
            <li>Home</li>
            <li>Campaigns</li>
            <li>Dashboard</li>
          </ul>
        </div>


        <div>
          <h3 className="font-bold">
            Contact
          </h3>

          <p className="mt-3 text-slate-400">
            Email: support@crowdfund.com
          </p>

          <p className="text-slate-400">
            Bangladesh
          </p>
        </div>

      </div>


      <div className="mt-8 border-t border-slate-700 pt-5 text-center text-sm text-slate-400">
        © 2026 CrowdFund. All rights reserved.
      </div>


    </footer>
  );
}