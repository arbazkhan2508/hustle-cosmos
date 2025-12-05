import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import InfiniteTicker from "./InfiniteTicker";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showTicker, setShowTicker] = useState(true);

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
            {/* Sticky Wrapper */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 2000,
                    paddingTop: 12,
                }}
            >
                {/* HEADER BOX */}
                <div
                    ref={cardRef}
                    style={{
                        margin: "0 auto",
                        background: "#1d1d1d",
                        color: "white",
                        overflow: "visible",
                        position: "relative",
                        width: "50%",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                    }}
                >
                    {/* TOP NAV BAR */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 16px",
                        }}
                    >
                        <div
                            onClick={toggleMenu}
                            style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                        >
                            <span style={{ fontSize: "20px" }}>
                                {menuOpen ? "✕" : "☰"}
                            </span>
                            <span>Menu</span>
                        </div>

                        <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>HUSTLE</h1>

                        <div style={{ display: "flex", gap: "8px" }}>
                            <button
                                style={{
                                    background: "#2d2d2d",
                                    color: "white",
                                    padding: "6px 18px",
                                    borderRadius: "20px",
                                    border: "none",
                                }}
                            >
                                Login
                            </button>
                            <button
                                style={{
                                    background: "#a4ff4f",
                                    color: "#000",
                                    padding: "6px 20px",
                                    borderRadius: "4px",
                                    border: "none",
                                }}
                            >
                                Join
                            </button>
                        </div>
                    </div>

                    {/* EXPANDED MENU (ABSOLUTE BELOW HEADER) */}
                    <div
                        ref={menuWrapperRef}
                        style={{
                            visibility: "hidden",
                            position: "absolute",
                            left: 0,
                            top: "100%",
                            width: "100%",
                            background: "#1d1d1d",
                            overflow: "hidden",
                            padding: "0 20px",
                            zIndex: 1500,
                            borderRadius: "0 0 8px 8px",
                            borderTop: "1px solid #2d2d2d",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "2fr 1.5fr 2fr",
                                gap: "40px",
                                paddingTop: "24px",
                                paddingBottom: "24px",
                            }}
                        >
                            {/* LEFT */}
                            <div className="menu-item">
                                <h3 style={titleStyle}>OUR PRODUCTS</h3>
                                <div style={listStyle}>
                                    <div>The Vault</div>
                                    <div>Page Transition Course</div>
                                    <div>Icon Library</div>
                                    <div>Community</div>
                                </div>
                            </div>

                            {/* MIDDLE */}
                            <div className="menu-item">
                                <h3 style={titleStyle}>EXPLORE</h3>
                                <div style={listStyle}>
                                    <div>Osmo Showcase</div>
                                    <div>Updates</div>
                                    <div>Pricing</div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="menu-item">
                                <h3 style={titleStyle}>FEATURED</h3>
                                <div style={listStyle}>
                                    <div>We hit 1600 members!</div>
                                    <button style={joinBtn}>Join them</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TICKER (Only when closed & top) */}
                {!menuOpen && showTicker && (
                    <div style={{ width: "50%", margin: "4px auto 0" }}>
                        <InfiniteTicker text="EXPLORE THE OSMO SHOWCASE" />
                    </div>
                )}
            </div>
        </>
    );
}

/* TEXT STYLES */
const titleStyle = {
    fontSize: "12px",
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    marginBottom: "16px",
    opacity: 0.7,
};

const listStyle = {
    fontSize: "26px",
    lineHeight: "42px",
};

const joinBtn = {
    marginTop: "20px",
    padding: "10px 22px",
    borderRadius: "6px",
    border: "none",
    background: "white",
    color: "#111",
    fontWeight: 600,
    cursor: "pointer",
};