"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ManageUsers() {
  const { data: session } = authClient.useSession();
  console.log(session);
  console.log(session?.token);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session?.session?.token) return;

    const fetchUsers = async () => {
      try {
        const token = session.session.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [session]);


  const handleRoleChange = async (id, role) => {
    try {
      const token = session?.session?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role }),
        }
      );

      if (!res.ok) {
        throw new Error("Role update failed");
      }

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role } : user
        )
      );

      toast.success("Role updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role");
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const token = session?.session?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Status:", res.status);

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data);

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setUsers((prev) =>
        prev.filter((user) => user._id !== id)
      );

      toast.success("User deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  if (loading) return <div className="p-10 text-center dark:text-white">Loading users...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Manage Users</h1>
          <p className="mt-2 text-slate-500">Manage all registered users and their roles.</p>
        </div>
        <div className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
          {users.length} Users
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl bg-white shadow-lg dark:bg-slate-900">
        <table className="w-full">
          <thead className="border-b bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-center">Change Role</th>
              <th className="px-6 py-4 text-center">delete</th>
            
              
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={user.image || "/images/avatar.png"} alt={user.name} className="h-11 w-11 rounded-full object-cover" />
                    <h3 className="font-semibold dark:text-white">{user.name}</h3>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold
    ${user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : user.role === "creator"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }
  `}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <select
                    defaultValue={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)}
                   
                    className="border p-2"
                  >
                    <option className="dark:text-white dark:bg-slate-900" value="supporter">Supporter</option>
                    <option className="dark:text-white  dark:bg-slate-900" value={"creator"}>Creator</option>
                    <option className="dark:text-white dark:bg-slate-900" value={"admin"}>Admin</option>
                  </select>
                  
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="ml-3 text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}