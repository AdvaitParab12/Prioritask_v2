import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Prioritask",
  description:
    "simple and intuitive productivity tool designed to help users organize tasks and manage their time effectively. It allows users to create, edit, and delete tasks, mark them as complete, and prioritize them based on importance or urgency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
