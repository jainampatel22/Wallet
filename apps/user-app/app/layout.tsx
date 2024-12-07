import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../Provider";
import { Appbar } from "../../../packages/ui/src/AppBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Providers>
    <html lang="en">
      
  
        <body className={inter.className}>
 
          {children}</body>
    
    </html>
    </Providers>
  );
}