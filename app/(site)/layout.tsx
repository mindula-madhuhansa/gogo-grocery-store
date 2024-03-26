import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "../globals.css";

import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { PayPalProvider } from "@/components/PayPalProvider";

const josefin = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoGo Grocery Store",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PayPalProvider>
      <html lang="en">
        <body className={josefin.className}>
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </PayPalProvider>
  );
}
