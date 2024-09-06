import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { BenchmarkContextProvider } from "@/context/BenchmarkContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laptop Price Guage",
  description: "Gives you a value on your laptop based on its components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BenchmarkContextProvider>
          {children}
        </BenchmarkContextProvider>
      </body>
    </html>
  );
}
