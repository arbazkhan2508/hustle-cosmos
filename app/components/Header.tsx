import { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import InfiniteTicker from "./InfiniteTicker";


const titleClass = "text-[12px] tracking-[1px] uppercase mb-4 opacity-70";

const listClass = "text-[26px] leading-[42px]";

const joinBtn = "mt-5 px-[22px] py-[10px] rounded-[6px] bg-white text-[#111] font-semibold cursor-pointer";

export default function Header() {
    const [showMiniIcon, setShowMiniIcon] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showTicker, setShowTicker] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 40) {
                setShowMiniIcon(true);
            } else {
                setShowMiniIcon(false);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Hide ticker on scroll
    useLayoutEffect(() => {
        const handleScroll = () => {
            setShowTicker(window.scrollY <= 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const cardRef = useRef<HTMLDivElement | null>(null);
    const menuWrapperRef = useRef<HTMLDivElement | null>(null);
    const tl = useRef<GSAPTimeline | null>(null);

    useLayoutEffect(() => {
        const card = cardRef.current;
        const menu = menuWrapperRef.current;

        if (!card || !menu) return;

        const items = menu.querySelectorAll(".menu-item");

        // Initial state
        gsap.set(menu, { height: 0, opacity: 0 });
        gsap.set(menu, { visibility: "visible" });
        gsap.set(items, { opacity: 0, y: 20 });

        tl.current = gsap.timeline({ paused: true });

        tl.current
            .to(card, {
                width: "95%",
                duration: 0.8,
                ease: "expo.inOut",
            })
            .to(
                menu,
                {
                    height: "auto",
                    opacity: 1,
                    duration: 0.55,
                    ease: "power3.inOut",
                },
                "-=0.3"
            )
            .to(card, {
                borderRadius: "8px 8px 0 0",
                duration: 0.25,
                ease: "power2.out",
                delay: -0.55
            })
            .to(
                items,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.35,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "-=0.25"
            );
    }, []);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);

        if (!tl.current) return;

        if (!menuOpen) {
            tl.current.play();
        } else {
            tl.current.reverse().eventCallback("onReverseComplete", () => {
                if (cardRef.current) cardRef.current.style.borderRadius = "8px";
            });
        }
    };

    return (
        <>
            <div className="sticky top-0 z-50 pt-4">
                <div
                    ref={cardRef}
                    className="w-1/2 mx-auto text-white overflow-visible relative rounded-md shadow-2xl bg-[#1d1d1d]"
                >
                    <div className="flex items-center justify-between p-2">
                        <div
                            onClick={toggleMenu}
                            className="flex gap-2 items-center cursor-pointer ml-2"
                        >
                            <span className="text-xl">
                                {menuOpen ? "✕" : "☰"}
                            </span>
                            <span>Menu</span>
                        </div>

                        {/* <h1 className="font-bold text-lg">HUSTLE</h1> */}
                        <div className="relative w-[60px] h-7 flex items-center justify-center ml-16">
                            {/* HUSTLE TEXT */}
                            <span
                                className={`absolute transition-all duration-300 font-bold text-lg ${showMiniIcon ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
                                    }`}
                            >
                                HUSTLE
                            </span>

                            {/* MINI ICON ✦ */}
                            <div
                                className={`absolute transition-all duration-300 w-[22px] h-[22px] bg-[#6f43ff] 
        rounded-md rotate-45 flex items-center justify-center text-white text-sm font-bold
        ${showMiniIcon ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                            >
                                ✦
                            </div>
                        </div>

                        <div className="flex">
                            <button className="bg-[#2d2d2d] text-white px-[18px] py-1.5 rounded-full border-none cursor-pointer">
                                Login
                            </button>

                            <button className="bg-[#a4ff4f] text-black px-5 py-1.5 rounded-sm border-none cursor-pointer">
                                Join
                            </button>
                        </div>
                    </div>

                    {/* EXPANDED MENU (ABSOLUTE BELOW HEADER) */}
                    <div
                        ref={menuWrapperRef}
                        className="invisible absolute left-0 top-full w-full bg-[#1d1d1d] overflow-hidden px-5 z-1500 rounded-b-lg border-t border-t-[#2d2d2d]"
                    >
                        <div className="grid grid-cols-[2fr_1.5fr_2fr] gap-[40px] pt-6 pb-6">
                            {/* LEFT */}
                            <div className="menu-item">
                                <h3 className={titleClass}>OUR PRODUCTS</h3>
                                <div className={listClass}>
                                    <div>The Vault</div>
                                    <div>Page Transition Course</div>
                                    <div>Icon Library</div>
                                    <div>Community</div>
                                </div>
                            </div>

                            {/* MIDDLE */}
                            <div className="menu-item">
                                <h3 className={titleClass}>EXPLORE</h3>
                                <div className={listClass}>
                                    <div>Osmo Showcase</div>
                                    <div>Updates</div>
                                    <div>Pricing</div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="menu-item">
                                <h3 className={titleClass}>FEATURED</h3>
                                <div className={listClass}>
                                    <div>We hit 1600 members!</div>
                                    <button className={joinBtn}>Join them</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TICKER (Only when closed & top) */}
                {!menuOpen && showTicker && (
                    <div className="w-1/2 mt-1 mx-auto">
                        <InfiniteTicker text="EXPLORE THE OSMO SHOWCASE" />
                    </div>
                )}
            </div>
        </>
    );
}