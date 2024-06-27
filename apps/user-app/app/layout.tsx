
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import AppbarClient from "../components/AppbarClient";
import { Loader } from "../components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "All in one wallet",
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
 
        <body className={inter.className}>
        <Providers>
          <div className="min-w-screen flex flex-col min-h-screen bg-[#ebe6e6]">
            <AppbarClient />
            {children}
           
          </div>
          <ToastContainer />
          </Providers>
        </body>
     
    </html>
  );
}
