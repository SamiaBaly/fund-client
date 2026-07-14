"use client"
import Link from "next/link";

import { toast } from "react-hot-toast";

import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries())
    console.log("user", user);

    const { data, error } = await signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image,
      role: user.role,
    });

    console.log({data, error});

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Registration Successful");
    router.push("/login");
  };

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-md">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Create Account
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Join and start creating fundraising campaigns.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          <div>
            <label className="mb-2 block font-medium dark:text-white">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              
              placeholder="John Doe"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium dark:text-white">
              Email
            </label>

            <input
              type="email"
              name="email"
            
              
              placeholder="example@gmail.com"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium dark:text-white">
              Profile Image URL
            </label>

            <input
              type="url"
              name="image"
             
            
              placeholder="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium dark:text-white">
              Role
            </label>

            <select
              name="role"
              defaultValue="supporter"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="supporter">
                Supporter
              </option>

              <option value="creator">
                Creator
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium dark:text-white">
              Password
            </label>

            <input
              type="password"
              name="password"
           
              placeholder="********"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
           
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
         Register
          </button>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>

      </div>
    </section>
  );
}