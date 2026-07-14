"use client";

import { Avatar, Card, Chip } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function ProfileCard() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading...
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="mx-auto max-w-4xl py-10">

      <Card className="overflow-hidden rounded-3xl shadow-xl">

        {/* Cover */}
        <div className="h-36 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500" />

        {/* Avatar */}
        <div className="-mt-16 flex flex-col items-center px-8">

          <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
            <Avatar.Image src={user?.image} />
            <Avatar.Fallback>
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar>

          <h2 className="mt-5 text-3xl font-bold">
            {user?.name}
          </h2>

          <p className="text-default-500">
            {user?.email}
          </p>

          <Chip
            color={
              user?.role === "admin"
                ? "danger"
                : user?.role === "creator"
                  ? "primary"
                  : "success"
            }
            className="mt-4 capitalize"
          >
            {user?.role}
          </Chip>
        </div>

        {/* Information */}
        <div className="grid gap-5 p-8 md:grid-cols-2">

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-default-500">
              Full Name
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {user?.name}
            </h3>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-default-500">
              Email
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {user?.email}
            </h3>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-default-500">
              Email Status
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {user?.emailVerified ? "✅ Verified" : "❌ Not Verified"}
            </h3>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-default-500">
              Member Since
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {new Date(user?.createdAt).toLocaleDateString()}
            </h3>
          </div>

        </div>

      </Card>

    </div>
  );
}