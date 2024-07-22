import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import AppbarClient from "../components/AppbarClient";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { Router } from "next/router";
import { Footer } from "../components/Footer";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "All in one wallet",
  icons: {
    icon: "/favicon-16x16.png", // /public path
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="max-w-screen  flex flex-col min-h-screen bg-[#ebe6e6]">
            {session && <AppbarClient />}
            {children}
            <Footer />
          </div>

          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
