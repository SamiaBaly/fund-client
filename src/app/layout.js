import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/providers/ThemeProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Crowdfunding Platform",
  description: "Support ideas and create campaigns",
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body
        className={`
    ${geistSans.variable}
    ${geistMono.variable}
    min-h-full
    flex
    flex-col
  `}
      >

        <ThemeProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </ThemeProvider>

      </body>
    </html>
  );
}