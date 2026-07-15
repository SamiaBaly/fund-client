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
    <section >
      <div className="mx-auto max-w-3xl">

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold !text-slate-900 dark:!text-white">
            Update Campaign
          </h1>

          <p className="mt-3 text-slate-500">
            Update your campaign information.
          </p>
        </div>

        <form
          onSubmit={handleUpdate}
          className="
    space-y-6
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-8
    shadow-xl
    dark:border-slate-800
    dark:bg-slate-900
  "
        >
          {/* Image URL */}
          <div>
            <label className="mb-2 block font-semibold text-slate-800 dark:text-slate-200">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-slate-900
        placeholder:text-slate-400
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        dark:border-slate-700
        dark:bg-slate-800
        dark:text-white
        dark:placeholder:text-slate-500
      "
            />
          </div>

          {/* Campaign Title */}
          <div>
            <label className="mb-2 block font-semibold text-slate-800 dark:text-slate-200">
              Campaign Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter campaign title"
              className="
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-slate-900
        placeholder:text-slate-400
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        dark:border-slate-700
        dark:bg-slate-800
        dark:text-white
        dark:placeholder:text-slate-500
      "
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block font-semibold text-slate-800 dark:text-slate-200">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-slate-900
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        dark:border-slate-700
        dark:bg-slate-800
        dark:text-white
      "
            >
              <option value="">Select Category</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Emergency">Emergency</option>
              <option value="Environment">Environment</option>
              <option value="Startup">Startup</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-semibold text-slate-800 dark:text-slate-200">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write campaign description..."
              className="
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-slate-900
        placeholder:text-slate-400
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        dark:border-slate-700
        dark:bg-slate-800
        dark:text-white
        dark:placeholder:text-slate-500
      "
            />
          </div>

          {/* Goal & Minimum Donation */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-slate-800 dark:text-slate-200">
                Goal Amount
              </label>

              <input
                type="number"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="10000"
                className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-slate-900
          placeholder:text-slate-400
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          dark:border-slate-700
          dark:bg-slate-800
          dark:text-white
          dark:placeholder:text-slate-500
        "
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-800 dark:text-slate-200">
                Minimum Donation
              </label>

              <input
                type="number"
                name="minimumDonation"
                value={formData.minimumDonation}
                onChange={handleChange}
                placeholder="50"
                className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-slate-900
          placeholder:text-slate-400
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          dark:border-slate-700
          dark:bg-slate-800
          dark:text-white
          dark:placeholder:text-slate-500
        "
              />
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="mb-2 block font-semibold text-slate-800 dark:text-slate-200">
              Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="
        w-full
        rounded-xl
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-slate-900
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        dark:border-slate-700
        dark:bg-slate-800
        dark:text-white
      "
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="
      w-full
      rounded-xl
      bg-blue-600
      py-3
      font-semibold
      text-white
      transition
      hover:bg-blue-700
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
          >
            {updating ? "Updating..." : "Update Campaign"}
          </button>
        </form>

      </div>
    </section>
  );
}