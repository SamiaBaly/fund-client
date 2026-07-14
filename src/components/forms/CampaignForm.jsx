"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import api from "@/lib/api";
import { Button } from "@heroui/react";

export default function CampaignForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    category: "Education",
    description: "",
    goal: "",
    minimumDonation: "",
    deadline: "",
  });

  // ইউনিফাইড স্টাইল ভেরিয়েবল
  const inputStyles = "w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500";
  const readOnlyStyles = "w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        goal: Number(formData.goal),
        minimumDonation: Number(formData.minimumDonation),
        raised: 0,

        creatorId: session.user.id,
        creatorName: session.user.name,
        creatorEmail: session.user.email,
        creatorImage: session.user.image,

        status: "pending",

        createdAt: new Date(),
      };
      const token = await authClient.token();
      await api.post(
        "/campaigns",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Campaign created successfully!");
      router.push("/dashboard/my-campaigns");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <section className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white !text-slate-900 dark:!text-white">
            Create Campaign
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Start a fundraising campaign and inspire people to support your idea.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          {/* ইনপুট ফিল্ডগুলোতে inputStyles ব্যবহার করা হয়েছে */}
          <div>
            <label className="mb-2 block font-medium dark:text-white">Image URL</label>
            <input name="image" value={formData.image} onChange={handleChange} type="text" placeholder="https://..." className={inputStyles} />
          </div>

          <div>
            <label className="mb-2 block font-medium dark:text-white">Campaign Title</label>
            <input name="title" value={formData.title} onChange={handleChange} type="text" placeholder="Campaign title" className={inputStyles} />
          </div>

          <div>
            <label className="mb-2 block font-medium dark:text-white">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`${inputStyles} appearance-none cursor-pointer`}
            >
              {/* প্রতিটি অপশনে আলাদাভাবে bg-white dark:bg-slate-800 যোগ করুন */}
              <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Education</option>
              <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Health</option>
              <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Emergency</option>
              <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Environment</option>
              <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Startup</option>
              <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Animals</option>
              <option className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Food</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium dark:text-white">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Describe your campaign..." className={inputStyles} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <input name="goal" value={formData.goal} onChange={handleChange} type="number" placeholder="Goal Amount" className={inputStyles} />
            <input name="minimumDonation" value={formData.minimumDonation} onChange={handleChange} type="number" placeholder="Minimum Donation" className={inputStyles} />
          </div>

          <input name="deadline" value={formData.deadline} onChange={handleChange} type="date" className={inputStyles} />

          <div className="grid gap-6 md:grid-cols-2">
            <input value={session.user.name || ""} readOnly className={readOnlyStyles} />
            <input value={session.user.email || ""} readOnly className={readOnlyStyles} />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Campaign"}
          </Button>
        </form>
      </div>
    </section>
  );
}