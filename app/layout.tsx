import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "../providers/toast-provider";
import getCategories from "@/actions/get-categories";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Store",
  description: "Your one-stop shop for amazing products",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar categories={categories} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
