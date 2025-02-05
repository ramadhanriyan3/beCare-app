import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
// import { ThemeProvider } from "@/components/theme-provider";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "beCare | Doctor Booking & Healthcare Services ",
  description: "A Healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-dark-300 antialiased min-h-screen font-sans",
          jakartaSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
