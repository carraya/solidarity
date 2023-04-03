import { Inter as FontSans } from "next/font/google";

import { Hero } from "@/components/Hero";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function Home() {
  return (
    <main className={fontSans.className}>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Solidarity Home
      </h1>
      <Hero />
    </main>
  );
}
