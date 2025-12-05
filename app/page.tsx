"use client"
import dynamic from "next/dynamic";
import Header from "./components/Header";
import Hero from "./components/Hero";
const HustleOsmo = dynamic(() => import("./components/HustleOsmo"), {
  ssr: false
});


export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HustleOsmo />
    </main>
  );
}