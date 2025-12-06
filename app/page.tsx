"use client"
import dynamic from "next/dynamic";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ReadyToLevelUp from "./components/ReadyToLevelUp";
const HustleOsmo = dynamic(() => import("./components/HustleOsmo"), {
  ssr: false
});
const BackgroundGuides = dynamic(() => import("./components/BackgroundGuides"), {
  ssr: false
});


export default function Home() {
  return (
    <main className="min-h-screen">
      <BackgroundGuides />

      <Header />
      <Hero />
      <HustleOsmo />
      <ReadyToLevelUp />
      <div className="w-full h-screen"></div>
    </main>
  );
}