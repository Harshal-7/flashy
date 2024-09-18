import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Flashy",
  description:
    "Flashy is an AI featured flashcard generator application where users can create, manage flashcards and learn efficiently with the help of flashcards that uses ai",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={cn("antialiased", geistSans.variable, geistMono.variable)}
      >
        <Header session={session} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
