"use client";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";

const ReadyToLevelUp = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (!text1Ref.current || !text2Ref.current) return;
    
    const tl = gsap.timeline();
    
    // Text 1 moves out to the right (from 0 to 100%)
    tl.to(text1Ref.current, {
      xPercent: 100,
      duration: 0.4,
      ease: "power2.inOut",
    }, 0);

    // Text 2 moves in from the left (from -100% to 0)
    tl.fromTo(
      text2Ref.current,
      { xPercent: -100 },
      { xPercent: 0, duration: 0.4, ease: "power2.inOut" },
      0
    );
  };

  const handleMouseLeave = () => {
    if (!text1Ref.current || !text2Ref.current) return;

    const tl = gsap.timeline();

    // Text 2 moves out to the right (from 0 to 100%)
    tl.to(text2Ref.current, {
      xPercent: 100,
      duration: 0.4,
      ease: "power2.inOut",
    }, 0);

    // Text 1 moves in from the left (from -100% to 0)
    tl.fromTo(
      text1Ref.current,
      { xPercent: -100 },
      { xPercent: 0, duration: 0.4, ease: "power2.inOut" },
      0
    );
  };

  return (
    <section className="w-full px-4 py-24 flex justify-center bg-[#f4f4f4]">
      <div className="bg-[#6A4DFF] rounded-[40px] p-12 md:p-20 w-full max-w-6xl relative overflow-hidden text-white flex flex-col justify-between min-h-[600px]">
        {/* Top Content */}
        <div>
          {/* Avatars & Join Text */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-[#6A4DFF] bg-gray-300 overflow-hidden relative"
                >
                   <Image
                    src={`/images/${['Munna.png', 'Tanera.png', 'dilsay.png', 'p1.png'][i-1]}`}
                    alt="User avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-lg font-medium">Join 1.6K+ others</span>
          </div>

          {/* Heading */}
          <h2 className="text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
            Ready to <br /> level up?
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl opacity-90 max-w-xl font-light">
               Let&rsquo;s build something great together.
          </p>
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          {/* Animated Button */}
          <button 
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden bg-[#111] text-white px-10 py-4 rounded-full font-medium text-lg w-fit"
          >
            <span ref={text1Ref} className="relative z-10 block w-full text-center">
              Become a member
            </span>
            <span ref={text2Ref} className="absolute inset-0 flex items-center justify-center z-10 w-full text-center translate-x-[-100%]">
              Become a member
            </span>
          </button>

          {/* Secondary Button */}
          <button className="bg-white text-black px-10 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors w-fit">
            FAQs
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReadyToLevelUp;
