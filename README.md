# Crowdfunding Platform - Client

A modern crowdfunding platform frontend built with **Next.js**, **React**, **Tailwind CSS**, **HeroUI**, and **Better Auth**. The platform allows users to create fundraising campaigns, support meaningful causes, and manage campaigns through role-based dashboards.

---

## 🚀 Live Website

https://client-beta-ruby-13.vercel.app

---

## ✨ Features

- Secure Authentication with Better Auth
- Role-Based Dashboard (Admin, Creator, Supporter)
- Create, Update & Delete Campaigns
- Campaign Approval System
- Stripe Payment Integration
- Browse & Search Campaigns
- Responsive Design
- Dark & Light Theme
- Dashboard Statistics
- Protected Routes
- Toast Notifications
- Modern UI with HeroUI

---

## 🛠️ Technologies Used

- Next.js (App Router)
- React.js
- Tailwind CSS
- HeroUI
- Better Auth
- Axios
- React Hot Toast
- Lucide React
- React Icons

---

## 📂 Project Structure

```
src
│
├── app
├── components
├── providers
├── hooks
├── services
├── lib
├── config
├── utils
└── middleware
```

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/SamiaBaly/fund-client
```

Go to the project folder

```bash
cd crowdfunding-client
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env.local` file and add the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

BETTER_AUTH_URL=http://localhost:3000

BETTER_AUTH_SECRET=your_secret_key
```

---

## 📄 Pages

### Public Pages

- Home
- All Campaigns
- Campaign Details
- About
- Contact
- Login
- Register

---

### Supporter Dashboard

- Dashboard Home
- My Donations
- Profile

---

### Creator Dashboard

- Dashboard Home
- My Campaigns
- Create Campaign
- Edit Campaign
- Received Donations
- Profile

---

### Admin Dashboard

- Dashboard Home
- Manage Users
- Manage Campaigns
- Manage Donations
- Profile

---

## 💳 Payment Flow

```
Campaign Details

↓

Donate

↓

Stripe Checkout

↓

Payment Success

↓

Donation Saved

↓

Campaign Raised Amount Updated
```

---

## 👥 User Roles

### Supporter

- Register & Login
- View Campaigns
- Donate to Campaigns
- View Donation History

### Creator

- Create Campaign
- Edit Campaign
- Delete Campaign
- View Received Donations

### Admin

- Manage Users
- Approve Campaigns
- Reject Campaigns
- Delete Campaigns
- View Platform Statistics

---

## 🎨 UI Features

- Responsive Design
- Mobile Navigation
- Dark & Light Mode
- Loading States
- Empty States
- Toast Notifications
- Protected Dashboard
- Modern Card Layout

---

## 🔒 Authentication

- Better Auth
- Session Management
- Protected Routes
- Role-Based Access Control

---

## 📌 Future Improvements

- Campaign Comments
- Campaign Sharing
- Email Notifications
- Campaign Categories Filter
- User Profile Settings
- Campaign Reports
- Wishlist Feature

---

## 📄 License

This project was developed for educational and portfolio purposes.

---

## 👩‍💻 Author

**Samia Baly**

GitHub: https://github.com/SamiaBaly

LinkedIn: https://www.linkedin.com/in/samia-baly

Email: samiabaly116@gmail.com