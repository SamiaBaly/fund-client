"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@heroui/react";

import api from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function EditCampaignPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    category: "Education",
    description: "",
    goal: "",
    minimumDonation: "",
    deadline: "",
  });

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        const res = await api.get(`/campaigns/${id}`);

        setFormData({
          image: res.data.image || "",
          title: res.data.title || "",
          category: res.data.category || "Education",
          description: res.data.description || "",
          goal: res.data.goal || "",
          minimumDonation: res.data.minimumDonation || "",
          deadline: res.data.deadline
            ? res.data.deadline.slice(0, 10)
            : "",
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to load campaign");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCampaign();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const payload = {
        ...formData,
        goal: Number(formData.goal),
        minimumDonation: Number(formData.minimumDonation),
        email: session.user.email,
      };

      const token = await authClient.token();


      const res = await api.patch(
        `/campaigns/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      toast.success("Campaign updated successfully");

      if (session.user.role === "admin") {
        router.push("/dashboard/campaigns");
      } else {
        router.push("/dashboard/my-campaigns");
      }
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update campaign");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold dark:text-white">
            Update Campaign
          </h1>

          <p className="mt-3 text-slate-500">
            Update your campaign information.
          </p>
        </div>

        <form
          onSubmit={handleUpdate}
          className="space-y-6 rounded-3xl border bg-white p-8 shadow-xl dark:bg-slate-900"
        >

          <div>
            <label className="mb-2 block font-medium dark:text-white">
              Image URL
            </label>

            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium dark:text-white">
              Campaign Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium dark:text-white">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-800 dark:text-white"
            >
              <option>Education</option>
              <option>Health</option>
              <option>Emergency</option>
              <option>Environment</option>
              <option>Startup</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium dark:text-white">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium dark:text-white">
                Goal Amount
              </label>

              <input
                type="number"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium dark:text-white">
                Minimum Donation
              </label>

              <input
                type="number"
                name="minimumDonation"
                value={formData.minimumDonation}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 dark:bg-slate-800 dark:text-white"
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block font-medium dark:text-white">
              Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <Button
            type="submit"
            disabled={updating}
            className="w-full rounded-none"
          >
            {updating ? "Updating..." : "Update Campaign"}
          </Button>

        </form>

      </div>
    </section>
  );
}