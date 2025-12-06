"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
    const iconRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!iconRef.current) return;

        gsap.fromTo(
            iconRef.current,
            { rotate: -20, scale: 0.5, opacity: 0 },
            {
                rotate: 0,
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: "expo.out",
                delay: 0.2,
            }
        );
    }, []);

    return (
        <section className="w-full pt-20 pb-10 flex flex-col items-center text-center">
            <h1 className="text-[90px] font-semibold flex items-center gap-8 text-[#201d1d]">
                Dev Toolkit

                <div
                    ref={iconRef}
                    className="w-10 h-10 bg-[#6f43ff] rounded-lg rotate-45 
                               flex items-center justify-center 
                               text-white text-3xl font-bold ml-10"
                >
                    ✦
                </div>

                Built to Flex
            </h1>
        </section>
    );
}