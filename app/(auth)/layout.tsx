import { Josefin_Sans } from "next/font/google";
import "../globals.css";

import { Toaster } from "@/components/ui/sonner";

const josefin = Josefin_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={josefin.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
