import {
  FaHome,
  FaPlus,
  FaList,
  FaUser,
  FaDonate,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";


export const menuItems = {

  supporter: [
    {
      name: "Overview",
      href: "/dashboard",
      icon: FaHome,
    },
    {
      name: "Explore Campaigns",
      href: "/dashboard/explore-campaigns",
      icon: FaList,
    },
    {
      name: "My Donations",
      href: "/dashboard/my-donations",
      icon: FaDonate,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: FaUser,
    },
  ],


  creator: [
    {
      name: "Overview",
      href: "/dashboard",
      icon: FaHome,
    },
    {
      name: "Create Campaign",
      href: "/dashboard/create-campaign",
      icon: FaPlus,
    },
    {
      name: "My Campaigns",
      href: "/dashboard/my-campaigns",
      icon: FaList,
    },
    {
      name: "Donations Received",
      href: "/dashboard/received-donations",
      icon: FaChartLine,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: FaUser,
    },
  ],


  admin: [
    {
      name: "Overview",
      href: "/dashboard",
      icon: FaHome,
    },
    {
      name: "Manage Users",
      href: "/dashboard/manage-users",
      icon: FaUsers,
    },
    {
      name: "Manage Campaigns",
      href: "/dashboard/campaigns",
      icon: FaList,
    },
    {
      name: "Manage Donations",
      href: "/dashboard/donations",
      icon: FaDonate,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: FaUser,
    },
  ],

};